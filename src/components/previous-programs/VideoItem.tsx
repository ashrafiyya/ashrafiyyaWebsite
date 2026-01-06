import type { Video } from "../../types/video";

type VideoItemProps = {
  video: Video;
};

export const VideoItem = ({ video }: VideoItemProps) => {
  return (
    <div className="video-item">
      <h4>{video.title}</h4>
      <div className="youtube-playlist-container">
        <iframe
          width="100%"
          height="315"
          src={video.embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <a
        href={video.watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="youtube-thumbnail"
        aria-label={`Watch ${video.title} on YouTube`}
      >
        <img src={video.thumbnailUrl} alt={video.title} loading="lazy" />
        <div className="play-button" aria-hidden="true" />
      </a>
    </div>
  );
};

