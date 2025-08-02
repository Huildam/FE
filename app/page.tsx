"use client";

import Image from "next/image";
import React, { useState } from "react";
import ParallaxText from "@/components/parallax/ParallaxText";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import "@kfonts/hakgyoansim-mabeopsa";
import { AnimatePresence, motion } from "framer-motion";
import { authService } from "@/api/service/authService";
import { LoginformData } from "@/types/Auth";
import { toast } from "react-hot-toast";

export default function IntroPage() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 100 && step < 1) setStep(1);
      if (y > 300 && step < 2 && email.trim()) setStep(2);
      if (y > 500 && step < 3 && email.trim() && password.trim()) setStep(3);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [step, email, password]);

  const handleStart = async (data: LoginformData) => {
    try {
      const result = await authService.login(data);
      if (result.role === "user" || result.role === "reporter") {
        router.push(`/main`);
      }
    } catch (error: any) {
      const message = error?.message || "로그인 중 오류가 발생했습니다.";
      console.log(message);
      toast.error("로그인 정보가 틀렸습니다.");
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #0047AB 15%, #4fa3ff 50%, #ffffff 100%)",
      }}
    >
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
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          맞춤형 기사를 위해 정보를 입력해주세요
        </div>
        <div>
          {/* 이메일 입력 */}
          {step >= 1 && (
            <div style={{ padding: "0 12px" }}>
              <div
                style={{
                  maxWidth: 400,
                  width: "100%",
                  margin: "0 auto",
                  padding: 24,
                  paddingLeft: 16,
                  paddingRight: 16,
                  background: "white",
                  borderRadius: 16,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  marginBottom: 32,
                }}
              >
                <label
                  htmlFor="email"
                  style={{ fontWeight: 600, fontSize: 18 }}
                >
                  이메일을 입력하세요
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  style={{
                    width: "100%",
                    marginTop: 12,
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    fontSize: 16,
                  }}
                />
              </div>
            </div>
          )}
          {/* 비밀번호 입력 */}
          {step >= 2 && email.trim() !== "" && (
            <div style={{ padding: "0 12px" }}>
              <div style={{ padding: "0 12px" }}>
                <div
                  style={{
                    maxWidth: 400,
                    width: "100%",
                    margin: "0 auto",
                    padding: 24,
                    paddingLeft: 16,
                    paddingRight: 16,
                    background: "white",
                    borderRadius: 16,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    marginBottom: 32,
                  }}
                >
                  <label
                    htmlFor="password"
                    style={{ fontWeight: 600, fontSize: 18 }}
                  >
                    비밀번호를 입력하세요
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력해주세요"
                    style={{
                      width: "100%",
                      marginTop: 12,
                      padding: 12,
                      borderRadius: 8,
                      border: "1px solid #ddd",
                      fontSize: 16,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {/* 시작하기 버튼 */}
          <AnimatePresence>
            {step >= 2 && email && password.length >= 3 && (
              <motion.div
                key="start-btn"
                initial={{ opacity: 0, y: -32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -32 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ textAlign: "center", marginTop: 32 }}
              >
                <button
                  onClick={() => handleStart({ email, password })}
                  style={{
                    background: "#ffffff",
                    color: "#0047AB",
                    fontWeight: 700,
                    fontSize: 20,
                    padding: "16px 48px",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  로그인하기
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
