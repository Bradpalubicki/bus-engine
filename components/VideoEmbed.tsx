interface VideoEmbedProps {
  src: string
  poster: string
  label: string
  className?: string
}

export function VideoEmbed({ src, poster, label, className = '' }: VideoEmbedProps) {
  return (
    <div className={`relative rounded-xl overflow-hidden bg-gray-900 ${className}`}>
      <video
        src={src}
        poster={poster}
        controls
        preload="none"
        className="w-full aspect-video object-cover"
        aria-label={label}
      >
        Your browser does not support video playback.
      </video>
      <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded font-medium">
        {label}
      </div>
    </div>
  )
}
