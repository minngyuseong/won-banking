import { useEffect, useState } from 'react'
import { getAccounts } from '../api/accountApi'
import { getTransactions } from '../api/transactionApi'

import { Greeting } from '../components/home/Greeting'
import { AssetCard } from '../components/home/AssetCard'
import { QuickMenu } from '../components/home/QuickMenu'
import { AccountList } from '../components/home/AccountList'
import { RecentTransactions } from '../components/home/RecentTransactions'
import { TransactionDetailModal } from '../components/home/TransactionDetailModal'

export default function HomePage() {
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [isHidden, setIsHidden] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadHomeData() {
    setIsLoading(true)
    setError('')

    try {
      const [accountData, transactionData] = await Promise.all([
        getAccounts(),
        getTransactions({ limit: 4 }),
      ])

      setAccounts(accountData)
      setTransactions(transactionData)
    } catch {
      setError('서버와 연결할 수 없습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadHomeData()
  }, [])

  const totalAssets = accounts.reduce(
    (total, account) => total + account.balance,
    0,
  )

  function getAccountName(accountId) {
    const account = accounts.find((item) => item.id === accountId)

    return account
      ? `${account.nickname} (${account.accountNo})`
      : '계좌 정보 없음'
  }

  return (
    <div className="w-full space-y-5 bg-white px-7 py-6">
      <Greeting />

      <AssetCard
        totalAssets={totalAssets}
        accountCount={accounts.length}
        isHidden={isHidden}
        onToggleHidden={() => setIsHidden(!isHidden)}
      />

      <QuickMenu />


      {isLoading ? (
        <section className="rounded-[14px] border border-slate-200 bg-white px-4 py-6 text-center text-[13px] text-slate-500">
          계좌와 거래내역을 불러오는 중입니다…
        </section>
      ) : error ? (
        <section className="rounded-[14px] border border-slate-200 bg-white px-4 py-6 text-center">
          <p className="text-[13px] text-slate-500">
            {error}
          </p>

          <button
            type="button"
            onClick={loadHomeData}
            className="mt-3 rounded-lg bg-[#0067ac] px-4 py-2 text-[12px] font-bold text-white"
          >
            다시 시도
          </button>
        </section>
      ) : (
        <>
          <AccountList
            accounts={accounts}
            isHidden={isHidden}
          />

          <RecentTransactions
            transactions={transactions}
            getAccountName={getAccountName}
            onSelectTransaction={setSelectedTransaction}
          />
        </>
      )}

      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          accountName={getAccountName(selectedTransaction.accountId)}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  )
}