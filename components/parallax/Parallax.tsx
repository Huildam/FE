"use client";

import Image from "next/image";
import ParallaxText from "@/components/parallax/ParallaxText";
import { ChevronDown } from "lucide-react";

export default function Parallax() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <ParallaxText baseVelocity={-2} repeat={200}>
        <span
          style={{
            textShadow: "2px 4px 12px rgba(0,0,0,0.35), 0 1px 0 #fff",
          }}
        >
          지역 사건의 시작부터 끝까지 지역 사건의 시작부터 끝까지 지역 사건의
          시작부터 끝까지 지역 사건의 시작부터 끝까지 지역 사건의 시작부터
          끝까지
        </span>
      </ParallaxText>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "2rem 0",
        }}
      >
        <Image
          src="/후일담logo.svg"
          alt="후일담 로고"
          width={250}
          height={250}
        />
      </div>

      <ParallaxText baseVelocity={5} repeat={200}>
        <span
          style={{
            textShadow: "2px 4px 12px rgba(0,0,0,0.35), 0 1px 0 #fff",
          }}
        >
          그곳에 사는 누군가를 위해 흐름과 결과까지 정리해드립니다
        </span>
      </ParallaxText>
      {/* 아래 화살표 */}
      <div className="flex justify-center mt-20">
        <ChevronDown className="w-12 h-12 text-[#ffffff] animate-bounce" />
      </div>
    </div>
  );
}
