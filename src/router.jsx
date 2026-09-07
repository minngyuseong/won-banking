import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import AllPage from './pages/AllPage'
import HistoryPage from './pages/HistoryPage'
import HomePage from './pages/HomePage'
import TransferPage from './pages/TransferPage'

/**
 * 앱 라우트 트리.
 *
 * 부모 라우트는 AppLayout이고, 자식은 4개 도메인 페이지다.
 * 이렇게 중첩하면 탭을 눌러도 헤더/하단바가 다시 마운트되지 않고
 * <Outlet /> 자리만 교체된다.
 *
 * 경로 규칙:
 * - 홈       → `/`          (index 라우트)
 * - 이체     → `/transfer`
 * - 거래내역 → `/history`
 * - 전체     → `/all`
 *
 * 자식 path에는 슬래시를 붙이지 않는다.
 * 부모(`/`) 아래에 붙어서 최종 URL이 완성된다.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'transfer', element: <TransferPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'all', element: <AllPage /> },
    ],
  },
])
