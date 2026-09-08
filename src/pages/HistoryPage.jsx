import AccountsFilter from '../components/history/AccountsFilter'
import { useEffect, useState } from 'react'
import { getAccounts } from '../api/accountApi'
import { getTransactions } from '../api/transactionApi'
import { TransactionDetailModal } from '../components/common/TransactionDetailModal'
import { TransactionList } from '../components/history/TransactionList'

export default function HistoryPage() {
  const [accountId, setAccountId] = useState('all')
  const [type, setType] = useState('all')
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    getAccounts({ signal: controller.signal })
      .then(setAccounts)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          console.error(requestError)
        }
      })

    return () => controller.abort()
  }, [])

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

  function getAccountName(targetAccountId) {
    const account = accounts.find((item) => item.id === targetAccountId)

    return account
      ? `${account.nickname} (${account.accountNo})`
      : '계좌 정보 없음'
  }

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
        {!isLoading && !error && (
          <TransactionList
            transactions={transactions}
            onSelectTransaction={setSelectedTransaction}
          />
        )}
      </div>

      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          accountName={getAccountName(selectedTransaction.accountId)}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </section>
  )
}
