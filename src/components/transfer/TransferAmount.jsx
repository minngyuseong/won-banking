/**
 * 이체 2단계.
 *
 * 선택한 출금 계좌의 잔액을 기준으로 이체 금액을 입력하고
 * 최소 이체 금액 및 잔액 초과 여부를 검증한다.
 */
export default function TransferAmount({ transfer, setTransfer, onNext, onPrev }) {
  const account = transfer.fromAccount

  const validateAmount = (amount) => {
    if (!account || amount === 0) return ''

    if (amount < 1000) {
      return '최소 이체 금액은 1,000원입니다'
    }

    if (amount > account.balance) {
      return `잔액(${account.balance.toLocaleString()}원)을 초과했습니다`
    }

    return ''
  }

  const error = validateAmount(transfer.amount)

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    const amount = Number(raw)

    setTransfer(prev => ({
      ...prev,
      amount,
    }))
  }

  const handleQuickAmount = (value) => {
    if (value === 'clear') {
      setTransfer(prev => ({
        ...prev,
        amount: 0,
      }))
      return
    }

    setTransfer(prev => ({
      ...prev,
      amount: prev.amount + Number(value),
    }))
  }

  const isValid =
    account &&
    transfer.amount >= 1000 &&
    transfer.amount <= account.balance

  return (
    <div className="bg-white px-5 py-2">
      <h2 className="mt-[6px] text-[18px] font-extrabold tracking-[-0.02em] text-[#1a1d21]">
        얼마를 보낼까요?
      </h2>

      <p className="mb-5 mt-1 text-[12.5px] text-[#6b7280]">
        {account
          ? `${account.nickname} 잔액 ${account.balance.toLocaleString()}원 중에서 보냅니다`
          : '출금 계좌 정보를 확인할 수 없습니다'}
      </p>

      <div className="mb-[18px]">
        <input
          type="text"
          inputMode="numeric"
          value={transfer.amount || ''}
          onChange={handleAmountChange}
          placeholder="0"
          className={`w-full rounded-[12px] border-[1.5px] bg-[#f5f7f9] px-[14px] py-[13px] text-right text-[22px] font-semibold text-[#1a1d21] outline-none transition ${
            error
              ? 'border-[#e8483a] bg-[#fdeceb]'
              : transfer.amount > 0
                ? 'border-[#14875a]'
                : 'border-transparent focus:border-[#1e88d6] focus:bg-white'
          }`}
        />

        {error && (
          <p className="mt-[6px] text-[11.5px] text-[#e8483a]">
            {error}
          </p>
        )}

        {!error && transfer.amount > 0 && (
          <p className="mt-[6px] text-[11.5px] text-[#14875a]">
            {transfer.amount.toLocaleString()}원 이체 가능합니다
          </p>
        )}

        <div className="mt-[10px] flex flex-wrap gap-[6px]">
          <button type="button" onClick={() => handleQuickAmount(10000)} className="rounded-lg border border-[#e6e9ed] bg-[#f5f7f9] px-[11px] py-[6px] text-[12px] font-bold text-[#40464d]">
            +1만
          </button>

          <button type="button" onClick={() => handleQuickAmount(50000)} className="rounded-lg border border-[#e6e9ed] bg-[#f5f7f9] px-[11px] py-[6px] text-[12px] font-bold text-[#40464d]">
            +5만
          </button>

          <button type="button" onClick={() => handleQuickAmount(100000)} className="rounded-lg border border-[#e6e9ed] bg-[#f5f7f9] px-[11px] py-[6px] text-[12px] font-bold text-[#40464d]">
            +10만
          </button>

          <button type="button" onClick={() => handleQuickAmount('clear')} className="rounded-lg border border-[#e6e9ed] bg-[#f5f7f9] px-[11px] py-[6px] text-[12px] font-bold text-[#40464d]">
            직접입력
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!isValid}
        className="mt-[6px] w-full rounded-[14px] bg-[#0067ac] p-[15px] text-[15px] font-extrabold text-white transition hover:bg-[#004b80] disabled:cursor-not-allowed disabled:bg-[#c4cad1]"
      >
        다음
      </button>

      <button
        type="button"
        onClick={onPrev}
        className="mt-[10px] w-full rounded-[14px] border-[1.5px] border-[#e6e9ed] bg-white p-[13px] text-[14px] font-bold text-[#40464d]"
      >
        이전으로
      </button>
    </div>
  )
}