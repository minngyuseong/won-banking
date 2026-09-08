import AccountsFilter from '../components/history/AccountsFilter'

export default function HistoryPage() {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadTransactions() {
      try {
        const data = await getTransactions()
        if (isMounted) setTransactions(data)
      } catch (requestError) {
        if (isMounted) setError(requestError.message)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadTransactions()
    return () => { isMounted = false }
  }, [])

  return (
    <section className="min-h-full bg-white" aria-label="거래내역">
      <div>
        {isLoading && <p className="px-5 py-16 text-center text-[13px] text-slate-500">거래내역을 불러오는 중이에요.</p>}
        {!isLoading && error && <p role="alert" className="px-5 py-16 text-center text-[13px] text-red-500">{error}</p>}
        {!isLoading && !error && <TransactionList transactions={transactions} />}
      </div>
    </section>
  )
}
