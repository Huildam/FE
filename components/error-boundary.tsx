"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <Card className="w-full max-w-2xl">
            <CardContent className="p-12 text-center">
              <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                문제가 발생했습니다
              </h2>

              <p className="text-gray-600 mb-8">
                페이지를 표시하는 중에 오류가 발생했습니다.
                <br />
                페이지를 새로고침하거나 홈으로 돌아가세요.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-[#0047AB] hover:bg-[#002B64] text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  새로고침
                </Button>

                <Link href="/">
                  <Button variant="outline">
                    <Home className="w-4 h-4 mr-2" />
                    홈으로 돌아가기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
