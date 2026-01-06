import type { BranchId } from "./branch";

export type Video = {
  id: string;
  title: string;
  youtubeId: string;
  embedUrl: string;
  watchUrl: string;
  thumbnailUrl: string;
};

export type BranchVideos = {
  branchId: BranchId;
  branchName: string;
  videos: Video[];
};

