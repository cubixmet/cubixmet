#!/usr/bin/env node
/**
 * Cubixmet portfolio video optimizer.
 * - Converts every MOV in public/video/ to browser-friendly H.264 MP4.
 * - Shortens any video longer than 18 seconds to 17.9s (container headroom).
 * - Checks existing MP4 videos too; never overwrites an original.
 * - Updates data/*.ts references only after valid output is created.
 * - Keeps all originals for safety; repeat runs reuse validated outputs.
 *
 * Usage: node scripts/convert-all-videos.mjs --project . --dry-run
 *        node scripts/convert-all-videos.mjs --project .
 * Requires: ffmpeg and ffprobe on PATH.
 */
import { spawnSync, spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const MAX_DURATION = 18;
const ENCODE_SECONDS = 17.90; // Ensure final MP4 container stays <= 18s.
const SUFFIX = '-18s';
const args = process.argv.slice(2);
let root = process.cwd();
let dryRun = false;
let updatePaths = true;
for (let i = 0; i < args.length; i += 1) {
  const a = args[i];
  if (a === '--project') {
    if (!args[i + 1]) throw new Error('--project requires a folder path');
    root = path.resolve(args[++i]);
  } else if (a === '--dry-run') dryRun = true;
  else if (a === '--no-update-paths') updatePaths = false;
  else if (a === '--help' || a === '-h') {
    console.log(`Cubixmet video optimizer\n  --project <path>    Next.js project root (defaults to current folder)\n  --dry-run           Inspect without making any changes\n  --no-update-paths   Do not update data/*.ts video URLs\n\nConvert MOV to MP4; trim clips longer than ${MAX_DURATION} seconds. Originals remain unchanged.`);
    process.exit(0);
  } else throw new Error(`Unknown argument: ${a}`);
}

const videoDir = path.join(root, 'public', 'video');
const dataDir = path.join(root, 'data');
const supported = new Set(['.mov', '.mp4']);
const pathExists = async (p) => fs.access(p).then(() => true, () => false);
const fmt = (n) => Number.isFinite(n) ? `${n.toFixed(2)}s` : '?';

function requiredCommand(command) {
  const result = spawnSync(command, ['-version'], { encoding: 'utf8', windowsHide: true });
  if (result.error || result.status !== 0) {
    throw new Error(`${command} is missing. Install FFmpeg (Windows: winget install --id Gyan.FFmpeg -e), then restart PowerShell.`);
  }
}

function probe(file) {
  const result = spawnSync('ffprobe', [
    '-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'format=duration:stream=codec_name,width,height,pix_fmt',
    '-of', 'json', file,
  ], { encoding: 'utf8', windowsHide: true, maxBuffer: 8 * 1024 * 1024 });
  if (result.error || result.status !== 0) throw new Error(`Cannot read video: ${file}\n${result.stderr || result.error}`);
  const json = JSON.parse(result.stdout);
  const video = json.streams?.[0];
  if (!video) throw new Error(`No video stream: ${file}`);
  const duration = Number(json.format?.duration);
  return {
    duration: Number.isFinite(duration) ? duration : Infinity,
    codec: video.codec_name,
    width: Number(video.width),
    height: Number(video.height),
    pix_fmt: video.pix_fmt,
  };
}

function compliant(details) {
  return details.duration <= MAX_DURATION + 0.03 &&
    details.codec === 'h264' && details.pix_fmt === 'yuv420p' &&
    details.width <= 1280 && details.height <= 720;
}

async function walk(directory) {
  const result = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name.endsWith('.tmp.mp4')) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await walk(full));
    else if (entry.isFile() && supported.has(path.extname(entry.name).toLowerCase())) result.push(full);
  }
  return result.sort((a, b) => a.localeCompare(b));
}

function toPublicUrl(absoluteFile) {
  const relative = path.relative(path.join(root, 'public'), absoluteFile);
  if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Unsafe video path');
  return '/' + relative.split(path.sep).map(encodeURIComponent).join('/');
}

function convert(input, output, originalDuration) {
  return new Promise((resolve, reject) => {
    const filter = "scale=w='min(1280,iw)':h='min(720,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,fps=30,format=yuv420p";
    const cmd = [
      '-hide_banner', '-nostdin', '-loglevel', 'error', '-y',
      '-i', input, '-map', '0:v:0', '-t', String(ENCODE_SECONDS),
      '-vf', filter, '-c:v', 'libx264', '-preset', 'fast', '-crf', '28',
      '-an', '-movflags', '+faststart', '-f', 'mp4', output,
    ];
    const proc = spawn('ffmpeg', cmd, { windowsHide: true });
    let err = '';
    proc.stderr.setEncoding('utf8');
    proc.stderr.on('data', (chunk) => { err = (err + chunk).slice(-8000); });
    proc.on('error', reject);
    proc.on('close', (code) => {
      if (code !== 0) reject(new Error(`ffmpeg failed (${code}) for ${path.basename(input)}: ${err}`));
      else resolve();
    });
  });
}

async function findDataFiles(dir) {
  if (!await pathExists(dir)) return [];
  const result = [];
  for (const ent of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) result.push(...await findDataFiles(full));
    else if (ent.isFile() && /\.(?:ts|tsx|js|mjs)$/.test(ent.name)) result.push(full);
  }
  return result;
}

async function replaceVideoPaths(mapping) {
  // Repair legacy URLs when their file has moved to a differently named folder.
  // For example Blendopia is stored in DynamicWebsite/, while an older data URL
  // refers to Dynamic%20Website/. Only repair when exactly one file matches.
  const availableFiles = (await walk(videoDir)).filter((file) => file.toLowerCase().endsWith('.mp4'));
  const existingUrls = new Set(availableFiles.map(toPublicUrl));
  const byName = new Map();
  for (const file of availableFiles) {
    const name = path.basename(file).toLowerCase();
    const names = byName.get(name) ?? [];
    names.push(toPublicUrl(file));
    byName.set(name, names);
  }
  let updated = 0;
  for (const file of await findDataFiles(dataDir)) {
    const original = await fs.readFile(file, 'utf8');
    const changed = original.replace(/(\bvideo\s*:\s*["'])([^"']+)(["'])/g, (all, start, url, end) => {
      let replacement = mapping.get(url);
      if (!replacement && url.startsWith('/video/') && !existingUrls.has(url)) {
        const filename = decodeURIComponent(url).split('/').at(-1)?.toLowerCase();
        const candidates = byName.get(filename) ?? [];
        if (candidates.length === 1) replacement = candidates[0];
      }
      return replacement ? `${start}${replacement}${end}` : all;
    });
    if (changed !== original) {
      const tmp = `${file}.video-update.tmp`;
      await fs.writeFile(tmp, changed, 'utf8');
      await fs.rename(tmp, file);
      updated++;
      console.log(`  Updated video paths: ${path.relative(root, file)}`);
    }
  }
  return updated;
}

async function run() {
  if (!await pathExists(path.join(root, 'package.json')) || !await pathExists(videoDir)) {
    throw new Error(`Not a Cubixmet Next.js project: ${root}\nExpected package.json and public/video/`);
  }
  requiredCommand('ffprobe');
  requiredCommand('ffmpeg');
  const allFiles = await walk(videoDir);
  const map = new Map();
  const converted = [];
  const skipped = [];
  const failures = [];
  let beforeBytes = 0, afterBytes = 0;
  console.log(`Project: ${root}\nFound ${allFiles.length} video files. Maximum: ${MAX_DURATION}s (encoding ${ENCODE_SECONDS}s).`);
  if (dryRun) console.log('DRY RUN — no files or references will be changed.\n');

  for (const [index, input] of allFiles.entries()) {
    const ext = path.extname(input).toLowerCase();
    const relative = path.relative(root, input);
    const base = input.slice(0, -path.extname(input).length);
    const srcUrl = toPublicUrl(input);
    try {
      const meta = probe(input);
      const srcStat = await fs.stat(input);
      if (ext === '.mp4' && compliant(meta)) {
        skipped.push(relative);
        console.log(`[${index + 1}/${allFiles.length}] OK   ${relative} (${fmt(meta.duration)})`);
        continue;
      }

      // MOV -> same name.mp4, MP4 -> name-18s.mp4. Never overwrite originals.
      let output = ext === '.mov' ? `${base}.mp4` : `${base}${base.endsWith(SUFFIX) ? '-fixed' : SUFFIX}.mp4`;
      if (await pathExists(output)) {
        try {
          const existing = probe(output);
          if (compliant(existing)) {
            map.set(srcUrl, toPublicUrl(output));
            skipped.push(relative);
            console.log(`[${index + 1}/${allFiles.length}] REUSE ${path.relative(root, output)} (${fmt(existing.duration)})`);
            continue;
          }
        } catch { /* Existing video needs a fresh output path. */ }
        if (ext === '.mov') output = `${base}${SUFFIX}.mp4`;
        if (await pathExists(output)) {
          const existing = probe(output);
          if (!compliant(existing)) throw new Error(`Output already exists but is not compatible: ${output}. Rename it first.`);
          map.set(srcUrl, toPublicUrl(output));
          skipped.push(relative);
          continue;
        }
      }

      console.log(`[${index + 1}/${allFiles.length}] ${ext === '.mov' ? 'MOV → MP4' : 'OPTIMIZE'} ${relative}: ${fmt(meta.duration)} → ≤ ${MAX_DURATION}s`);
      if (dryRun) continue;
      const tmp = `${output}.tmp-${process.pid}.mp4`;
      try {
        await convert(input, tmp, meta.duration);
        const result = probe(tmp);
        if (!compliant(result)) throw new Error(`Encoded video failed validation: ${fmt(result.duration)}, ${result.codec}, ${result.width}x${result.height}`);
        await fs.rename(tmp, output);
        map.set(srcUrl, toPublicUrl(output));
        converted.push({ input: relative, output: path.relative(root, output), fromSeconds: meta.duration, toSeconds: result.duration });
        beforeBytes += srcStat.size;
        afterBytes += (await fs.stat(output)).size;
        console.log(`    ✓ ${path.relative(root, output)} (${fmt(result.duration)}, ${(srcStat.size/1048576).toFixed(1)} → ${( (await fs.stat(output)).size/1048576).toFixed(1)} MiB)`);
      } finally {
        await fs.rm(tmp, { force: true }).catch(() => {});
      }
    } catch (error) {
      failures.push({ file: relative, error: error instanceof Error ? error.message : String(error) });
      console.error(`    ✗ ${relative}: ${error.message || error}`);
    }
  }
  const dataUpdates = (!dryRun && updatePaths) ? await replaceVideoPaths(map) : 0;
  console.log(`\nDONE: ${converted.length} videos encoded, ${skipped.length} already compatible/reused, ${failures.length} failed; ${dataUpdates} data file(s) updated.`);
  if (!dryRun && converted.length) console.log(`New MP4 input → output size: ${(beforeBytes/1048576).toFixed(1)} → ${(afterBytes/1048576).toFixed(1)} MiB (for encoded files only).`);
  console.log('Original MOV/MP4 files have NOT been removed. Review outputs before deleting originals.');
  if (failures.length) process.exitCode = 1;
}

run().catch((err) => { console.error('\nERROR: ' + (err?.stack || err)); process.exitCode = 1; });
