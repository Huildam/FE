"use client";

import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Edit3,
  Save,
  X,
  ArrowLeft,
  Settings,
  ShoppingCart,
  Coins,
  Star,
} from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { useLogoutMutation } from "@/hooks/useAuthQuery";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface JournalistProfile {
  email: string;
  role: "reporter";
  createdAt: string;
  region: {
    name: string;
  };
  username: string;
  profileImage?: string;
  bio?: string;
  company: string;
  availableCredits: number;
  rating: number;
  totalPurchases: number;
}

interface AvailableReport {
  title: string;
  summary: string;
  eventDate: string;
  region: {
    name: string;
    parentName: string;
  };
  reportedAt: string;
  isPurchasable: boolean;
  price: number; // 추가된 필드
  reporterName: string; // 추가된 필드
  urgency: "high" | "medium" | "low"; // 추가된 필드
}

interface PurchasedReport {
  title: string;
  summary: string;
  eventDate: string;
  region: {
    name: string;
    parentName: string;
  };
  purchasedAt: string;
}

const mockJournalist: JournalistProfile = {
  email: "pressman@example.com",
  role: "reporter",
  createdAt: "2024-12-12T09:00:00Z",
  region: {
    name: "강원도",
  },
  username: "기자김뉴스",
  profileImage: "/placeholder.svg?height=100&width=100",
  bio: "강원도 지역 이슈를 다루는 탐사 기자입니다. 정확하고 깊이 있는 보도를 위해 노력합니다.",
  company: "후일담 뉴스",
  availableCredits: 5000,
  rating: 4.8,
  totalPurchases: 15,
};

const mockAvailableReports: AvailableReport[] = [
  {
    title: "강릉시 해변 플라스틱 쓰레기 급증",
    summary:
      "최근 강릉시 해변가에서 플라스틱 쓰레기가 급증하여 환경오염 우려가 커지고 있다. 관광객 증가와 함께 해변 정화 작업의 필요성이 대두되고 있으며, 지역 환경단체들이 대책 마련을 촉구하고 있다.",
    eventDate: "2025-07-23",
    region: {
      name: "강릉시",
      parentName: "강원도",
    },
    reportedAt: "2025-07-24T09:30:00Z",
    isPurchasable: true,
    price: 800,
    reporterName: "환경지킴이김환경",
    urgency: "high",
  },
  {
    title: "원주시 산업단지 대기오염 민원 접수",
    summary:
      "원주시 산업단지 인근에서 대기오염 관련 민원이 다수 접수되었다. 주민들은 악취와 미세먼지 증가를 호소하고 있으며, 시청에서는 환경 조사를 실시하기로 했다.",
    eventDate: "2025-07-22",
    region: {
      name: "원주시",
      parentName: "강원도",
    },
    reportedAt: "2025-07-23T14:00:00Z",
    isPurchasable: true,
    price: 1000,
    reporterName: "시민감시단박시민",
    urgency: "high",
  },
  {
    title: "속초시 도로 파손으로 교통 불편 신고",
    summary:
      "속초시 내 주요 도로 파손으로 인해 주민들의 교통 불편 신고가 잇따르고 있다. 겨울철 제설작업과 봄철 해빙으로 인한 도로 손상이 주요 원인으로 분석되고 있다.",
    eventDate: "2025-07-21",
    region: {
      name: "속초시",
      parentName: "강원도",
    },
    reportedAt: "2025-07-22T16:45:00Z",
    isPurchasable: true,
    price: 600,
    reporterName: "교통모니터링이교통",
    urgency: "medium",
  },
];

const mockPurchasedReports: PurchasedReport[] = [
  {
    title: "춘천시 하천 오염 문제",
    summary:
      "춘천시 하천의 수질 오염에 관한 사용자 제보입니다. 공장 폐수 유입 의혹과 함께 어류 폐사 현상이 관찰되고 있어 정밀 조사가 필요한 상황입니다.",
    eventDate: "2025-06-30",
    region: {
      name: "춘천시",
      parentName: "강원도",
    },
    purchasedAt: "2025-07-01T10:20:00Z",
  },
  {
    title: "강원도 산불 발생 현황",
    summary:
      "최근 강원도 일대에서 산불 발생이 보고되었다. 건조한 날씨와 강풍으로 인해 확산 우려가 높아지고 있으며, 소방당국이 진화 작업을 진행 중이다.",
    eventDate: "2025-07-05",
    region: {
      name: "원주시",
      parentName: "강원도",
    },
    purchasedAt: "2025-07-06T15:00:00Z",
  },
];

export function ReporterMypage() {
  const [journalist, setJournalist] =
    useState<JournalistProfile>(mockJournalist);
  const [availableReports, setAvailableReports] =
    useState<AvailableReport[]>(mockAvailableReports);
  const [purchasedReports, setPurchasedReports] =
    useState<PurchasedReport[]>(mockPurchasedReports);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: journalist.username,
    bio: journalist.bio || "",
    region: journalist.region.name,
    company: journalist.company,
  });
  const marketplaceRef = useRef<HTMLButtonElement | null>(null);
  const logoutMutation = useLogoutMutation();
  const router = useRouter();

  const handleSaveProfile = () => {
    setJournalist((prev) => ({
      ...prev,
      username: editForm.username,
      bio: editForm.bio,
      company: editForm.company,
      region: { name: editForm.region },
    }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm({
      username: journalist.username,
      bio: journalist.bio || "",
      region: journalist.region.name,
      company: journalist.company,
    });
    setIsEditing(false);
  };

  const handlePurchaseReport = (reportTitle: string) => {
    const report = availableReports.find((r) => r.title === reportTitle);
    if (report && journalist.availableCredits >= report.price) {
      // 구매 처리
      const purchasedReport: PurchasedReport = {
        title: report.title,
        summary: report.summary,
        eventDate: report.eventDate,
        region: report.region,
        purchasedAt: new Date().toISOString(),
      };

      setPurchasedReports((prev) => [purchasedReport, ...prev]);
      setAvailableReports((prev) =>
        prev.filter((r) => r.title !== reportTitle)
      );
      setJournalist((prev) => ({
        ...prev,
        availableCredits: prev.availableCredits - report.price,
        totalPurchases: prev.totalPurchases + 1,
      }));

      alert(`"${report.title}" 제보를 구매했습니다!`);
    } else {
      alert("크레딧이 부족합니다.");
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            긴급
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            보통
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            낮음
          </Badge>
        );
      default:
        return <Badge variant="secondary">알 수 없음</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success("로그아웃 되었습니다.");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "로그아웃 실패");
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
                마이페이지 (기자)
              </h2>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                로그아웃{" "}
              </Button>
              <Link href="/main">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  홈으로
                </Button>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <MobileNav currentPath="/mypage" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage
                    src={journalist.profileImage || "/placeholder.svg"}
                    alt={journalist.username}
                  />
                  <AvatarFallback className="text-2xl bg-[#0047AB] text-white">
                    {journalist.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{journalist.username}</CardTitle>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  {journalist.email}
                </div>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 mt-2">
                  기자
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{journalist.region.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>가입일: {formatDate(journalist.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span>{journalist.company}</span>
                </div>

                {/* Credits Section */}
                <div className="pt-4 border-t space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0047AB] mb-1">
                      {journalist.availableCredits.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">보유 크레딧</div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold">{journalist.rating}</span>
                    <span className="text-sm text-gray-600">/5.0</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t text-center">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      {journalist.totalPurchases}
                    </div>
                    <div className="text-xs text-gray-600">구매한 제보</div>
                  </div>
                  <div>
                    {/* <div className="text-lg font-semibold text-gray-900">{journalist.totalArticles}</div>
                    <div className="text-xs text-gray-600">발행한 기사</div> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  프로필
                </TabsTrigger>
                <TabsTrigger
                  value="marketplace"
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  제보 마켓
                </TabsTrigger>
                <TabsTrigger
                  value="purchased"
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  구매 내역
                </TabsTrigger>
                {/* <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  통계
                </TabsTrigger> */}
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5 text-[#0047AB]" />
                        프로필 설정
                      </CardTitle>
                      {!isEditing ? (
                        <Button
                          onClick={() => setIsEditing(true)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          편집
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveProfile}
                            size="sm"
                            className="bg-[#0047AB] hover:bg-[#002B64]"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            저장
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            variant="outline"
                            size="sm"
                          >
                            <X className="w-4 h-4 mr-2" />
                            취소
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email">이메일</Label>
                        <Input
                          id="email"
                          value={journalist.email}
                          disabled
                          className="bg-gray-50"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          이메일은 변경할 수 없습니다.
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="username">사용자명</Label>
                        <Input
                          id="username"
                          value={
                            isEditing ? editForm.username : journalist.username
                          }
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              username: e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="region">지역</Label>
                        <Input
                          id="region"
                          value={
                            isEditing ? editForm.region : journalist.region.name
                          }
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              region: e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">소속</Label>
                        <Input
                          id="company"
                          value={
                            isEditing ? editForm.company : journalist.company
                          }
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              company: e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bio">자기소개</Label>
                      <textarea
                        id="bio"
                        value={isEditing ? editForm.bio : journalist.bio}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            bio: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md resize-none h-24 ${
                          !isEditing ? "bg-gray-50" : ""
                        }`}
                        placeholder="자신을 소개해주세요..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Marketplace Tab */}
              <TabsContent value="marketplace">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-900">
                      제보 마켓플레이스 ({availableReports.length}건)
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Coins className="w-4 h-4" />
                      보유 크레딧:{" "}
                      <span className="font-semibold text-[#0047AB]">
                        {journalist.availableCredits.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {availableReports.map((report) => (
                      <Card
                        key={report.title}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <CardTitle className="text-xl text-gray-900">
                                  {report.title}
                                </CardTitle>
                                {/* {report.isVerified && (
                                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">검증됨</Badge>
                                )} */}
                                {getUrgencyBadge(report.urgency)}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {report.region.name} (
                                  {report.region.parentName})
                                </div>
                                {/* <Badge variant="outline">{report.category}</Badge> */}
                                {/* {getStatusBadge(report.status)} */}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <span>제보자: {report.reporterName}</span>
                                {/* <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500" />
                                  <span>{report.reporterRating}</span>
                                </div> */}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-[#0047AB] mb-2">
                                {report.price.toLocaleString()}P
                              </div>
                              <Button
                                onClick={() =>
                                  handlePurchaseReport(report.title)
                                }
                                className="bg-[#0047AB] hover:bg-[#002B64] text-white"
                                disabled={
                                  journalist.availableCredits < report.price
                                }
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                구매하기
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 mb-4 line-clamp-2">
                            {report.summary}
                          </p>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <span>
                                등록일: {formatDate(report.eventDate)}
                              </span>
                              {/* <span>최근 업데이트: {report.lastUpdate}</span> */}
                            </div>
                            {/* <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {report.viewCount.toLocaleString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {report.timelineCount}
                              </div>
                            </div> */}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {availableReports.length === 0 && (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">
                        현재 구매 가능한 제보가 없습니다.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Purchased Reports Tab */}
              <TabsContent value="purchased">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-900">
                      구매한 제보 ({purchasedReports.length}건)
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {purchasedReports.map((report) => (
                      <Card
                        key={report.title}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-xl text-gray-900 mb-2">
                                {report.title}
                              </CardTitle>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {report.region.name} (
                                  {report.region.parentName})
                                </div>
                                {/* <Badge variant="outline">{report.category}</Badge> */}
                                {/* {getArticleStatusBadge(report.articleStatus)} */}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                {/* <span>제보자: {report.reporterName}</span> */}
                                <span>
                                  구매일: {formatDateTime(report.purchasedAt)}
                                </span>
                                {/* <span className="font-semibold text-[#0047AB]">{report.price.toLocaleString()}P</span> */}
                              </div>
                            </div>
                            <div className="text-right">
                              {/* {report.articleViews && (
                                <div className="text-sm text-gray-600 mb-2">
                                  조회수: {report.articleViews.toLocaleString()}
                                </div>
                              )}
                              <Button variant="outline" size="sm">
                                기사 작성
                              </Button> */}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 line-clamp-2">
                            {report.summary}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {purchasedReports.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg mb-4">
                        아직 구매한 제보가 없습니다.
                      </p>
                      <Button
                        onClick={() => () => marketplaceRef.current?.click()}
                        ref={marketplaceRef}
                        className="bg-[#0047AB] hover:bg-[#002B64] text-white"
                      >
                        제보 마켓 둘러보기
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              {/* <TabsContent value="analytics">
                <div className="space-y-6">
                  {/* Stats Cards */}
              {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <ShoppingCart className="w-12 h-12 text-[#0047AB] mx-auto mb-4" />
                        <div className="text-3xl font-bold text-[#0047AB] mb-2">{journalist.totalPurchases}</div>
                        <div className="text-sm text-gray-600">총 구매 제보</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <FileText className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <div className="text-3xl font-bold text-green-500 mb-2">{journalist.totalArticles}</div>
                        <div className="text-sm text-gray-600">발행한 기사</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Eye className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <div className="text-3xl font-bold text-blue-500 mb-2">
                          {journalist.totalViews.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">총 조회수</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                        <div className="text-3xl font-bold text-yellow-500 mb-2">{journalist.rating}</div>
                        <div className="text-sm text-gray-600">평점</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Performance Chart Placeholder */}
              {/* <Card>
                    <CardHeader>
                      <CardTitle>월별 활동 현황</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">차트 영역 (추후 구현 예정)</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent> */}
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
