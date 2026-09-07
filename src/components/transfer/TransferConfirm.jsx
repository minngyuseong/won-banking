import { useState } from 'react'
import { transferMoney } from '../../api/transferApi'

/**
 * 이체 3단계.
 *
 * 이전 단계에서 입력한 이체 정보를 최종 확인하고
 * 실제 이체 API를 호출한다.
 */
export default function TransferConfirm({ transfer, onNext, onPrev }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleTransfer = async () => {
    if (isSubmitting) return

    setIsSubmitting(true)
    setError('')

    try {
      await transferMoney({
        fromAccountId: transfer.fromAccountId,
        toBank: transfer.toBank,
        toAccountNo: transfer.toAccountNo,
        toOwnerName: transfer.ownerName,
        amount: transfer.amount,
      })

      onNext()
    } catch (error) {
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white px-5 py-2">
      <h2 className="mt-[6px] text-[18px] font-extrabold tracking-[-0.02em] text-[#1a1d21]">
        이체 내용을 확인해주세요
      </h2>

      <div className="mb-5 mt-5 rounded-[16px] bg-[#f3f8fc] p-5">
        <div className="flex justify-between py-[9px] text-[13.5px]">
          <span className="text-[#6b7280]">받는 분</span>
          <span className="font-bold">{transfer.toBank}</span>
        </div>

        <div className="flex justify-between py-[9px] text-[13.5px]">
          <span className="text-[#6b7280]">계좌번호</span>
          <span className="font-bold">{transfer.toAccountNo}</span>
        </div>

        <div className="flex justify-between py-[9px] text-[13.5px]">
          <span className="text-[#6b7280]">예금주</span>
          <span className="font-bold">{transfer.ownerName}</span>
        </div>

        <div className="flex justify-between py-[9px] text-[13.5px]">
          <span className="text-[#6b7280]">출금 계좌</span>
          <span className="font-bold">
            {transfer.fromAccount
              ? `${transfer.fromAccount.nickname} (${transfer.fromAccount.accountNo})`
              : '-'}
          </span>
        </div>

        <div className="mt-[6px] flex justify-between border-t border-dashed border-[#c4cad1] pt-[14px] text-[13.5px]">
          <span className="text-[#6b7280]">이체 금액</span>
          <span className="text-[18px] font-extrabold text-[#004b80]">
            {transfer.amount.toLocaleString()}원
          </span>
        </div>
      </div>

      {error && (
        <p className="mb-3 text-[11.5px] text-[#e8483a]">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleTransfer}
        disabled={isSubmitting}
        className="mt-[6px] w-full rounded-[14px] bg-[#0067ac] p-[15px] text-[15px] font-extrabold text-white transition hover:bg-[#004b80] disabled:cursor-not-allowed disabled:bg-[#c4cad1]"
      >
        {isSubmitting ? '이체 처리 중...' : '이체하기'}
      </button>

      <button
        type="button"
        onClick={onPrev}
        disabled={isSubmitting}
        className="mt-[10px] w-full rounded-[14px] border-[1.5px] border-[#e6e9ed] bg-white p-[13px] text-[14px] font-bold text-[#40464d]"
      >
        이전으로
      </button>
    </div>
  )
}