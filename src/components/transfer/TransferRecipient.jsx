import { useEffect, useState } from 'react'
import { getAccounts } from '../../api/accountApi'

/**
 * 이체 1단계.
 * 출금 계좌와 받는 계좌 정보를 입력하는 화면이다.
 *
 * 현재는 출금 계좌 목록 조회 API 연결을 확인한다.
 * 예금주 조회 기능은 이후 추가한다.
 */
export default function TransferRecipient({ onNext }) {
  const [accounts, setAccounts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadAccounts() {
      try {
        const data = await getAccounts()
        setAccounts(data)
      } catch (error) {
        setError(error.message)
      }
    }

    loadAccounts()
  }, [])

  return (
    <div>
      <h2>누구에게 보낼까요?</h2>
      <p>출금 계좌와 받는 분의 계좌 정보를 입력해주세요.</p>

      <div>
        <label>출금 계좌</label>
        <select>
          {accounts.map(account => (
            <option key={account.id} value={account.id}>
              {account.nickname} ({account.balance.toLocaleString()}원)
            </option>
          ))}
        </select>
      </div>

      {error && <p>{error}</p>}

      <button type="button" onClick={onNext}>다음</button>
    </div>
  )
}