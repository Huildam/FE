"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Home,
  Search,
  FileText,
  ArrowLeft,
  MapPin,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MobileNav } from "@/components/mobile-nav";

export default function NotFound() {
  const [searchTerm, setSearchTerm] = useState("");

  const popularIncidents = [
    {
      id: "1",
      title: "부천시 샤브샤브 식당 집단 구토 사건",
      region: "부천시",
      category: "식품안전",
    },
    {
      id: "2",
      title: "인천시 붉은 수돗물 사건",
      region: "인천시",
      category: "환경안전",
    },
    {
      id: "3",
      title: "포항제철소 화재 사고",
      region: "포항시",
      category: "산업안전",
    },
  ];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <h1 className="text-2xl font-bold text-[#0047AB]">후일담</h1>
              </Link>
              <span className="text-gray-400 hidden sm:inline">|</span>
              <h2 className="text-lg font-medium text-gray-700 hidden sm:block">
                페이지를 찾을 수 없습니다
              </h2>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline">
                  <Home className="w-4 h-4 mr-2" />
                  홈으로
                </Button>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <MobileNav currentPath="/404" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 404 Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <AlertCircle className="w-24 h-24 text-[#0047AB] mx-auto mb-6" />
            <h1 className="text-6xl font-bold text-[#0047AB] mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              페이지를 찾을 수 없습니다
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
              <br />
              아래 방법들을 통해 원하시는 정보를 찾아보세요.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button
                size="lg"
                className="bg-[#0047AB] hover:bg-[#002B64] text-white"
              >
                <Home className="w-5 h-5 mr-2" />
                홈으로 돌아가기
              </Button>
            </Link>
            <Link href="/submit">
              <Button size="lg" variant="outline">
                <FileText className="w-5 h-5 mr-2" />
                사건 등록하기
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Search className="w-12 h-12 text-[#0047AB] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                사건 검색하기
              </h3>
              <p className="text-gray-600">
                찾고 계신 사건이나 지역명을 검색해보세요
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="사건명이나 지역명을 입력하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 py-3"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="bg-[#0047AB] hover:bg-[#002B64] text-white px-8 py-3"
                >
                  검색
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Incidents */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                인기 사건
              </h3>
              <p className="text-gray-600">
                많은 사람들이 관심을 가지고 있는 사건들입니다
              </p>
            </div>

            <div className="grid gap-4">
              {popularIncidents.map((incident) => (
                <Link key={incident.id} href={`/incident/${incident.id}`}>
                  <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 hover:border-[#0047AB] transition-colors">
                    <div className="w-2 h-2 bg-[#0047AB] rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 hover:text-[#0047AB] mb-1">
                        {incident.title}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {incident.region}
                        </div>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {incident.category}
                        </span>
                      </div>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Home className="w-12 h-12 text-[#0047AB] mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">메인 페이지</h4>
              <p className="text-gray-600 text-sm mb-4">
                최신 사건들과 전체 현황을 확인하세요
              </p>
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                >
                  바로가기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="w-12 h-12 text-[#0047AB] mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">사건 등록</h4>
              <p className="text-gray-600 text-sm mb-4">
                새로운 지역 사건을 등록해주세요
              </p>
              <Link href="/submit">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                >
                  바로가기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-[#0047AB] mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">서비스 소개</h4>
              <p className="text-gray-600 text-sm mb-4">
                후일담 서비스에 대해 자세히 알아보세요
              </p>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                >
                  바로가기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16 pt-8 border-t">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            여전히 문제가 해결되지 않으셨나요?
          </h4>
          <p className="text-gray-600 mb-6">
            기술적인 문제나 궁금한 점이 있으시면 언제든지 문의해주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <span>📧</span>
              <span>contact@hujildam.com</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>📞</span>
              <span>02-1234-5678</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
