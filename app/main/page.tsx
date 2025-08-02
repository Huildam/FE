"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IncidentItem from "@/components/IncidentItem";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, TrendingUp, Search } from "lucide-react";
import Link from "next/link";
import StickyHeader from "@/components/StickyHeader";
import { eventService } from "@/api/service/eventService";
import { IncidentProps } from "@/types/Event";
import iesn from "@/public/iesn.svg";
import Image from "next/image";
import { regionService } from "@/api/service/regionService";
import { RegionType } from "@/types/Region";

const categories = [
  { id: 1, value: "전체" },
  { id: 2, value: "식품안전" },
  { id: 3, value: "전세사기" },
  { id: 4, value: "인명피해" },
  { id: 5, value: "강력범죄" },
  { id: 6, value: "동물" },
  { id: 61, value: "경제" },
  { id: 11, value: "소방" },
];

export default function HomePage() {
  const [incidents, setIncidents] = useState<IncidentProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("지역 전체");
  const [regions, setRegions] = useState<RegionType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [filteredIncidents, setFilteredIncidents] = useState<IncidentProps[]>(
    []
  );
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  const fetchEvents = async (category: string) => {
    // 조회 api 호출
    const normalizedCategory = category === "전체" ? "" : category;

    const data = await eventService.getEvents({
      category: normalizedCategory,
    });
    console.log(categories.filter((c) => c.value === category));
    setFilteredIncidents(data);
  };

  const fetchRegions = async () => {
    const result = await regionService.getRegions();
    setRegions(result);
  };

  useEffect(() => {
    fetchRegions();
    fetchEvents("전체");
  }, []);

  useEffect(() => {
    let filtered = incidents;

    if (searchTerm) {
      filtered = filtered.filter(
        (incident) =>
          incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // if (selectedRegion !== "전체") {
    //   filtered = filtered.filter((incident) =>
    //     incident.region.includes(selectedRegion)
    //   );
    // }

    if (selectedCategory !== "전체") {
      filtered = filtered.filter(
        (incident) => incident.category === selectedCategory
      );
    }

    setFilteredIncidents(filtered);
  }, [searchTerm, selectedRegion, selectedCategory, incidents]);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero-section");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setShowStickyHeader(heroBottom <= 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 트렌드 목업 데이터
  const mockTrends = [
    "영남·충청·호남 대형 산불 피해 확산",
    "서울 강동구 대형 싱크홀로 오토바이 운전자 사망",
    "경기 오산 고가도로 옹벽 붕괴 사고 조사 착수",
    "인천 10대 무면허 킥보드 뇌출혈 중상",
    "부평 교통사고 다발지점 개선 사업 본격화",
    "울산 선박·조선소 산업재해 증가 추세",
    "전남 여수 화학공장 유증기 누출 사고",
    "대구 도심 주택가 가스 폭발 사고 발생",
    "제주 서귀포 해상 낚시 어선 침몰 구조작업",
    "전국 공사장 추락사·산업재해 사망자 증가",
  ];

  // 세로 롤링 트렌드 컴포넌트
  function VerticalTrendCarousel({ trends }: { trends: string[] }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      if (!paused) {
        intervalRef.current = setInterval(() => {
          setIndex((prev) => (prev + 1) % trends.length);
        }, 2000);
      }
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [paused, trends.length]);

    return (
      <div
        className="mt-4 flex flex-col bg-white/20 backdrop-blur-2xl border border-white/30 shadow-lg px-6 py-3 rounded-xl items-center w-full max-w-xs mx-auto h-12 overflow-hidden select-none text-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="transition-transform duration-500 ease-in-out w-full"
          style={{ transform: `translateY(-${index * 3}rem)` }}
        >
          {trends.map((trend, i) => (
            <div
              key={i}
              className="h-12 flex items-center justify-center cursor-pointer"
            >
              <span
                className="font-semibold text-[#fff] transition-colors duration-200 hover:text-[#fff] w-full text-center"
                style={{
                  lineHeight: "48px",
                  fontSize: "13px",
                  verticalAlign: "middle",
                  paddingBottom: "22px",
                }}
              >
                {i + 1}위 {trend}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 스크롤 시 나타나는 헤더 */}
      <StickyHeader heroSectionId="hero-section" />

      {/* Hero Section */}
      <section
        id="hero-section"
        className="min-h-[300px] flex flex-col items-center justify-center backdrop-blur-2xl py-12"
        style={{
          background: `
    linear-gradient(
      to bottom,
      #001B40 40%,
      #0047AB 70%,
      #ffffff 100%
    )
  `,
        }}
      >
        {/* Hero 텍스트 */}
        <div className="text-center">
          {/* <h1 className="text-5xl font-extrabold leading-snug drop-shadow-xl">
            <span className="text-[#AFDCFF] drop-shadow-lg">시작</span>
            <span className="text-white drop-shadow-lg">부터 </span>
            <span className="text-[#002B64] drop-shadow-lg">끝</span>
            <span className="text-white drop-shadow-lg">까지</span>
          </h1> */}
          <Image src={iesn} alt="iesn" width={100} height={100} />
        </div>

        <div className="flex gap-4 items-center">
          {/* 세로 트렌드 롤링 */}
          <VerticalTrendCarousel trends={mockTrends} />

          {/* 검색 박스 */}
          <div className="mt-4 flex gap-2 bg-white/20 backdrop-blur-2xl border border-white/30 shadow-lg px-6 py-3 rounded-xl items-center">
            <input
              type="text"
              placeholder="사건명이나 키워드로 검색하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-white placeholder-white/70 text-base w-64"
            />
            <button className="search-btn">
              <Search className="w-5 h-5 text-[#002B64]" />
            </button>
          </div>
        </div>

        {/* 키워드 버튼 */}
        <div className="mt-4 flex gap-2 items-center justify-center">
          {categories.map((category) => (
            <Button
              variant={"keyword"}
              key={category.id}
              onClick={() => {
                fetchEvents(category.value);
              }}
            >
              {category.value}
            </Button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        style={showStickyHeader ? { paddingTop: 115 } : {}}
      >
        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-6 pb-8 overflow-x-auto"
          style={{ minWidth: 300 }}
        >
          <Card
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              color: "#0047AB",
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-base font-bold"
                    style={{ color: "#0047AB" }}
                  >
                    총 사건
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: "#0047AB" }}
                  >
                    {filteredIncidents.length}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-[#0047AB] hidden md:inline" />
              </div>
            </CardContent>
          </Card>
          <Card
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              color: "#0047AB",
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-base font-bold"
                    style={{ color: "#0047AB" }}
                  >
                    해결된
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: "#0047AB" }}
                  >
                    {incidents.filter((i) => i.status === "resolved").length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-[#AFDCFF] rounded-full hidden md:flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#0047AB] rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              color: "#0047AB",
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-base font-bold"
                    style={{ color: "#0047AB" }}
                  >
                    진행중
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: "#0047AB" }}
                  >
                    {
                      incidents.filter(
                        (i) =>
                          i.status === "investigating" || i.status === "ongoing"
                      ).length
                    }
                  </p>
                </div>
                <Clock className="w-8 h-8 text-[#0047AB] hidden md:inline" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Incidents List */}
        <div className="space-y-6">
          <div className="w-full flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">
              최근 사건 ({filteredIncidents.length}건)
            </h3>

            {/* Filters */}
            <div className="flex flex-row gap-2 items-center justify-center my-4">
              <Select>
                <SelectTrigger className="min-w-[120px] w-full sm:w-48">
                  <SelectValue placeholder="지역 선택" />
                </SelectTrigger>
                <SelectContent>
                  {regions?.map((region: RegionType) => (
                    <SelectItem key={region.id} value={region.name}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6">
            {filteredIncidents.map((incident) => (
              <IncidentItem key={incident.id} incident={incident} />
            ))}
          </div>

          {filteredIncidents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                검색 조건에 맞는 사건이 없습니다.
              </p>
              <Link href="/submit">
                <Button className="mt-4 bg-[#0047AB] hover:bg-[#002B64] text-white">
                  새 사건 등록하기
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-[#0047AB]">후일담</h4>
              <p className="text-gray-400">
                지역 사건의 시작부터 끝까지,
                <br />
                정확하고 구조화된 정보를 제공합니다.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">서비스</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/main" className="hover:text-white">
                    사건 검색
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="hover:text-white">
                    사건 등록
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">문의</h5>
              <p className="text-gray-400">
                이메일: contact@hujildam.com
                <br />
                전화: 02-1234-5678
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 후일담. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
