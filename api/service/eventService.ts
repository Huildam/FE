import { Event, IncidentProps } from "@/types/Event";

interface GetEventsParams {
  category?: string;
  regionId?: number;
}

export const eventService = {
  events: async (data: Event) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "게시글 조회에 실패했습니다.");
    }

    return res.json();
  },
  getEvents: async (params: GetEventsParams = {}): Promise<IncidentProps[]> => {
    const query = new URLSearchParams();

    if (params.category) query.append("category", params.category);
    if (params.regionId !== undefined)
      query.append("region_id", params.regionId.toString());
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events?${query.toString()}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error("Faile to get user info");
    }
    return res.json();
  },
  getEventDetail: async (event_id: number): Promise<IncidentProps> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${event_id}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error("Faile to get user info");
    }
    return res.json();
  },
};
