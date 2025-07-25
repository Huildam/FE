import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { wrap } from "@motionone/utils";
import "./ParallaxText.css";

interface ParallaxTextProps {
  children: React.ReactNode;
  baseVelocity?: number;
  repeat?: number;
  className?: string;
  style?: React.CSSProperties;
  yParallax?: boolean;
}

export default function ParallaxText({
  children,
  baseVelocity = 100,
  repeat = 4,
  className = "",
  style = {},
  yParallax = false,
}: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // 부드러운 시작을 위한 velocity 상태
  const [animatedVelocity, setAnimatedVelocity] = useState(0);
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 1000; // 1초 동안 가속
    function animate(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      // easeOutCubic
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedVelocity(baseVelocity * eased);
      if (t < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setAnimatedVelocity(baseVelocity);
      }
    }
    setAnimatedVelocity(0);
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [baseVelocity]);

  const x = useTransform(baseX, (v: number) => `${wrap(-100, 0, v)}%`);
  const directionFactor = useRef(1);
  const y = yParallax ? useTransform(scrollY, (v: number) => v) : undefined;

  useAnimationFrame((t: number, delta: number) => {
    let moveBy = directionFactor.current * animatedVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const spans = [];
  for (let i = 0; i < repeat; i++) {
    spans.push(<span key={i}>{children}&nbsp;&nbsp;</span>);
  }

  return (
    <div className={`parallax ${className}`} style={style}>
      <motion.div className="scroller" style={yParallax ? { x, y } : { x }}>
        {spans}
      </motion.div>
    </div>
  );
} 