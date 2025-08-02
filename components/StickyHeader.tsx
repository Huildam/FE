"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { User, Plus } from "lucide-react";
import clsx from "clsx";

export default function StickyHeader({
  heroSectionId = "hero-section",
}: {
  heroSectionId?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById(heroSectionId);
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setShow(heroBottom <= 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroSectionId]);

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full z-50 bg-white shadow transition-transform duration-300",
        {
          "translate-y-0": show,
          "-translate-y-full pointer-events-none": !show,
        }
      )}
      style={{ height: 64 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/main">
          <Image
            src="/후일담logo.svg"
            alt="후일담 로고"
            width={40}
            height={40}
          />
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/mypage">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-[#0047AB]"
            >
              <User className="w-4 h-4 mr-2" />
              마이페이지
            </Button>
          </Link>
          <Link href="/submit">
            <Button className="bg-[#0047AB] hover:bg-[#002B64] text-white">
              <Plus className="w-4 h-4 mr-2" />
              사건 등록
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
