import { useState } from 'react'
import TransferRecipient from '../components/transfer/TransferRecipient'
import TransferAmount from '../components/transfer/TransferAmount'
import TransferConfirm from '../components/transfer/TransferConfirm'
import TransferComplete from '../components/transfer/TransferComplete'

/**
 * 이체 도메인 페이지. 라우트: `/transfer`
 *
 * 계좌 이체의 전체 흐름과 입력 상태를 관리한다.
 * 각 단계는 별도 컴포넌트로 구성하며
 * 입력한 이체 정보는 단계가 변경되어도 유지한다.
 *
 * 이체 단계:
 * 1. 받는 계좌 입력
 * 2. 이체 금액 입력
 * 3. 이체 정보 확인
 * 4. 이체 완료
 */
export default function TransferPage() {
  const [step, setStep] = useState(1)
  const [transfer, setTransfer] = useState({
    fromAccountId: '',
    toBank: '우리은행',
    toAccountNo: '',
    ownerName: '',
    amount: 0,
  })

  return (
    <>
      {step === 1 && (
        <TransferRecipient
          transfer={transfer}
          setTransfer={setTransfer}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <TransferAmount
          transfer={transfer}
          setTransfer={setTransfer}
          onNext={() => setStep(3)}
          onPrev={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <TransferConfirm
          transfer={transfer}
          onNext={() => setStep(4)}
          onPrev={() => setStep(2)}
        />
      )}

      {step === 4 && <TransferComplete />}
    </>
  )
}