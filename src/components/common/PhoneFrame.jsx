/**
 * 데스크톱에서 앱을 스마트폰처럼 보여 주는 외곽 프레임.
 *
 * 실제 폰(좁은 화면)에서는 테두리를 숨긴다.
 * 폰 안에 폰 테두리가 한 번 더 생기면 화면만 작아지기 때문이다.
 */
export function PhoneFrame({ children }) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-slate-200 md:p-6">
      {/* md 이상에서만 검은 베젤. 모바일은 테두리 없이 화면만 채운다. */}
      <div className="relative flex h-svh w-full max-w-[430px] flex-col overflow-hidden bg-white md:h-[min(844px,calc(100svh-3rem))] md:rounded-[2.5rem] md:border-[10px] md:border-zinc-900 md:shadow-2xl">
        <StatusBar />
        {children}
      </div>
    </div>
  );
}

/**
 * 목업용 상단 상태바. 시안(9:41, 5G)과 같은 고정 값이다.
 * 실제 시계가 아니며, 기기 프레임 장식이다.
 */
function StatusBar() {
  return (
    <div className="hidden shrink-0 items-center justify-between bg-white px-6 pb-1 pt-3 text-[13px] font-semibold text-zinc-900 md:flex">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <SignalIcon />
        <span className="text-[11px] font-bold tracking-tight">5G</span>
        <BatteryIcon />
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg
      className="h-3 w-4"
      viewBox="0 0 18 12"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="0" y="8" width="3" height="4" rx="0.5" />
      <rect x="5" y="5" width="3" height="7" rx="0.5" />
      <rect x="10" y="2" width="3" height="10" rx="0.5" />
      <rect x="15" y="0" width="3" height="12" rx="0.5" opacity="0.35" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg className="h-3 w-6" viewBox="0 0 25 12" fill="none" aria-hidden="true">
      <rect
        x="0.5"
        y="0.5"
        width="21"
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect x="2" y="2" width="16" height="8" rx="1.2" fill="currentColor" />
      <rect
        x="22.5"
        y="3.5"
        width="2"
        height="5"
        rx="0.8"
        fill="currentColor"
      />
    </svg>
  );
}
