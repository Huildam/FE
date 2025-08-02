import { User } from "./User";

export interface IncidentProps {
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
  category: string;
  eventDate: string;
  viewCount: number;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  verifiedAt: string;
  timelines: Timeline[];
}

export interface Timeline {
  id: number;
  title: string;
  summary: string;
  eventDate: string;
  sourceName: string;
  sourceType: string;
  sourceUrl: string;
  createdBy: User;
  isverified: boolean;
  verifiedAt: string;
  createdAt: string;
}

export interface Event extends EventDetailTimelines {
  regionId: number;
  description: string;
}

export interface EventDetailTimelines {
  userId: number;
  title: string;
  summary: string;
  eventDate: string;
}

export interface EventDetail {
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
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  verifiedAt: string;
  timelines: [];
}
