"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Target,
  Users,
  Shield,
  TrendingUp,
  Clock,
  MapPin,
  User,
} from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";

export default function AboutPage() {
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
                서비스 소개
              </h2>
            </div>

            {/* Desktop Navigation */}
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
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  홈으로
                </Button>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <MobileNav currentPath="/about" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            그곳에 사는 누군가를 위해
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            흐름과 결과까지 정리해드립니다
          </p>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              후일담은 지역에서 발생하는 사건·사고의 전체 타임라인과 최종
              결말까지 기록하고 정리해주는 정보 플랫폼입니다. 단순한 뉴스 소비를
              넘어서, 사건의 시작부터 끝까지 구조화된 정보를 제공합니다.
            </p>
          </div>
        </section>

        {/* Problem & Solution */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  해결하고자 하는 문제
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-red-700">
                      지역 사건·사고는 발생 당시에는 주목받지만, 이후의
                      진행과정이나 최종 결과는 잘 알려지지 않음
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-red-700">
                      당사자가 잘못된 보도나 정보에 반박하고 싶어도, 이를 알릴
                      공간과 기회가 부족함
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-red-700">
                      중앙집중형 언론구조 속에서 다양한 지역 목소리가 묻히고
                      있음
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-[#0047AB] flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  우리의 솔루션
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#0047AB] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-[#002B64]">
                      사건의 '시작'이 아닌 '끝'까지 다루는 구조화 콘텐츠 제공
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#0047AB] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-[#002B64]">
                      단순 기사 아카이빙이 아닌 경과 정리 + 당사자 관점 반영
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#0047AB] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-[#002B64]">
                      오보 정정 및 독립 제보 시스템을 통한 시민 저널리즘 실현
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            주요 기능
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-[#0047AB] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <CardTitle>타임라인 추적</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  사건의 발생부터 해결까지 전체 과정을 시간순으로 정리하여
                  제공합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-[#0047AB] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <CardTitle>지역별 분류</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  전국 지역별로 사건을 분류하여 관심 지역의 정보를 쉽게 찾을 수
                  있습니다.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-[#0047AB] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>시민 참여</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  누구나 사건을 등록하고 추가 정보를 제공할 수 있는 참여형
                  플랫폼입니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Target Users */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            이런 분들을 위해 만들었습니다
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#0047AB]">
                  김지은 (27세, 여성)
                </CardTitle>
                <p className="text-gray-600">인천 거주, 취업준비생</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• 사회와 지역 이슈에 관심이 많음</p>
                  <p>• 커뮤니티, 포털뉴스에서 지역 사건을 자주 검색</p>
                  <p>• "이런 사건이 있었지... 그 뒤에는 어떻게 됐을까?"</p>
                  <p>• 사건의 맥락과 경과를 알고 싶어함</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#0047AB]">
                  김재현 (35세, 남성)
                </CardTitle>
                <p className="text-gray-600">포항 거주, 직장인</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• 포항제철소 관련 이슈를 정기적으로 검색</p>
                  <p>
                    • "우리 지역에 작은 문제라도 알고 싶은데, 정보가 흩어져
                    있어서 찾기 어렵네."
                  </p>
                  <p>• 제철소 관련 정책/환경영향 분석 콘텐츠 선호</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#0047AB]">
                  조혜진 (49세, 여성)
                </CardTitle>
                <p className="text-gray-600">강원도 거주, 전업주부</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• 먹거리 관련 이슈에 관심이 많음</p>
                  <p>• "아이랑 먹는 식품, 물 안전한 걸까?"</p>
                  <p>
                    • 사건 발생 이후 정확하고 신뢰할 수 있는 결말 정보를 찾고
                    싶어함
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Market Potential */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl text-[#0047AB] flex items-center justify-center gap-2">
                <TrendingUp className="w-6 h-6" />
                시장 전망
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg mb-4">
                    글로벌 하이퍼로컬 뉴스 시장
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>2024년 시장 규모</span>
                      <span className="font-semibold">21억 달러</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2033년 예상 규모</span>
                      <span className="font-semibold">63억 달러</span>
                    </div>
                    <div className="flex justify-between">
                      <span>연평균 성장률 (CAGR)</span>
                      <span className="font-semibold text-green-600">
                        14.2%
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-4">성장 동력</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#0047AB] rounded-full mt-2 flex-shrink-0"></div>
                      <span>모바일 중심 뉴스 소비 증가</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#0047AB] rounded-full mt-2 flex-shrink-0"></div>
                      <span>사용자 맞춤형 콘텐츠 수요 증가</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#0047AB] rounded-full mt-2 flex-shrink-0"></div>
                      <span>로컬 광고 시장 확대</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#0047AB] rounded-full mt-2 flex-shrink-0"></div>
                      <span>공공기관 커뮤니케이션 채널 확대</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* KPI */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            목표 지표 (KPI)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#0047AB] mb-2">
                  50,000
                </div>
                <div className="text-sm text-gray-600">연간 방문자 수</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#0047AB] mb-2">
                  1,000
                </div>
                <div className="text-sm text-gray-600">월간 신규 가입자</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#0047AB] mb-2">
                  80%
                </div>
                <div className="text-sm text-gray-600">재방문율</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#0047AB] mb-2">5%</div>
                <div className="text-sm text-gray-600">상위 기여자 비율</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            팀 소개
          </h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-[#0047AB]">
                구름치킨털이4인조
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-lg mb-2">이재석</h4>
                  <p className="text-[#0047AB] font-medium mb-2">AI</p>
                  <p className="text-sm text-gray-600">
                    데이터 크롤링과 크롤링된 데이터 관리
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-lg mb-2">양아름</h4>
                  <p className="text-[#0047AB] font-medium mb-2">프론트엔드</p>
                  <p className="text-sm text-gray-600">
                    UI 구현 및 API 연동/와이어프레임
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-lg mb-2">김택천</h4>
                  <p className="text-[#0047AB] font-medium mb-2">
                    풀스택(백엔드)
                  </p>
                  <p className="text-sm text-gray-600">
                    API 연동&개발 및 DB 설계
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-lg mb-2">정하은</h4>
                  <p className="text-[#0047AB] font-medium mb-2">
                    풀스택/디자이너
                  </p>
                  <p className="text-sm text-gray-600">
                    API 연동&개발 및 DB 설계/UI/UX 디자인
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-[#0047AB] to-[#002B64] text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">지금 시작해보세요</h2>
              <p className="text-xl mb-8 opacity-90">
                여러분의 지역에서 일어난 사건들의 진짜 이야기를 확인해보세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button size="lg" variant="secondary">
                    사건 둘러보기
                  </Button>
                </Link>
                <Link href="/submit">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-[#0047AB] bg-transparent"
                  >
                    사건 등록하기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
