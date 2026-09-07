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

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [accountData, transactionData] = await Promise.all([
          getAccounts(),
          getTransactions({ limit: 4 }),
        ])

        setAccounts(accountData)
        setTransactions(transactionData)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

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

  if (isLoading) {
    return (
      <p className="p-6 text-center">
        계좌 정보를 불러오는 중입니다…
      </p>
    )
  }

  if (error) {
    return (
      <p className="p-6 text-center text-red-500">
        {error}
      </p>
    )
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

      <AccountList
        accounts={accounts}
        isHidden={isHidden}
      />

      <RecentTransactions
        transactions={transactions}
        getAccountName={getAccountName}
        onSelectTransaction={setSelectedTransaction}
      />

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