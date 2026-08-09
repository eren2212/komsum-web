import { useState } from "react";

type MediaProps = {
  /** Image or video source under /public. */
  src?: string;
  /** When the src is a video file. */
  video?: boolean;
  poster?: string;
  alt: string;
  className?: string;
  /** Inline styles (useful for absolute positioning over a mockup). */
  style?: React.CSSProperties;
  /** Label shown inside the gray placeholder box until media is added. */
  label?: string;
};

/**
 * Renders an <img> or <video>; if the file is missing (or no src given),
 * shows a gray placeholder box with a hint so the user knows where to drop
 * their own screenshot/video.
 */
export default function Media({
  src,
  video = false,
  poster,
  alt,
  className = "",
  style,
  label = "Görseli buraya ekleyin",
}: MediaProps) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  if (showPlaceholder) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={style}
        className={`flex flex-col items-center  justify-center gap-2 bg-neutral-200/80 text-neutral-500 ${className}`}
      >
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span className="px-3 text-center text-xs font-medium tracking-wide">
          {label}
        </span>
        {src && (
          <span className="px-3 text-center text-[10px] text-neutral-400">
            {src}
          </span>
        )}
      </div>
    );
  }

  if (video) {
    return (
      <video
        className={className}
        style={style}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <img
      className={className}
      style={style}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
