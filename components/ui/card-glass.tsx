import React from "react";

interface CardGlassProps {
  title: string;
  count: number | string;
  className?: string;
}

export function CardGlass({ title, count, className }: CardGlassProps) {
  return (
    <div
      className={`w-32 h-36 rounded-2xl flex flex-col justify-center items-center font-semibold p-2 ${className || ''}`}
      style={{
        background: "rgba(255,255,255,0.15)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        color: "#0047AB"
      }}
    >
      {title}
      <div style={{ fontSize: 28, fontWeight: "bold", color: "#0047AB", marginTop: 4 }}>{count}</div>
    </div>
  );
} 