import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../constants/navigation'
import { formatWon } from './formatWon'

export function RecentTransactions({
    transactions,
    getAccountName,
    onSelectTransaction,
}) {
    const navigate = useNavigate()

    return (
        <section>
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[17px] font-extrabold text-slate-900">
                    최근 거래
                </h2>

                <button
                    type="button"
                    onClick={() => navigate(APP_ROUTES.history)}
                    className="text-[12px] font-bold text-slate-400"
                >
                    전체보기
                </button>
            </div>

            <ul>
                {transactions.length === 0 ? (
                    <li className="py-6 text-center text-[13px] text-slate-500">
                        최근 거래내역이 없습니다.
                    </li>
                ) : (
                    transactions.map((transaction) => (
                        <li key={transaction.id}>
                            <button
                                type="button"
                                onClick={() => onSelectTransaction(transaction)}
                                className="flex w-full items-center justify-between border-b border-slate-200 py-3 text-left"
                            >
                                <span>
                                    <strong className="block text-[13px] font-bold text-slate-900">
                                        {transaction.desc}
                                    </strong>

                                    <small className="mt-0.5 block text-[11px] text-slate-500">
                                        {getAccountName(transaction.accountId).split(' (')[0]} ·{' '}
                                        {transaction.date.slice(5)}
                                    </small>
                                </span>

                                <strong
                                    className={
                                        transaction.type === 'out'
                                            ? 'font-mono text-[13.5px] font-extrabold tracking-[-0.06em] text-red-500'
                                            : 'font-mono text-[13.5px] font-extrabold tracking-[-0.06em] text-brand-navy'
                                    }
                                >
                                    {transaction.type === 'out' ? '-' : '+'}
                                    {formatWon(transaction.amount)}
                                </strong>
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </section>
    )
}