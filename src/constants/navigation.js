/**
 * WON 실습뱅킹의 4개 핵심 도메인 경로.
 *
 * 하단 탭과 페이지 라우팅이 같은 값을 쓰도록 한곳에서만 관리한다.
 * 경로를 바꾸면 이 파일만 수정하면 된다.
 */
export const APP_ROUTES = {
  /** 메인(홈). 앱에 들어왔을 때 기본 화면 */
  home: '/',
  /** 이체 */
  transfer: '/transfer',
  /** 거래내역 */
  history: '/history',
  /** 전체 메뉴 */
  all: '/all',
}

/**
 * 하단 네비게이션에 그릴 탭 목록.
 * `end: true`는 홈(/) 전용이다.
 * 이 값이 없으면 `/transfer`처럼 하위 경로에서도 홈 탭이 켜질 수 있다.
 */
export const BOTTOM_TABS = [
  { to: APP_ROUTES.home, label: '홈', end: true },
  { to: APP_ROUTES.transfer, label: '이체', end: false },
  { to: APP_ROUTES.history, label: '거래내역', end: false },
  { to: APP_ROUTES.all, label: '전체', end: false },
]
