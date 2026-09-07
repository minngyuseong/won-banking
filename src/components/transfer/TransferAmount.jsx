const TransferAmount = ({ onNext, onPrev }) => {
  return (
    <div>
      <h2>얼마를 보낼까요?</h2>

      <button onClick={onNext}>다음</button>
      <button onClick={onPrev}>이전으로</button>
    </div>
  );
};

export default TransferAmount;