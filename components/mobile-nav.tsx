"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  X,
  Home,
  Plus,
  User,
  Info,
  FileText,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

interface MobileNavProps {
  currentPath?: string;
}

export function MobileNav({ currentPath = "/" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      title: "홈",
      href: "/",
      icon: Home,
      description: "메인 페이지로 이동",
    },
    {
      title: "사건 등록",
      href: "/submit",
      icon: Plus,
      description: "새로운 사건을 등록합니다",
    },
    {
      title: "마이페이지",
      href: "/mypage",
      icon: User,
      description: "내 정보 및 등록한 사건 관리",
    },
    {
      title: "서비스 소개",
      href: "/about",
      icon: Info,
      description: "후일담 서비스에 대해 알아보기",
    },
  ];

  const closeSheet = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 sm:w-96">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold text-[#0047AB]">
              후일담
            </SheetTitle>
            <Button variant="ghost" size="sm" onClick={closeSheet}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 text-left">
            지역 사건의 시작부터 끝까지
          </p>
        </SheetHeader>

        <nav className="mt-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href;

              return (
                <Link key={item.href} href={item.href} onClick={closeSheet}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#0047AB] text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div
                        className={`text-xs ${
                          isActive ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {item.description}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              빠른 액세스
            </h4>
            <div className="space-y-2">
              <Link href="/mypage" onClick={closeSheet}>
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">내가 등록한 사건</span>
                </div>
              </Link>
              <Link href="/mypage" onClick={closeSheet}>
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                  <Bookmark className="h-4 w-4" />
                  <span className="text-sm">북마크</span>
                </div>
              </Link>
              <Link href="/mypage" onClick={closeSheet}>
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">내 활동</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">문의</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>이메일: contact@hujildam.com</p>
              <p>전화: 02-1234-5678</p>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
