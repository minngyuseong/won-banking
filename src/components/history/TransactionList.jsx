import { TransactionItem } from './TransactionItem'

function groupTransactionsByDate(transactions) {
  return [...transactions]
    .sort((a, b) => `${b.date} ${b.time ?? ''}`.localeCompare(`${a.date} ${a.time ?? ''}`))
    .reduce((groups, transaction) => {
      const lastGroup = groups.at(-1)
      if (lastGroup?.date === transaction.date) lastGroup.transactions.push(transaction)
      else groups.push({ date: transaction.date, transactions: [transaction] })
      return groups
    }, [])
}

export function TransactionList({ transactions, onSelectTransaction }) {
  const groups = groupTransactionsByDate(transactions)

  if (groups.length === 0) {
    return <p className="px-5 py-16 text-center text-[13px] text-slate-500">아직 거래내역이 없어요.</p>
  }

  return (
    <div>
      {groups.map((group) => (
        <section key={group.date} aria-labelledby={`transaction-date-${group.date}`}>
          <h3 id={`transaction-date-${group.date}`} className="mb-1.5 mt-4 text-[11.5px] font-bold text-slate-500">
            {group.date}
          </h3>
          <ul>
            {group.transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onSelect={onSelectTransaction}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
