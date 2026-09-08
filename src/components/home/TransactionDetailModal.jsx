import { useEffect, useRef } from 'react'
import { formatWon } from './formatWon'

export function TransactionDetailModal({
  transaction,
  accountName,
  onClose,
}) {
  const sign = transaction.type === 'out' ? '-' : '+'
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [transaction, onClose])

  function handleDialogKeyDown(event) {
    if (event.key !== 'Tab') return

    const focusableElements = dialogRef.current?.querySelectorAll(
      'button:not([disabled])',
    )

    if (!focusableElements?.length) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-end bg-black/45"
      onClick={onClose}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-title"
        tabIndex="-1"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
        className="w-full rounded-t-[22px] bg-white px-[22px] pb-[26px] pt-[10px]"
      >
        <div className="mx-auto mb-[18px] mt-[6px] h-1 w-9 rounded-full bg-slate-300" />

        <h2
          id="transaction-title"
          className="mb-1 text-[17px] font-extrabold text-slate-900"
        >
          {transaction.desc}
        </h2>

        <strong className="mb-[18px] block font-mono text-[24px] font-extrabold tracking-[-0.05em] text-slate-900">
          {sign}
          {formatWon(transaction.amount)}
        </strong>

        <dl>
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-2.5 text-[13px]">
            <dt className="text-slate-500">거래일시</dt>
            <dd className="font-bold text-slate-900">
              {transaction.date} {transaction.time}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-2.5 text-[13px]">
            <dt className="shrink-0 text-slate-500">거래계좌</dt>
            <dd className="text-right font-bold text-slate-900">
              {accountName}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-2.5 text-[13px]">
            <dt className="text-slate-500">거래 후 잔액</dt>
            <dd className="font-mono font-bold text-slate-900">
              {formatWon(transaction.balanceAfter)}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-2.5 text-[13px]">
            <dt className="text-slate-500">상태</dt>
            <dd className="font-bold text-slate-900">
              {transaction.status === 'done' ? '완료' : '처리 중'}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => alert('이체확인증 저장 기능은 준비 중입니다.')}
          className="mt-4 w-full rounded-xl border border-slate-200 py-3 text-[14px] font-bold text-slate-700"
        >
          이체확인증 저장
        </button>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="mt-[18px] w-full rounded-xl bg-slate-100 py-[13px] text-[14px] font-bold text-slate-700"
        >
          닫기
        </button>
      </section>
    </div>
  )
}