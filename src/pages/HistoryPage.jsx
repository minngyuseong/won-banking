import AccountsFilter from '../components/history/AccountsFilter'
import { useEffect, useState } from 'react'
import { getTransactions } from '../api/transactionApi'
import { TransactionList } from '../components/history/TransactionList'

export default function HistoryPage() {
  const [accountId, setAccountId] = useState('all')
  const [type, setType] = useState('all')
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadTransactions() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getTransactions(
          {
            accountId: accountId === 'all' ? undefined : accountId,
            type,
          },
          { signal: controller.signal },
        )
        setTransactions(data)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadTransactions()
    return () => controller.abort()
  }, [accountId, type])

  return (
    <section className="min-h-full bg-white px-5 py-8" aria-label="거래내역">
      <AccountsFilter
        accountId={accountId}
        type={type}
        onAccountChange={setAccountId}
        onTypeChange={setType}
      />
      <div>
        {isLoading && <p className="px-5 py-16 text-center text-[13px] text-slate-500">거래내역을 불러오는 중이에요.</p>}
        {!isLoading && error && <p role="alert" className="px-5 py-16 text-center text-[13px] text-red-500">{error}</p>}
        {!isLoading && !error && <TransactionList transactions={transactions} />}
      </div>
    </section>
  )
}
