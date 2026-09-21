type YouTubeEmbedProps = {
  URL: string;
  title: string;
};

export function YouTubeEmbed({ URL, title }: YouTubeEmbedProps) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl">
      <iframe
        className="h-full w-full"
        src={URL}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
