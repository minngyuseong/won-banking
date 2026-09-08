const amountFormatter = new Intl.NumberFormat('ko-KR')

const accountNames = {
  acc1: '우리 첫급여통장',
  acc2: '우리 SUPER주거래통장',
  acc3: '우리 청년희망적금',
}

export function TransactionItem({ transaction }) {
  const isDeposit = transaction.type === 'in'
  const isPending = transaction.status === 'pending'

  return (
    <li className="flex cursor-pointer items-center justify-between border-b border-slate-200 px-0.5 py-3 transition-colors hover:-mx-2 hover:rounded-lg hover:bg-blue-50/50 hover:px-2">
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-slate-100 text-base"
          role="img"
          aria-label={isDeposit ? '입금' : '출금'}
        >
          {isDeposit ? '⬇️' : '⬆️'}
        </span>

        <div className="min-w-0">
          <p className="mb-[3px] truncate text-[13.5px] font-bold leading-5 text-slate-950">
            {transaction.desc}
          </p>
          <div className="flex items-center gap-1.5 whitespace-nowrap text-[11px] text-slate-500">
            <span>{transaction.time} · {accountNames[transaction.accountId] ?? transaction.accountId}</span>
            <span className={`rounded-full px-[7px] py-0.5 text-[10px] font-bold ${isPending ? 'bg-amber-100 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {isPending ? '처리중' : '완료'}
            </span>
          </div>
        </div>
      </div>

      <div className="shrink-0 text-right font-mono">
        <p className={`text-sm font-extrabold leading-5 ${isDeposit ? 'text-blue-700' : 'text-slate-950'}`}>
          {isDeposit ? '+' : '-'}{amountFormatter.format(transaction.amount)}원
        </p>
        <p className="mt-0.5 text-[10.5px] font-medium leading-4 text-slate-500">
          잔액 {amountFormatter.format(transaction.balanceAfter)}원
        </p>
      </div>
    </li>
  )
}
