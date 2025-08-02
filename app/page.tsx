import React from "react";
import "@kfonts/hakgyoansim-mabeopsa";
import LoginForm from "@/components/LoginForm";
import Parallax from "@/components/parallax/Parallax";

export default function IntroPage() {
  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #0047AB 15%, #4fa3ff 50%, #ffffff 100%)",
      }}
    >
      <Parallax />
      <LoginForm />
    </div>
  );
}
