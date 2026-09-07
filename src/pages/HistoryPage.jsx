import { DomainPlaceholder } from '../components/common/DomainPlaceholder'

/**
 * 거래내역 도메인 페이지. 라우트: `/history`
 *
 * 입출금 목록을 보여줄 빈 화면이다.
 * 지금은 탭 이동 확인용이며, 목록/필터는 이후 이슈에서 구현한다.
 */
export default function HistoryPage() {
  return (
    <DomainPlaceholder
      title="거래내역"
      description="거래내역 화면입니다. 거래 목록과 상세 조회는 이후 이슈에서 구현합니다."
    />
  )
}
