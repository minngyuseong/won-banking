import { DomainPlaceholder } from '../components/common/DomainPlaceholder'

/**
 * 메인(홈) 페이지. 라우트: `/`
 *
 * 하단 탭의 기본 화면이다.
 * 총 자산/계좌/최근 거래 대시보드는 홈 도메인 이슈에서 이 컴포넌트를 채운다.
 */
export default function HomePage() {
  return (
    <DomainPlaceholder
      title="홈"
      description="메인 화면입니다. 총 자산, 바로가기, 내 계좌, 최근 거래 영역은 이후 이슈에서 구현합니다."
    />
  )
}
