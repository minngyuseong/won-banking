import { DomainPlaceholder } from '../components/DomainPlaceholder'

/**
 * 전체 도메인 페이지. 라우트: `/all`
 *
 * 설정, 상품, 고객센터 같은 나머지 메뉴를 모을 빈 화면이다.
 * 지금은 탭 이동 확인용이며, 메뉴 목록은 이후 이슈에서 구현한다.
 */
export default function AllPage() {
  return (
    <DomainPlaceholder
      title="전체"
      description="전체 메뉴 화면입니다. 상품, 자산관리, 설정 항목은 이후 이슈에서 구현합니다."
    />
  )
}
