import { LoginResponse, LoginformData } from "@/types/Auth";
import { User } from "@/types/User";

export const authService = {
  login: async (data: LoginformData): Promise<LoginResponse> => {
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
  getMe: async (token: string): Promise<User> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error("Faile to get user info");
    }
    return res.json();
  },
  logout: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "로그아웃에 실패했습니다.");
    }
  },
};
