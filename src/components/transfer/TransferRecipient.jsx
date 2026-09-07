import { useEffect, useRef, useState } from 'react'
import { getAccounts } from '../../api/accountApi'
import { getBanks, lookupOwner } from '../../api/transferApi'

/**
 * 이체 1단계.
 *
 * 출금 계좌와 받는 계좌 정보를 입력하고
 * 은행과 계좌번호 조합으로 예금주를 확인한다.
 *
 * 은행 또는 계좌번호가 변경되면 기존 조회 결과를 초기화하고
 * 현재 입력값을 기준으로 예금주를 다시 조회한다.
 */
export default function TransferRecipient({ transfer, setTransfer, onNext }) {
  const [accounts, setAccounts] = useState([])
  const [banks, setBanks] = useState([])
  const [error, setError] = useState('')
  const [isLookingUp, setIsLookingUp] = useState(false)

  const requestSeq = useRef(0)

  // 출금 계좌와 은행 목록 조회
  useEffect(() => {
    async function loadData() {
      try {
        const [accountData, bankData] = await Promise.all([
          getAccounts(),
          getBanks(),
        ])

        setAccounts(accountData)
        setBanks(bankData)

        setTransfer(prev => ({
          ...prev,
          fromAccountId: prev.fromAccountId || accountData[0]?.id || '',
          toBank: prev.toBank || bankData[0]?.name || '',
        }))
      } catch (error) {
        setError(error.message)
      }
    }

    loadData()
  }, [])

  // 은행 또는 계좌번호 변경 시 예금주 재검증
  useEffect(() => {
    const accountNo = transfer.toAccountNo
    const bank = transfer.toBank

    // 기존 조회 결과는 입력 조건이 변경되는 즉시 무효화
    setTransfer(prev =>
      prev.ownerName ? { ...prev, ownerName: '' } : prev
    )
    setError('')

    const currentSeq = ++requestSeq.current

    // 조회 조건 미충족
    if (!bank || accountNo.length < 10) {
      setIsLookingUp(false)
      return
    }

    setIsLookingUp(true)

    const timer = setTimeout(async () => {
      try {
        const data = await lookupOwner(bank, accountNo)

        // 이후 다른 입력이 발생했다면 이전 응답은 무시
        if (currentSeq !== requestSeq.current) return

        setTransfer(prev => ({
          ...prev,
          ownerName: data.ownerName,
        }))
      } catch (error) {
        if (currentSeq !== requestSeq.current) return
        setError(error.message)
      } finally {
        if (currentSeq === requestSeq.current) {
          setIsLookingUp(false)
        }
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [transfer.toBank, transfer.toAccountNo])

  const handleFromAccountChange = (e) => {
    setTransfer(prev => ({
      ...prev,
      fromAccountId: e.target.value,
    }))
  }

  const handleBankChange = (e) => {
    setTransfer(prev => ({
      ...prev,
      toBank: e.target.value,
    }))
  }

  const handleAccountNoChange = (e) => {
    const accountNo = e.target.value.replace(/[^0-9]/g, '')

    setTransfer(prev => ({
      ...prev,
      toAccountNo: accountNo,
    }))
  }

  const inputClass =
    'w-full rounded-[12px] border-[1.5px] border-transparent bg-[#f5f7f9] px-[14px] py-[13px] text-[14.5px] font-semibold text-[#1a1d21] outline-none transition focus:border-[#1e88d6] focus:bg-white'

  return (
    <div className="bg-white px-5 py-2">
      <h2 className="mt-[6px] text-[18px] font-extrabold tracking-[-0.02em] text-[#1a1d21]">
        누구에게 보낼까요?
      </h2>

      <p className="mb-5 mt-1 text-[12.5px] text-[#6b7280]">
        출금 계좌와 받는 분의 계좌 정보를 입력해주세요
      </p>

      <div className="mb-[18px]">
        <label className="mb-2 block text-[12px] font-bold text-[#40464d]">
          출금 계좌
        </label>
        <select
          value={transfer.fromAccountId}
          onChange={handleFromAccountChange}
          className={inputClass}
        >
          {accounts.map(account => (
            <option key={account.id} value={account.id}>
              {account.nickname} ({account.balance.toLocaleString()}원)
            </option>
          ))}
        </select>
      </div>

      <div className="mb-[18px]">
        <label className="mb-2 block text-[12px] font-bold text-[#40464d]">
          받는 은행
        </label>
        <select
          value={transfer.toBank}
          onChange={handleBankChange}
          className={inputClass}
        >
          {banks.map(bank => (
            <option key={bank.code} value={bank.name}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-[18px]">
        <label className="mb-2 block text-[12px] font-bold text-[#40464d]">
          계좌번호
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={transfer.toAccountNo}
          onChange={handleAccountNoChange}
          placeholder="- 없이 숫자만 입력"
          className={inputClass}
        />

        {isLookingUp && (
          <p className="mt-[6px] text-[11.5px] text-[#6b7280]">
            예금주 조회 중...
          </p>
        )}

        {transfer.ownerName && (
          <div className="mt-2 w-fit rounded-full bg-[#e8f6f0] px-3 py-[7px] text-[12.5px] font-bold text-[#14875a]">
            ✓ 예금주 {transfer.ownerName}님 확인됨
          </div>
        )}

        {error && (
          <p className="mt-[6px] text-[11.5px] text-[#e8483a]">
            {error}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!transfer.ownerName || isLookingUp}
        className="mt-[6px] w-full rounded-[14px] bg-[#0067ac] p-[15px] text-[15px] font-extrabold text-white transition hover:bg-[#004b80] disabled:cursor-not-allowed disabled:bg-[#c4cad1]"
      >
        다음
      </button>
    </div>
  )
}