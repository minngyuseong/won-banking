import { Outlet } from 'react-router-dom'
import { BottomNav } from '../components/common/BottomNav'
import { Header } from '../components/common/Header'

/**
 * 앱 전역 레이아웃.
 *
 * 구조는 Header / 메인 컨텐츠 / BottomNav 3단이다.
 * 라우트가 바뀌어도 헤더와 탭은 유지되고, 가운데 <Outlet />에만
 * Home / Transfer / History / All 페이지가 렌더된다.
 *
 * 하단 바를 본문 위에 겹치면 마지막 카드가 가려지므로,
 * 화면 높이(h-svh)를 flex로 나누고 본문만 overflow-y-auto 로 스크롤한다.
 */
export function AppLayout() {
  return (
    <div className="min-h-svh bg-slate-200">
      {/* 데스크톱에서도 모바일 폭을 유지해 뱅킹 앱 레이아웃을 맞춘다. */}
      <div className="mx-auto flex h-svh w-full max-w-[430px] flex-col bg-white shadow-sm">
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto bg-surface">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
