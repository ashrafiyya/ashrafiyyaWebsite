import type { BranchVideos } from "../../types/video";
import { VideoItem } from "./VideoItem";

type VideoPlaylistColumnProps = {
  branchVideos: BranchVideos;
};

export const VideoPlaylistColumn = ({ branchVideos }: VideoPlaylistColumnProps) => {
  return (
    <div className="video-playlist-column">
      <h4 className="column-title">{branchVideos.branchName}</h4>
      <div className="video-scroll-container">
        {branchVideos.videos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

