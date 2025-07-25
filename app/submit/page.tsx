"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

const regions = [
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
const categories = ["식품안전", "환경안전", "산업안전", "교통안전", "건설안전", "기타"]

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    title: "",
    region: "",
    category: "",
    summary: "",
    description: "",
    startDate: "",
    tags: [] as string[],
    sources: [] as { title: string; url: string }[],
  })
  const [newTag, setNewTag] = useState("")
  const [newSource, setNewSource] = useState({ title: "", url: "" })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addSource = () => {
    if (newSource.title.trim() && newSource.url.trim()) {
      setFormData((prev) => ({
        ...prev,
        sources: [...prev.sources, { ...newSource }],
      }))
      setNewSource({ title: "", url: "" })
    }
  }

  const removeSource = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sources: prev.sources.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Submitting:", formData)
    alert("사건이 성공적으로 등록되었습니다!")
  }

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
              <span className="text-gray-400">|</span>
              <h2 className="text-lg font-medium text-gray-700">사건 등록</h2>
            </div>
            <Link href="/main">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                취소
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">새 사건 등록</h1>
          <p className="text-gray-600">
            지역에서 발생한 사건의 정보를 등록해주세요. 정확하고 객관적인 정보 제공을 부탁드립니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">사건 제목 *</Label>
                <Input
                  id="title"
                  placeholder="예: 부천시 샤브샤브 식당 집단 구토 사건"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="region">지역 *</Label>
                  <Select value={formData.region} onValueChange={(value) => handleInputChange("region", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="지역을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">카테고리 *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리를 선택하세요" />
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

              <div>
                <Label htmlFor="startDate">사건 발생일 *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>사건 내용</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="summary">요약 *</Label>
                <Textarea
                  id="summary"
                  placeholder="사건의 핵심 내용을 2-3줄로 요약해주세요"
                  value={formData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">상세 내용 *</Label>
                <Textarea
                  id="description"
                  placeholder="사건의 상세한 내용을 작성해주세요. 객관적인 사실 위주로 작성해주시기 바랍니다."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={8}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>태그</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="태그를 입력하세요"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <span>#{tag}</span>
                      <button type="button" onClick={() => removeTag(tag)} className="text-gray-500 hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sources */}
          <Card>
            <CardHeader>
              <CardTitle>참고 자료</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="자료 제목"
                  value={newSource.title}
                  onChange={(e) => setNewSource((prev) => ({ ...prev, title: e.target.value }))}
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="URL"
                    value={newSource.url}
                    onChange={(e) => setNewSource((prev) => ({ ...prev, url: e.target.value }))}
                  />
                  <Button type="button" onClick={addSource} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {formData.sources.length > 0 && (
                <div className="space-y-2">
                  {formData.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{source.title}</p>
                        <p className="text-xs text-gray-600">{source.url}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSource(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Link href="/main">
              <Button type="button" variant="outline">
                취소
              </Button>
            </Link>
            <Button type="submit" className="bg-[#0047AB] hover:bg-[#002B64] text-white">
              사건 등록하기
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
