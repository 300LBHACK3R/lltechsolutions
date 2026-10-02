import Image from "next/image";

// Client-owned treatment videos are deliberately replaced with a still image.
// The public prop shape preserves the original service-page media layout.
export function ServicePreviewVideo({
  poster,
  posterAlt,
  sizes = "100vw",
}: {
  src: string;
  poster: string;
  posterAlt: string;
  label: string;
  sizes?: string;
}) {
  return (
    <Image
      className="service-preview-video__poster"
      src={poster}
      alt={posterAlt}
      fill
      preload
      sizes={sizes}
      draggable={false}
    />
  );
}
