import { RegionType } from "@/types/Region";

export const regionService = {
  getRegions: async (): Promise<RegionType[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/regions`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Faile to get user info");
    }
    return res.json();
  },
};
