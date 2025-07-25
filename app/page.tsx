"use client"

import Image from "next/image"
import React, { useState } from "react"
import ParallaxText from "@/components/parallax/ParallaxText"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"
import "@kfonts/hakgyoansim-mabeopsa";
import { AnimatePresence, motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const regions: { [key: string]: string[] } = {
  "강원특별자치도": ["고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", "영월군", "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군", "화천군", "횡성군"],
  "경기도": ["가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"],
  "경상남도": ["거제시", "거창군", "고성군", "김해시", "남해군", "밀양시", "사천시", "산청군", "양산시", "의령군", "진주시", "창녕군", "창원시", "통영시", "하동군", "함안군", "함양군", "합천군"],
  "경상북도": ["경산시", "경주시", "고령군", "구미시", "군위군", "김천시", "문경시", "봉화군", "상주시", "성주군", "안동시", "영덕군", "영양군", "영주시", "영천시", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군", "포항시"],
  "광주광역시": ["광산구", "남구", "동구", "북구", "서구"],
  "대구광역시": ["군위군", "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"],
  "대전광역시": ["대덕구", "동구", "서구", "유성구", "중구"],
  "부산광역시": ["강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"],
  "서울특별시": ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
  "세종특별자치시": ["세종시"],
  "울산광역시": ["남구", "동구", "북구", "중구", "울주군"],
  "인천광역시": ["강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"],
  "전라남도": ["강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군", "목포시", "무안군", "보성군", "순천시", "신안군", "여수시", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"],
  "전라북도": ["고창군", "군산시", "김제시", "남원시", "무주군", "부안군", "순창군", "완주군", "익산시", "임실군", "장수군", "전주시", "정읍시", "진안군"],
  "제주특별자치도": ["서귀포시", "제주시"],
  "충청남도": ["계룡시", "공주시", "금산군", "논산시", "당진시", "보령시", "부여군", "서산시", "서천군", "아산시", "예산군", "천안시", "청양군", "태안군", "홍성군"],
  "충청북도": ["괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "제천시", "증평군", "진천군", "청주시", "충주시"]
};



export default function IntroPage() {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState("")
  const [selectedDo, setSelectedDo] = useState("")
  const [selectedSi, setSelectedSi] = useState("")
  const router = useRouter()

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y > 100 && step < 1) setStep(1)
      if (y > 300 && step < 2) setStep(2)
      if (y > 500 && step < 3 && selectedDo) setStep(3)
      if (y > 700 && step < 4 && selectedSi) setStep(4)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [step, selectedDo, selectedSi])

  const handleStart = () => {
    router.push("/main")
  }

  return (
    <div style={{
      minHeight: "300vh",
      background: "linear-gradient(to bottom, #0047AB 15%, #4fa3ff 50%, #ffffff 100%)"
    }}>
            <ParallaxText baseVelocity={-2} repeat={200}>
        <span style={{ textShadow: "2px 4px 12px rgba(0,0,0,0.35), 0 1px 0 #fff" }}>
          지역 사건의 시작부터 끝까지 지역 사건의 시작부터 끝까지 지역 사건의 시작부터 끝까지 지역 사건의 시작부터 끝까지 지역 사건의 시작부터 끝까지
        </span>
      </ParallaxText>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "2rem 0" }}>
        <Image src="/후일담logo.svg" alt="후일담 로고" width={250} height={250} />
      </div>

      <ParallaxText baseVelocity={5} repeat={200}>
        <span style={{ textShadow: "2px 4px 12px rgba(0,0,0,0.35), 0 1px 0 #fff" }}>
        그곳에 사는 누군가를 위해 흐름과 결과까지 정리해드립니다
        </span>
      </ParallaxText>
      {/* 아래 화살표 */}
      <div className="flex justify-center mt-8">
        <ChevronDown className="w-12 h-12 text-[#ffffff] animate-bounce" />
      </div>
      <div style={{ height: "30vh" }} />
      <div style={{ textAlign: "center", color: "#fff", fontSize: 20, fontWeight: 600, marginBottom: 24 }}>
            맞춤형 기사를 위해 정보를 입력해주세요
          </div>
      <div style={{ height: "5vh" }} />
      {/* 이메일 입력 */}
      {step >= 1 && (
        <div style={{ padding: '0 12px' }}>
          <div style={{ maxWidth: 400, width: '100%', margin: "0 auto", padding: 24, paddingLeft: 16, paddingRight: 16, background: "white", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: 32 }}>
            <label htmlFor="email" style={{ fontWeight: 600, fontSize: 18 }}>이메일을 입력하세요</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="example@email.com"
              style={{ width: "100%", marginTop: 12, padding: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 16 }}
            />
          </div>
        </div>
      )}
      {/* 도 선택 */}
      {step >= 2 && email.trim() !== "" && (
        <div style={{ padding: '0 12px' }}>
          <div style={{ maxWidth: 400, width: '100%', margin: "10px auto 0 auto", padding: 24, paddingLeft: 16, paddingRight: 16, background: "white", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: 32 }}>
          <label htmlFor="do" style={{ fontWeight: 600, fontSize: 18 }}>지역(도/특별시)을 선택하세요</label>
          <Select value={selectedDo} onValueChange={value => { setSelectedDo(value); setSelectedSi(""); }}>
            <SelectTrigger className="w-full mt-3">
              <SelectValue placeholder="선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(regions).map((doName: string) => (
                <SelectItem key={doName} value={doName}>{doName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        </div>
      )}
      {/* 시/구 선택 */}
      {step >= 3 && selectedDo && (
        <div style={{ padding: '0 12px' }}>
          <div style={{ maxWidth: 400, width: '100%', margin: "10px auto 0 auto", padding: 24, paddingLeft: 16, paddingRight: 16, background: "white", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: 32 }}>
          <label htmlFor="si" style={{ fontWeight: 600, fontSize: 18 }}>{selectedDo}의 시/구를 선택하세요</label>
          <Select value={selectedSi} onValueChange={value => setSelectedSi(value)}>
            <SelectTrigger className="w-full mt-3">
              <SelectValue placeholder="선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {(regions[selectedDo as keyof typeof regions] || []).map((siName: string) => (
                <SelectItem key={siName} value={siName}>{siName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        </div>
      )}
      {/* 시작하기 버튼 */}
      <AnimatePresence>
        {step >= 4 && selectedSi && (
          <motion.div
            key="start-btn"
            initial={{ opacity: 0, y: -32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -32 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ textAlign: "center", marginTop: 32 }}
          >
            <button
              onClick={handleStart}
              style={{ background: "#ffffff", color: "#0047AB", fontWeight: 700, fontSize: 20, padding: "16px 48px", borderRadius: 12, border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
            >
              시작하기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
  )
}
