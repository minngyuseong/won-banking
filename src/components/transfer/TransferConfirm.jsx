const TransferConfirm = ({ onNext, onPrev }) => {
  return (
    <div>
      <h2>이체 내용을 확인해주세요</h2>

      <button onClick={onNext}>이체하기</button>
      <button onClick={onPrev}>이전으로</button>
    </div>
  );
};

export default TransferConfirm;