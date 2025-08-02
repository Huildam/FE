"use client";

import { useEffect, useState } from "react";
import { eventService } from "@/api/service/eventService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface Incident {
  id: string;
  title: string;
  region: string;
  category: string;
  status: "ongoing" | "resolved" | "investigating";
  summary: string;
  startDate: string;
  lastUpdate: string;
  viewCount: number;
  timelineCount: number;
}

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
];

const categories = [
  "전체",
  "식품안전",
  "전세사기",
  "인명피해",
  "강력범죄",
  "동물",
  "경제",
  "소방",
];

const convertRegionToId = (region: string): number | undefined => {
  const regionMap: Record<string, number> = {
    서울: 1,
    부산: 2,
    대구: 3,
    인천: 4,
    광주: 5,
    대전: 6,
    울산: 7,
    세종: 8,
    경기: 9,
    강원: 10,
    충북: 11,
    충남: 12,
    전북: 13,
    전남: 14,
    경북: 15,
    경남: 16,
    제주: 17,
  };
  return regionMap[region];
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

export default function IncidentsList() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await eventService.getEvents({
        regionId:
          selectedRegion !== "전체"
            ? convertRegionToId(selectedRegion)
            : undefined,
        category: selectedCategory !== "전체" ? selectedCategory : undefined,
      });
      setIncidents(res);
    } catch (e) {
      console.error("Failed to load incidents", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedRegion, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-900">
          사건 목록 ({incidents.length}건)
        </h3>

        <div className="flex gap-2 w-full md:w-auto">
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
      </div>

      <div className="grid gap-6">
        {loading ? (
          <p>불러오는 중...</p>
        ) : incidents.length > 0 ? (
          incidents.map((incident) => (
            <Card
              key={incident.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
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
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {incident.summary}
                  </p>
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
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              해당 조건에 맞는 사건이 없습니다.
            </p>
            <Link href="/submit">
              <Button className="mt-4 bg-[#0047AB] hover:bg-[#002B64] text-white">
                새 사건 등록하기
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
