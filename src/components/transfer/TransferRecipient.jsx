const TransferRecipient = ({ onNext }) => {
  return (
    <div>
      <h2>누구에게 보낼까요?</h2>
      <p>출금 계좌와 받는 분의 계좌 정보를 입력해주세요</p>

      <button onClick={onNext}>다음</button>
    </div>
  );
};

export default TransferRecipient;