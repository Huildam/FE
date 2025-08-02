"use client";

import { useState } from "react";
import { UserMyPage } from "@/components/user-mypage";
import { JournalistMyPage } from "@/components/journalist-mypage";

// 임시로 사용자 타입을 결정하는 로직 (실제로는 인증 시스템에서 가져와야 함)
const getCurrentUserType = (): "user" | "reporter" => {
  // URL 파라미터나 로컬 스토리지에서 사용자 타입을 확인
  if (typeof window !== "undefined") {
    const userType = new URLSearchParams(window.location.search).get("type");
    return userType === "reporter" ? "reporter" : "user";
  }
  return "user";
};

export default function MyPage() {
  const [userType] = useState<"user" | "reporter">(getCurrentUserType());

  if (userType === "reporter") {
    return <JournalistMyPage />;
  }

  return <UserMyPage />;
}
