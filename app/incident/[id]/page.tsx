"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Clock,
  Eye,
  Calendar,
  ExternalLink,
  ArrowLeft,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { eventService } from "@/api/service/eventService";
import { IncidentProps } from "@/types/Event";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  source: string;
  sourceUrl?: string;
  type: "news" | "official" | "user";
}

export default function IncidentDetailPage() {
  const [incident, setIncident] = useState<IncidentProps | null>(null);
  const [newComment, setNewComment] = useState("");
  const params = useParams();

  console.log("params", params);

  useEffect(() => {
    const id = parseInt(params?.id as string, 10);

    if (!isNaN(id)) {
      fetchEventDetail(id);
    }
  }, [params]);

  const fetchEventDetail = async (id: number) => {
    try {
      const data = await eventService.getEventDetail(id);
      setIncident(data);
    } catch (err) {
      console.error("이벤트 조회 실패", err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            해결완료
          </Badge>
        );
      case "ongoing":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            진행중
          </Badge>
        );
      case "investigating":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            조사중
          </Badge>
        );
      default:
        return <Badge variant="secondary">알 수 없음</Badge>;
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "official":
        return <div className="w-3 h-3 bg-[#0047AB] rounded-full"></div>;
      case "news":
        return <div className="w-3 h-3 bg-orange-500 rounded-full"></div>;
      case "user":
        return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/main">
                <Image
                  src="/후일담logo.svg"
                  alt="후일담 로고"
                  width={48}
                  height={48}
                />
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
                    <CardTitle className="text-2xl mb-3 text-gray-900">
                      {incident?.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {incident?.region.id}
                      </div>
                      <Badge variant="outline">{incident?.category}</Badge>
                      {incident?.status}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-500 border-t pt-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    시작일: {incident?.eventDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    최근 업데이트: {incident?.updatedAt}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    조회 {incident?.viewCount.toLocaleString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      사건 요약
                    </h4>
                    <p className="text-gray-700">{incident?.summary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      상세 내용
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {incident?.description}
                    </p>
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
                  {incident?.timelines.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        {getTimelineIcon(event.sourceType)}
                        {index < incident.timelines.length - 1 && (
                          <div className="w-px h-16 bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-[#0047AB]">
                            {event.eventDate}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              event.sourceType === "official"
                                ? "border-[#0047AB] text-[#0047AB]"
                                : event.sourceType === "news"
                                ? "border-orange-500 text-orange-500"
                                : "border-green-500 text-green-500"
                            }`}
                          >
                            {event.sourceType === "official"
                              ? "공식"
                              : event.sourceType === "news"
                              ? "언론"
                              : "사용자"}
                          </Badge>
                        </div>
                        <h5 className="font-semibold text-gray-900 mb-2">
                          {event.title}
                        </h5>
                        <p className="text-gray-700 text-sm mb-2">
                          {event.summary}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>출처: {event.sourceName}</span>
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
                  <Button className="bg-[#0047AB] hover:bg-[#002B64] text-white">
                    정보 추가하기
                  </Button>
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
                  {incident?.status}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">지역</span>
                  <span className="font-medium">{incident?.region.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">카테고리</span>
                  <span className="font-medium">{incident?.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">타임라인</span>
                  <span className="font-medium">
                    {incident?.timelines.length}개
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">조회수</span>
                  <span className="font-medium">
                    {incident?.viewCount.toLocaleString()}
                  </span>
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
                    <h6 className="font-medium text-sm mb-1">
                      인천시 붉은 수돗물 사건
                    </h6>
                    <p className="text-xs text-gray-600">환경안전 • 인천시</p>
                  </div>
                  <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h6 className="font-medium text-sm mb-1">
                      서울 강남구 식중독 사건
                    </h6>
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    링크 복사
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    SNS 공유
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
