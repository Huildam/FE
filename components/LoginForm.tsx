"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLoginMutation } from "@/hooks/useAuthQuery";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLoginMutation();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 100 && step < 1) setStep(1);
      if (y > 300 && step < 2 && email.trim()) setStep(2);
      if (y > 500 && step < 3 && email.trim() && password.trim()) setStep(3);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [step, email, password]);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      await loginMutation.mutate({ email, password });
      toast.success("로그인 성공!");
      router.push("/main");
    } catch (error: any) {
      toast.error(error.message || "로그인 정보를 다시 확인해주세요.");
    }
  };

  return (
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
              <label htmlFor="email" style={{ fontWeight: 600, fontSize: 18 }}>
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
                onClick={handleStart}
                disabled={loginMutation.isPending}
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
                {loginMutation.isPending ? "로그인 중..." : "로그인"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
