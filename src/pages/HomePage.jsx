// import { DomainPlaceholder } from '../components/DomainPlaceholder'

// /**
//  * 메인(홈) 페이지. 라우트: `/`
//  *
//  * 하단 탭의 기본 화면이다.
//  * 총 자산/계좌/최근 거래 대시보드는 홈 도메인 이슈에서 이 컴포넌트를 채운다.
//  */
// export default function HomePage() {
//   return (
//     <DomainPlaceholder
//       title="홈"
//       description="메인 화면입니다. 총 자산, 바로가기, 내 계좌, 최근 거래 영역은 이후 이슈에서 구현합니다."
//     />
//   )
// }

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
    <div className="min-h-screen space-y-7 bg-white px-7 py-6">
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