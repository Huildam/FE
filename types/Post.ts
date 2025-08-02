import { User } from "./User";

export interface Post extends PostDetailTimelines {
  regionId: number;
  description: string;
}

export interface PostDetail {
  id: number;
  title: string;
  summary: string;
  description: string;
  region: {
    id: number;
    name: string;
    parent: string;
  };
  status: string;
  eventDate: string;
  viewCount: number;
  likeCount: number;
  tags: string[];
  sourceName: string;
  sourceUrl: string;
  sourceType: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  verifiedAt: string;
  timelines: [];
}

export interface PostDetailTimelines {
  userId: number;
  title: string;
  summary: string;
  eventDate: string;
}
