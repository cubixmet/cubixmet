import ProjectVideoPreview from "./ProjectVideoPreview";

/** Shared Safari-compatible playback for Product and Tool cards. */
export default function CardVideoPreview({ video, image, name }: { video?: string | null; image?: string | null; name: string }) {
  return <ProjectVideoPreview name={name} video={video ?? undefined} coverImage={image ?? undefined} />;
}
