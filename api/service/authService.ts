import { LoginformData } from "@/types/Auth";

export const authService = {
  login: async (data: LoginformData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "로그인에 실패했습니다.");
    }

    return res.json();
  },
};
