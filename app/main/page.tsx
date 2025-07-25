"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, TrendingUp, Plus, Search, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CardGlass } from "@/components/ui/card-glass";

interface Incident {
  id: string
  title: string
  region: string
  category: string
  status: "ongoing" | "resolved" | "investigating"
  summary: string
  startDate: string
  lastUpdate: string
  viewCount: number
  timelineCount: number
}

const mockIncidents: Incident[] = [
  {
    id: "1",
    title: "부천시 샤브샤브 식당 집단 구토 사건",
    region: "부천시",
    category: "식품안전",
    status: "resolved",
    summary: "부천시 소재 샤브샤브 식당에서 집단 식중독 발생. 보건소 조사 결과 노로바이러스 검출.",
    startDate: "2024-01-15",
    lastUpdate: "2024-02-10",
    viewCount: 1250,
    timelineCount: 8,
  },
  {
    id: "2",
    title: "인천시 붉은 수돗물 사건",
    region: "인천시",
    category: "환경안전",
    status: "resolved",
    summary: "인천 서구 일대에서 붉은 수돗물이 나오는 현상 발생. 상수도 관로 교체 작업 완료.",
    startDate: "2024-02-20",
    lastUpdate: "2024-03-05",
    viewCount: 2100,
    timelineCount: 12,
  },
  {
    id: "3",
    title: "포항제철소 화재 사고",
    region: "포항시",
    category: "산업안전",
    status: "investigating",
    summary: "포항제철소 내 화재 발생으로 인한 대기오염 우려. 환경부 조사 진행 중.",
    startDate: "2024-03-10",
    lastUpdate: "2024-03-15",
    viewCount: 890,
    timelineCount: 5,
  },
]

const regions = [
  "전체",
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
]
const categories = ["전체", "식품안전", "환경안전", "산업안전", "교통안전", "건설안전", "기타"]

export default function HomePage() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("전체")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>(mockIncidents)
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  useEffect(() => {
    let filtered = incidents

    if (searchTerm) {
      filtered = filtered.filter(
        (incident) =>
          incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.summary.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedRegion !== "전체") {
      filtered = filtered.filter((incident) => incident.region.includes(selectedRegion))
    }

    if (selectedCategory !== "전체") {
      filtered = filtered.filter((incident) => incident.category === selectedCategory)
    }

    setFilteredIncidents(filtered)
  }, [searchTerm, selectedRegion, selectedCategory, incidents])

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero-section');
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setShowStickyHeader(heroBottom <= 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    "전국 공사장 추락사·산업재해 사망자 증가"
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
                className="font-semibold text-[#002B64] transition-colors duration-200 hover:text-[#002B64] w-full text-center"
                style={{ lineHeight: "48px", fontSize: "13px", verticalAlign: "middle", paddingBottom: "22px" }}
              >
                {i + 1}위 {trend}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">해결완료</Badge>
      case "ongoing":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">진행중</Badge>
      case "investigating":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">조사중</Badge>
      default:
        return <Badge variant="secondary">알 수 없음</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 스크롤 시 나타나는 헤더 */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white shadow transition-transform duration-300
          ${showStickyHeader ? "translate-y-0" : "-translate-y-full pointer-events-none"}
        `}
        style={{height: 64}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/main">
                <Image src="/후일담logo.svg" alt="후일담 로고" width={40} height={40} />
              </Link>
            </div>
            <Link href="/submit">
              <Button className="bg-[#0047AB] hover:bg-[#002B64] text-white">
                <Plus className="w-4 h-4 mr-2" />
                사건 등록
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero-section"
        className="min-h-[500px] flex flex-col items-center justify-center backdrop-blur-2xl py-12"
        style={{
          background: `
            conic-gradient(
              from 120deg at 50% 50%,
              #B3C7F7 10deg,
              #B3C7F7 60deg,
              #7FDBFF 120deg,
              #0047AB 150deg,
              #001B40 180deg,
              #001B40 190deg,
              #001B40 200deg,
              #0047AB 220deg,
              #7FDBFF 270deg,
              #B3C7F7 300deg,
rgb(191, 254, 244) 310deg,
              #B3C7F7 360deg
            )
          `
        }}
      >
        {/* Hero 텍스트 */}
        <div className="mt-20 text-center">
          <h1 className="text-5xl font-extrabold leading-snug drop-shadow-xl">
            <span className="text-[#AFDCFF] drop-shadow-lg">시작</span>
            <span className="text-white drop-shadow-lg">부터 </span>
            <span className="text-[#002B64] drop-shadow-lg">끝</span>
            <span className="text-white drop-shadow-lg">까지</span>
          </h1>
          <p
            className="mt-2 text-lg"
            style={{
              color: '#F0F4FF',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            정확하고 구조화된 정보를 제공합니다.
          </p>
        </div>

        {/* 검색 박스 */}
        <div className="mt-8 flex gap-2 bg-white/20 backdrop-blur-2xl border border-white/30 shadow-lg px-6 py-3 rounded-xl items-center">
          <input
            type="text"
            placeholder="사건명이나 키워드로 검색하세요"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-white placeholder-white/70 text-base w-64"
          />
          <button className="search-btn">
            <Search className="w-5 h-5 text-[#002B64]" />
          </button>
        </div>

        {/* 세로 트렌드 롤링 */}
        <VerticalTrendCarousel trends={mockTrends} />
      </section>


      {/* Main Content */}
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        style={showStickyHeader ? { paddingTop: 115 } : {}}
      >
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8 overflow-x-auto" style={{ minWidth: 300 }}>
          <Card style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            color: "#0047AB"
          }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-bold" style={{ color: '#0047AB' }}>총 사건</p>
                  <p className="text-3xl font-bold" style={{ color: '#0047AB' }}>{incidents.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-[#0047AB] hidden md:inline" />
              </div>
            </CardContent>
          </Card>
          <Card style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            color: "#0047AB"
          }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-bold" style={{ color: '#0047AB' }}>해결된</p>
                  <p className="text-3xl font-bold" style={{ color: '#0047AB' }}>{incidents.filter((i) => i.status === "resolved").length}</p>
                </div>
                <div className="w-8 h-8 bg-[#AFDCFF] rounded-full hidden md:flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#0047AB] rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            color: "#0047AB"
          }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-bold" style={{ color: '#0047AB' }}>진행중</p>
                  <p className="text-3xl font-bold" style={{ color: '#0047AB' }}>{incidents.filter((i) => i.status === "investigating" || i.status === "ongoing").length}</p>
                </div>
                <Clock className="w-8 h-8 text-[#0047AB] hidden md:inline" />
              </div>
            </CardContent>
          </Card>
        </div>

    {/* Filters */}
      <div className="flex flex-row gap-2 items-center justify-center w-full my-4">
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="min-w-[120px] w-full sm:w-48">
            <SelectValue placeholder="지역 선택" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="min-w-[120px] w-full sm:w-48">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

        {/* Incidents List */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">최근 사건 ({filteredIncidents.length}건)</h3>
          </div>

          <div className="grid gap-6">
            {filteredIncidents.map((incident) => (
              <Card key={incident.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link href={`/incident/${incident.id}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 text-gray-900 hover:text-[#0047AB]">
                          {incident.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {incident.region}
                          </div>
                          <Badge variant="outline">{incident.category}</Badge>
                          {getStatusBadge(incident.status)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 line-clamp-2">{incident.summary}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>시작일: {incident.startDate}</span>
                        <span>최근 업데이트: {incident.lastUpdate}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>조회 {incident.viewCount.toLocaleString()}</span>
                        <span>타임라인 {incident.timelineCount}개</span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          {filteredIncidents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">검색 조건에 맞는 사건이 없습니다.</p>
              <Link href="/submit">
                <Button className="mt-4 bg-[#0047AB] hover:bg-[#002B64] text-white">새 사건 등록하기</Button>
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
  )
} 