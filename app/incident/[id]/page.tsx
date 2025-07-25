"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Clock, Eye, Calendar, ExternalLink, ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Image from "next/image"

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  source: string
  sourceUrl?: string
  type: "news" | "official" | "user"
}

interface Incident {
  id: string
  title: string
  region: string
  category: string
  status: "ongoing" | "resolved" | "investigating"
  summary: string
  description: string
  startDate: string
  lastUpdate: string
  viewCount: number
  timeline: TimelineEvent[]
  tags: string[]
}

const mockIncident: Incident = {
  id: "1",
  title: "부천시 샤브샤브 식당 집단 구토 사건",
  region: "부천시",
  category: "식품안전",
  status: "resolved",
  summary: "부천시 소재 샤브샤브 식당에서 집단 식중독 발생. 보건소 조사 결과 노로바이러스 검출.",
  description:
    "2024년 1월 15일 부천시 원미구 소재 샤브샤브 전문점에서 식사한 고객들이 집단으로 구토와 설사 증상을 호소하는 사건이 발생했습니다. 초기에는 20여 명의 피해자가 신고되었으나, 추가 조사를 통해 총 35명의 피해자가 확인되었습니다.",
  startDate: "2024-01-15",
  lastUpdate: "2024-02-10",
  viewCount: 1250,
  tags: ["식중독", "노로바이러스", "부천시", "샤브샤브", "집단구토"],
  timeline: [
    {
      id: "1",
      date: "2024-01-15",
      title: "집단 식중독 신고 접수",
      description: "부천시 보건소에 샤브샤브 식당 이용 고객들의 집단 구토 신고 접수. 초기 신고자 20명.",
      source: "부천시 보건소",
      type: "official",
    },
    {
      id: "2",
      date: "2024-01-16",
      title: "식당 임시 폐쇄 및 역학조사 시작",
      description: "해당 식당 임시 폐쇄 조치. 보건소 역학조사팀 현장 조사 실시.",
      source: "부천뉴스",
      sourceUrl: "https://www.bucheonnews.net/news/articleView.html?idxno=48201",
      type: "news",
    },
    {
      id: "3",
      date: "2024-01-18",
      title: "피해자 규모 확대",
      description: "추가 신고를 통해 피해자 총 35명으로 확인. 모두 같은 날 해당 식당 이용.",
      source: "경기도청",
      type: "official",
    },
    {
      id: "4",
      date: "2024-01-22",
      title: "검사 결과 노로바이러스 검출",
      description: "식품 및 환경 검체에서 노로바이러스 검출. 식중독 원인 확인.",
      source: "질병관리청",
      type: "official",
    },
    {
      id: "5",
      date: "2024-01-25",
      title: "식당 운영자 과태료 부과",
      description: "식품위생법 위반으로 식당 운영자에게 과태료 500만원 부과.",
      source: "부천시청",
      type: "official",
    },
    {
      id: "6",
      date: "2024-02-01",
      title: "위생 개선 후 재개장 허가",
      description: "위생시설 개선 및 직원 교육 완료 후 영업 재개 허가.",
      source: "부천시 보건소",
      type: "official",
    },
    {
      id: "7",
      date: "2024-02-05",
      title: "피해자 배상 합의",
      description: "식당 측과 피해자들 간 배상 합의 완료. 1인당 평균 50만원 배상.",
      source: "사용자 제보",
      type: "user",
    },
    {
      id: "8",
      date: "2024-02-10",
      title: "사건 종료",
      description: "모든 행정처분 및 배상 절차 완료. 사건 공식 종료.",
      source: "부천시청",
      type: "official",
    },
  ],
}

export default function IncidentDetailPage() {
  const params = useParams()
  const [incident, setIncident] = useState<Incident>(mockIncident)
  const [newComment, setNewComment] = useState("")

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

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "official":
        return <div className="w-3 h-3 bg-[#0047AB] rounded-full"></div>
      case "news":
        return <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
      case "user":
        return <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/main">
                <Image src="/후일담logo.svg" alt="후일담 로고" width={48} height={48} />
              </Link>
            </div>
            <Link href="/main">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                목록으로
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Incident Header */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-3 text-gray-900">{incident.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {incident.region}
                      </div>
                      <Badge variant="outline">{incident.category}</Badge>
                      {getStatusBadge(incident.status)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-500 border-t pt-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    시작일: {incident.startDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    최근 업데이트: {incident.lastUpdate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    조회 {incident.viewCount.toLocaleString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">사건 요약</h4>
                    <p className="text-gray-700">{incident.summary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">상세 내용</h4>
                    <p className="text-gray-700 leading-relaxed">{incident.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">관련 태그</h4>
                    <div className="flex flex-wrap gap-2">
                      {incident.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#0047AB]" />
                  사건 타임라인
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {incident.timeline.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        {getTimelineIcon(event.type)}
                        {index < incident.timeline.length - 1 && <div className="w-px h-16 bg-gray-200 mt-2"></div>}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-[#0047AB]">{event.date}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              event.type === "official"
                                ? "border-[#0047AB] text-[#0047AB]"
                                : event.type === "news"
                                  ? "border-orange-500 text-orange-500"
                                  : "border-green-500 text-green-500"
                            }`}
                          >
                            {event.type === "official" ? "공식" : event.type === "news" ? "언론" : "사용자"}
                          </Badge>
                        </div>
                        <h5 className="font-semibold text-gray-900 mb-2">{event.title}</h5>
                        <p className="text-gray-700 text-sm mb-2">{event.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>출처: {event.source}</span>
                          {event.sourceUrl && (
                            <a
                              href={event.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-[#0047AB] hover:underline"
                            >
                              <ExternalLink className="w-3 h-3" />
                              링크
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add Timeline Event */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#0047AB]" />
                  타임라인 추가하기
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="새로운 정보나 업데이트가 있다면 공유해주세요..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={4}
                  />
                  <Button className="bg-[#0047AB] hover:bg-[#002B64] text-white">정보 추가하기</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">사건 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">상태</span>
                  {getStatusBadge(incident.status)}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">지역</span>
                  <span className="font-medium">{incident.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">카테고리</span>
                  <span className="font-medium">{incident.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">타임라인</span>
                  <span className="font-medium">{incident.timeline.length}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">조회수</span>
                  <span className="font-medium">{incident.viewCount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Related Incidents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">관련 사건</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h6 className="font-medium text-sm mb-1">인천시 붉은 수돗물 사건</h6>
                    <p className="text-xs text-gray-600">환경안전 • 인천시</p>
                  </div>
                  <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h6 className="font-medium text-sm mb-1">서울 강남구 식중독 사건</h6>
                    <p className="text-xs text-gray-600">식품안전 • 서울시</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">공유하기</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    링크 복사
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    SNS 공유
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
