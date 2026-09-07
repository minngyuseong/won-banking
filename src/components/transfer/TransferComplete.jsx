import { useNavigate } from 'react-router-dom'

/**
 * 이체 4단계.
 *
 * 이체 완료 결과를 표시하고
 * 출금 계좌, 받는 분, 이체 금액을 안내한다.
 * 홈으로 버튼을 누르면 홈 화면으로 이동한다.
 */
export default function TransferComplete({ transfer }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white px-5 py-2">
      <div className="px-5 pb-[10px] pt-10 text-center">
        <div className="mx-auto mb-[18px] flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f6f0] text-[30px] text-[#14875a]">
          ✓
        </div>

        <h2 className="mb-2 text-[19px] font-extrabold">
          이체가 완료되었습니다
        </h2>

        <p className="mb-6 text-[13px] text-[#6b7280]">
          {transfer.fromAccount.nickname}에서 {transfer.ownerName}님께{' '}
          {transfer.amount.toLocaleString()}원을 보냈습니다
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-[6px] w-full rounded-[14px] bg-[#0067ac] p-[15px] text-[15px] font-extrabold text-white transition hover:bg-[#004b80]"
      >
        홈으로
      </button>
    </div>
  )
}