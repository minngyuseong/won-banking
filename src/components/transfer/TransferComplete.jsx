import { useNavigate } from 'react-router-dom'

/**
 * 이체 4단계.
 * 이체 완료 결과를 표시하는 화면이다.
 * '홈으로' 버튼을 누르면 홈 화면으로 이동한다.
 */
export default function TransferComplete() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div>
      <h2>이체가 완료되었습니다</h2>

      <button type="button" onClick={handleGoHome}>
        홈으로
      </button>
    </div>
  )
}