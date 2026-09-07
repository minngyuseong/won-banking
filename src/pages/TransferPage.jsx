import { DomainPlaceholder } from '../components/DomainPlaceholder'

/**
 * 이체 도메인 페이지. 라우트: `/transfer`
 *
 * 계좌 이체 흐름을 담당할 빈 화면이다.
 * 지금은 탭 이동 확인용이며, 이체 폼은 이후 이슈에서 구현한다.
 */
export default function TransferPage() {
  return (
    <DomainPlaceholder
      title="이체"
      description="이체 화면입니다. 보내는 계좌, 받는 계좌, 금액 입력은 이후 이슈에서 구현합니다."
    />
  )
}
