# WON 실습뱅킹

모바일 뱅킹 앱을 데스크톱에서도 미리 볼 수 있도록 만든 실습용 웹 애플리케이션입니다.  
홈에서 자산을 확인하고, 이체를 실행하고, 거래내역을 조회하는 흐름을 React와 Express로 구현했습니다.

기획과 진행 내용은 [WON 노션 페이지](https://proximal-freeze-d56.notion.site/WON-3d4cda56c998805cbc11cf930f1fac82)에서 볼 수 있습니다.

## 주요 기능

- **홈** — 총 자산, 보유 계좌, 빠른 메뉴, 최근 거래내역
- **이체** — 수취 계좌 확인 → 금액 입력 → 확인 → 완료 4단계
- **거래내역** — 계좌·입출금 필터, 상세 바텀시트
- **공통 UI** — 헤더, 하단 탭, 데스크톱용 스마트폰 프레임, 토스트

이번 실습 범위가 아닌 알림, 햄버거 메뉴, 상품, 자산관리, 전체 탭은 누르면 안내 토스트만 표시됩니다.

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| Frontend | React 19, React Router 7, Vite 8, Tailwind CSS 4 |
| Backend | Express 5 (인메모리 더미 데이터) |
| 도구 | ESLint, Prettier, concurrently |

## 시작하기

### 요구 사항

- Node.js 20.19 이상 또는 22.12 이상
- npm

### 설치 및 실행

```bash
git clone https://github.com/minngyuseong/won-banking.git
cd won-banking
npm install
npm run dev
```

`npm run dev`는 Vite 클라이언트와 Express API를 함께 실행합니다.

| 서비스 | 주소 |
| --- | --- |
| 웹 앱 | http://localhost:5173 |
| API 서버 | http://localhost:4000 |

프론트엔드는 `http://localhost:4000/api`로 요청합니다. API 서버가 꺼져 있으면 홈·이체·거래내역에서 연결 오류가 표시됩니다.

## 스크립트

```bash
npm run dev          # 클라이언트 + API 동시 실행
npm run dev:client   # Vite만 실행 (기본 5173)
npm run dev:server   # Express API만 실행 (기본 4000)
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 결과 미리보기
npm run lint         # ESLint
npm run format       # Prettier 포맷
npm run format:check
```

## 화면 구성

| 경로 | 화면 | 설명 |
| --- | --- | --- |
| `/` | 홈 | 총 자산, 계좌 목록, 최근 거래 4건, 거래 상세 |
| `/transfer` | 이체 | 4단계 이체 플로우 |
| `/history` | 거래내역 | 필터와 목록, 상세 바텀시트 |
| `/all` | 전체 | 실습 범위 밖 (하단 탭에서 이동하지 않음) |

데스크톱(md 이상)에서는 스마트폰 프레임으로 보이고, 모바일 폭에서는 프레임 없이 화면을 채웁니다.

### 이체 흐름

1. **받는 계좌** — 출금 계좌·은행·계좌번호를 입력하면 예금주를 조회합니다.
2. **금액** — 최소 1,000원, 출금 계좌 잔액을 넘을 수 없습니다.
3. **확인** — 입력값을 확인하고 `POST /api/transfers`로 이체를 실행합니다.
4. **완료** — 결과를 보여 준 뒤 홈으로 돌아갈 수 있습니다.

### 실습용 수취 계좌

서버 더미 데이터에 등록된 계좌로만 예금주 조회와 이체가 됩니다.

| 은행 | 계좌번호 | 예금주 |
| --- | --- | --- |
| 우리은행 | 1002123456789 | 김민준 |
| 국민은행 | 1002987654321 | 이서연 |
| 신한은행 | 1102555666777 | 박지훈 |

## API

로컬 기본 주소는 `http://localhost:4000`입니다. 데이터는 메모리에만 있어서 **서버를 재시작하면 잔액과 거래내역이 초기값으로 돌아갑니다.**

| Method | 경로 | 설명 |
| --- | --- | --- |
| `GET` | `/api/health` | 서버 상태 확인 |
| `GET` | `/api/accounts` | 계좌 목록 |
| `GET` | `/api/accounts/:accountId` | 계좌 상세 |
| `GET` | `/api/banks` | 이체 가능 은행 목록 |
| `GET` | `/api/transactions` | 거래내역 목록 (`accountId`, `type`, `limit` 쿼리) |
| `GET` | `/api/transactions/:id` | 거래 상세 |
| `GET` | `/api/transfer/lookup` | 예금주 조회 (`bank`, `accountNo`) |
| `POST` | `/api/transfers` | 이체 실행 |

이체 요청 본문 예시:

```json
{
  "fromAccountId": "acc1",
  "toBank": "우리은행",
  "toAccountNo": "1002123456789",
  "toOwnerName": "김민준",
  "amount": 10000
}
```

프론트 호출은 `src/api/`의 도메인별 함수가 `apiClient.js`를 통해 처리합니다.

## 폴더 구조

```text
won-banking/
├── public/                 # 파비콘
├── server/
│   ├── server.js          # Express 라우트
│   └── data.js             # 실습용 더미 데이터
├── src/
│   ├── api/                # 계좌·이체·거래내역 API 클라이언트
│   ├── assets/             # 로고 등 정적 자산
│   ├── components/
│   │   ├── common/        # 헤더, 하단 탭, 프레임, 토스트
│   │   ├── home/
│   │   ├── history/
│   │   └── transfer/
│   ├── constants/          # 라우트·탭 정의
│   ├── layouts/            # AppLayout
│   ├── pages/
│   ├── utils/              # 계좌번호 포맷
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx
├── package.json
└── vite.config.js
```

## 커밋 메시지

```text
[Type] #이슈번호 한 줄 요약
```

허용 Type: `Feat`, `Fix`, `Docs`, `Refactor`, `Test`, `Chore`, `Infra`

예시: `[Feat] #32 거래내역 상세 바텀시트 연동`
