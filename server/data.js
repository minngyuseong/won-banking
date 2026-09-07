// 실습용 인메모리 더미 데이터입니다.
// 실제 서비스에서는 데이터베이스(MySQL, PostgreSQL 등)를 사용합니다.
// 서버를 재시작하면 이체로 변경된 잔액과 거래내역은 초기값으로 리셋됩니다.

// 사용자 보유 계좌 목록
const accounts = [
  {
    id: 'acc1',
    nickname: '우리 첫급여통장',
    accountNo: '1002-***-123456',
    type: '입출금',
    balance: 2384560,
  },
  {
    id: 'acc2',
    nickname: '우리 SUPER주거래통장',
    accountNo: '1002-***-789012',
    type: '저축예금',
    balance: 15200000,
  },
  {
    id: 'acc3',
    nickname: '우리 청년도약계좌',
    accountNo: '1002-***-456789',
    type: '적금',
    balance: 5000000,
  },
];

// 계좌 거래내역
const transactions = [
  {
    id: 1,
    accountId: 'acc1',
    date: '2026-08-23',
    time: '09:12',
    desc: '스타벅스 강남점',
    type: 'out',
    amount: 5800,
    balanceAfter: 2384560,
    status: 'done',
  },
  {
    id: 2,
    accountId: 'acc1',
    date: '2026-08-22',
    time: '18:40',
    desc: '월급',
    type: 'in',
    amount: 3200000,
    balanceAfter: 2390360,
    status: 'done',
  },
  {
    id: 3,
    accountId: 'acc1',
    date: '2026-08-22',
    time: '12:05',
    desc: '이서연',
    type: 'out',
    amount: 30000,
    balanceAfter: 809640,
    status: 'done',
  },
  {
    id: 4,
    accountId: 'acc2',
    date: '2026-08-21',
    time: '10:00',
    desc: '자동이체 - 적금',
    type: 'out',
    amount: 500000,
    balanceAfter: 15200000,
    status: 'done',
  },
  {
    id: 5,
    accountId: 'acc1',
    date: '2026-08-20',
    time: '20:15',
    desc: '배달의민족',
    type: 'out',
    amount: 18900,
    balanceAfter: 15839640,
    status: 'pending',
  },
  {
    id: 6,
    accountId: 'acc3',
    date: '2026-08-19',
    time: '09:00',
    desc: '적금 자동납입',
    type: 'out',
    amount: 300000,
    balanceAfter: 5000000,
    status: 'done',
  },
  {
    id: 7,
    accountId: 'acc1',
    date: '2026-08-18',
    time: '14:22',
    desc: '박지훈',
    type: 'in',
    amount: 50000,
    balanceAfter: 15858540,
    status: 'done',
  },
];

// 이체 시 선택할 수 있는 은행 목록
const banks = [
  { code: 'WOORI', name: '우리은행' },
  { code: 'KB', name: '국민은행' },
  { code: 'SHINHAN', name: '신한은행' },
  { code: 'HANA', name: '하나은행' },
  { code: 'KAKAO', name: '카카오뱅크' },
];

// 예금주 조회용 계좌 정보
// 은행과 계좌번호가 모두 일치하는 경우 예금주를 조회한다.
const ownerLookup = [
  { bank: '우리은행', accountNo: '1002123456789', ownerName: '김민준' },
  { bank: '국민은행', accountNo: '1002987654321', ownerName: '이서연' },
  { bank: '신한은행', accountNo: '1102555666777', ownerName: '박지훈' },
];

// 신규 거래내역 ID 생성
let txIdSeq = 8;

function getNextTxId() {
  return txIdSeq++;
}

export { accounts, transactions, banks, ownerLookup, getNextTxId };