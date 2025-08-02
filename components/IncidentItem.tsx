import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { IncidentProps } from "@/types/Event";

export default function IncidentItem({
  incident,
}: {
  incident: IncidentProps;
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            해결완료
          </Badge>
        );
      case "new":
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
  return (
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
                  {incident.region.id}
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
              <span>시작일: {incident.eventDate}</span>
              <span>최근 업데이트: {incident.updatedAt}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>조회 {incident.viewCount.toLocaleString()}</span>
              <span>타임라인 {incident.timelines.length}개</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
