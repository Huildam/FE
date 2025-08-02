"use client";

import { useState } from "react";
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
  Eye,
  Clock,
  Edit3,
  Save,
  X,
  ArrowLeft,
  Settings,
  MessageSquare,
  Coins,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";

interface UserProfile {
  id: string;
  email: string;
  username: string;
  profileImage?: string;
  bio?: string;
  region: string;
  joinDate: string;
  reputationScore: number;
  totalIncidents: number;
  totalViews: number;
  totalBookmarks: number;
  totalPoints: number;
  pendingPoints: number;
}

interface MyIncident {
  id: string;
  title: string;
  region: string;
  category: string;
  status: "ongoing" | "resolved" | "investigating";
  registrationStatus: "registered" | "not_registered" | "pending";
  summary: string;
  startDate: string;
  lastUpdate: string;
  viewCount: number;
  timelineCount: number;
  commentCount: number;
  isVerified: boolean;
  pointsEarned: number;
  isPurchased: boolean;
}

const mockUser: UserProfile = {
  id: "user_123",
  email: "user@example.com",
  username: "시민기자김철수",
  profileImage: "/placeholder.svg?height=100&width=100",
  bio: "지역 사회 문제에 관심이 많은 시민입니다. 정확한 정보 전달을 위해 노력하고 있습니다.",
  region: "서울특별시",
  joinDate: "2024-01-15",
  reputationScore: 150,
  totalIncidents: 5,
  totalViews: 3240,
  totalBookmarks: 12,
  totalPoints: 2500,
  pendingPoints: 800,
};

const mockMyIncidents: MyIncident[] = [
  {
    id: "1",
    title: "부천시 샤브샤브 식당 집단 구토 사건",
    region: "부천시",
    category: "식품안전",
    status: "resolved",
    registrationStatus: "registered",
    summary:
      "부천시 소재 샤브샤브 식당에서 집단 식중독 발생. 보건소 조사 결과 노로바이러스 검출.",
    startDate: "2024-01-15",
    lastUpdate: "2024-02-10",
    viewCount: 1250,
    timelineCount: 8,
    commentCount: 15,
    isVerified: true,
    pointsEarned: 1000,
    isPurchased: true,
  },
  {
    id: "2",
    title: "서울 강남구 지하철 화재 사건",
    region: "서울시",
    category: "교통안전",
    status: "investigating",
    registrationStatus: "registered",
    summary: "강남구 지하철 2호선에서 발생한 화재로 인한 운행 중단 사건.",
    startDate: "2024-03-05",
    lastUpdate: "2024-03-12",
    viewCount: 890,
    timelineCount: 4,
    commentCount: 8,
    isVerified: false,
    pointsEarned: 0,
    isPurchased: false,
  },
  {
    id: "3",
    title: "경기도 수원시 아파트 엘리베이터 고장",
    region: "수원시",
    category: "건설안전",
    status: "resolved",
    registrationStatus: "pending",
    summary: "수원시 영통구 아파트 엘리베이터 추락 사고로 인한 부상자 발생.",
    startDate: "2024-02-20",
    lastUpdate: "2024-03-01",
    viewCount: 567,
    timelineCount: 6,
    commentCount: 5,
    isVerified: false,
    pointsEarned: 0,
    isPurchased: false,
  },
  {
    id: "4",
    title: "인천시 공장 화재 사건",
    region: "인천시",
    category: "산업안전",
    status: "ongoing",
    registrationStatus: "not_registered",
    summary: "인천시 남동구 공장에서 발생한 화재 사건.",
    startDate: "2024-03-10",
    lastUpdate: "2024-03-15",
    viewCount: 234,
    timelineCount: 2,
    commentCount: 1,
    isVerified: false,
    pointsEarned: 0,
    isPurchased: false,
  },
];

export function UserMyPage() {
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [myIncidents, setMyIncidents] = useState<MyIncident[]>(mockMyIncidents);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio || "",
    region: user.region,
  });

  const handleSaveProfile = () => {
    setUser((prev) => ({
      ...prev,
      username: editForm.username,
      bio: editForm.bio,
      region: editForm.region,
    }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm({
      username: user.username,
      bio: user.bio || "",
      region: user.region,
    });
    setIsEditing(false);
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

  const getRegistrationStatusBadge = (
    status: string,
    isPurchased: boolean,
    pointsEarned: number
  ) => {
    switch (status) {
      case "registered":
        if (isPurchased) {
          return (
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 mr-1" />
                등록됨
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                <Coins className="w-3 h-3 mr-1" />
                {pointsEarned}P 획득
              </Badge>
            </div>
          );
        } else {
          return (
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 mr-1" />
                등록됨
              </Badge>
              <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">
                미구매
              </Badge>
            </div>
          );
        }
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            검토중
          </Badge>
        );
      case "not_registered":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            등록되지않음
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
                마이페이지 (사용자)
              </h2>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/mypage?type=journalist">
                <Button variant="outline" size="sm">
                  기자 페이지로
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
                    src={user.profileImage || "/placeholder.svg"}
                    alt={user.username}
                  />
                  <AvatarFallback className="text-2xl bg-[#0047AB] text-white">
                    {user.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user.username}</CardTitle>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-2">
                  일반 사용자
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{user.region}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>가입일: {formatDate(user.joinDate)}</span>
                </div>

                {/* Points Section */}
                <div className="pt-4 border-t space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0047AB] mb-1">
                      {user.totalPoints.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">보유 포인트</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-orange-600">
                      {user.pendingPoints.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">대기중 포인트</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t text-center">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      {user.totalIncidents}
                    </div>
                    <div className="text-xs text-gray-600">등록한 사건</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      {user.totalViews.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">총 조회수</div>
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
                  value="incidents"
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />내 제보
                </TabsTrigger>
                <TabsTrigger value="points" className="flex items-center gap-2">
                  <Coins className="w-4 h-4" />
                  포인트
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  활동
                </TabsTrigger>
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
                          value={user.email}
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
                          value={isEditing ? editForm.username : user.username}
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
                    <div>
                      <Label htmlFor="region">지역</Label>
                      <Input
                        id="region"
                        value={isEditing ? editForm.region : user.region}
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
                      <Label htmlFor="bio">자기소개</Label>
                      <textarea
                        id="bio"
                        value={isEditing ? editForm.bio : user.bio}
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

              {/* My Incidents Tab */}
              <TabsContent value="incidents">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-900">
                      내 제보 현황 ({myIncidents.length}건)
                    </h3>
                    <Link href="/submit">
                      <Button className="bg-[#0047AB] hover:bg-[#002B64] text-white">
                        새 제보 등록
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {myIncidents.map((incident) => (
                      <Card
                        key={incident.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <CardTitle className="text-xl text-gray-900">
                                  {incident.title}
                                </CardTitle>
                                {incident.isVerified && (
                                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                                    검증됨
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {incident.region}
                                </div>
                                <Badge variant="outline">
                                  {incident.category}
                                </Badge>
                                {getStatusBadge(incident.status)}
                              </div>
                              <div className="mb-3">
                                {getRegistrationStatusBadge(
                                  incident.registrationStatus,
                                  incident.isPurchased,
                                  incident.pointsEarned
                                )}
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
                              <span>등록일: {incident.startDate}</span>
                              <span>최근 업데이트: {incident.lastUpdate}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {incident.viewCount.toLocaleString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {incident.timelineCount}
                              </div>
                              <Link href={`/incident/${incident.id}`}>
                                <Button variant="outline" size="sm">
                                  상세보기
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {myIncidents.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg mb-4">
                        아직 등록한 제보가 없습니다.
                      </p>
                      <Link href="/submit">
                        <Button className="bg-[#0047AB] hover:bg-[#002B64] text-white">
                          첫 번째 제보 등록하기
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Points Tab */}
              <TabsContent value="points">
                <div className="space-y-6">
                  {/* Points Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Coins className="w-12 h-12 text-[#0047AB] mx-auto mb-4" />
                        <div className="text-3xl font-bold text-[#0047AB] mb-2">
                          {user.totalPoints.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">보유 포인트</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                        <div className="text-3xl font-bold text-orange-500 mb-2">
                          {user.pendingPoints.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          대기중 포인트
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <div className="text-3xl font-bold text-green-500 mb-2">
                          {myIncidents.filter((i) => i.isPurchased).length}
                        </div>
                        <div className="text-sm text-gray-600">구매된 제보</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Points History */}
                  <Card>
                    <CardHeader>
                      <CardTitle>포인트 내역</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <div>
                              <p className="font-medium text-gray-900">
                                부천시 샤브샤브 식당 집단 구토 사건
                              </p>
                              <p className="text-sm text-gray-600">
                                기자 구매 완료
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">+1,000P</p>
                            <p className="text-xs text-gray-500">2024-02-15</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                            <div>
                              <p className="font-medium text-gray-900">
                                서울 강남구 지하철 화재 사건
                              </p>
                              <p className="text-sm text-gray-600">
                                기자 검토 대기중
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-yellow-600">+800P</p>
                            <p className="text-xs text-gray-500">예상</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-[#0047AB]" />
                      최근 활동
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-[#0047AB] rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            <strong>부천시 샤브샤브 식당 집단 구토 사건</strong>{" "}
                            제보가 기자에게 구매되어 1,000포인트를 획득했습니다.
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            2024년 2월 15일
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            <strong>서울 강남구 지하철 화재 사건</strong> 제보를
                            등록했습니다.
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            2024년 3월 5일
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            <strong>
                              경기도 수원시 아파트 엘리베이터 고장
                            </strong>{" "}
                            제보가 검토 중입니다.
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            2024년 2월 28일
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
