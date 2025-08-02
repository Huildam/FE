"use client";

import { UserMypage } from "@/components/UserMypage";
import { ReporterMypage } from "@/components/ReporterMypage";
import { useAuthStore } from "@/stores/authStore";

export default function MyPage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return user.role === "reporter" ? <ReporterMypage /> : <UserMypage />;
}
