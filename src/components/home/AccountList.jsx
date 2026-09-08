import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../constants/navigation'
import { formatWon } from './formatWon'

export function AccountList({ accounts, isHidden }) {
  const navigate = useNavigate()

  function goToAccountHistory(accountId) {
    navigate(`${APP_ROUTES.history}?accountId=${accountId}`)
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[17px] font-extrabold text-slate-900">
          내 계좌
        </h2>

        <button
          type="button"
          onClick={() => navigate(APP_ROUTES.history)}
          className="text-[12px] font-bold text-slate-400"
        >
          전체보기
        </button>
      </div>

      <ul className="space-y-2.5">
        {accounts.length === 0 ? (
          <li className="rounded-[14px] border border-slate-200 px-4 py-6 text-center text-[13px] text-slate-500">
            등록된 계좌가 없습니다.
          </li>
        ) : (
          accounts.map((account) => (
            <li key={account.id}>
              <button
                type="button"
                onClick={() => goToAccountHistory(account.id)}
                className="flex w-full items-center justify-between rounded-[14px] border border-slate-200 bg-white px-4 py-3.5 text-left transition hover:border-brand hover:bg-white active:scale-[0.98] focus-visible:border-brand focus-visible:outline-none"
                aria-label={`${account.nickname} 거래내역 보기`}
              >
                <span>
                  <strong className="block text-[13.5px] font-extrabold text-slate-900">
                    {account.nickname}
                  </strong>

                  <span className="mt-1 block font-mono text-[11px] font-medium text-slate-500">
                    {account.accountNo}
                  </span>
                </span>

                <span className="text-right">
                  <strong className="block font-mono text-[15px] font-extrabold tracking-[-0.06em] text-slate-900">
                    {isHidden ? '••••••원' : formatWon(account.balance)}
                  </strong>

                  <span className="mt-1 block text-[10.5px] font-bold text-slate-500">
                    {account.type}
                  </span>
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}