import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Only preview videos physically available under public/ at build time.
 * New clips activate automatically after their matching files are pushed.
 */
export function getAvailablePortfolioVideos(
  urls: readonly (string | null | undefined)[]
): string[] {
  const result = new Set<string>();
  for (const url of urls) {
    if (!url?.startsWith("/video/")) continue;
    const relative = decodeURIComponent(url).replace(/^\/+/, "");
    if (relative.split("/").includes("..")) continue;
    if (existsSync(join(process.cwd(), "public", relative))) result.add(url);
  }
  return [...result];
}
