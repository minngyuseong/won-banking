import logo from "../../assets/logo.png";
import { BellIcon, MenuIcon } from "./icons";
import { OUT_OF_SCOPE_MESSAGE, useToast } from "./Toast";

/**
 * 모든 도메인 페이지 상단에 고정되는 공통 헤더.
 *
 * 로고/앱 이름은 왼쪽, 알림과 햄버거 메뉴는 오른쪽에 둔다.
 * 알림·메뉴는 이번 실습 범위가 아니라서 누르면 토스트만 보여 준다.
 */
export function Header() {
  const showToast = useToast();

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
      <div className="flex items-center gap-0.5">
        {/* Vite가 src/assets/logo.png를 번들에 넣고, 해시된 URL을 만들어 준다. */}
        <img
          src={logo}
          alt="우리금융그룹"
          className="h-8 w-8 rounded-lg object-contain"
        />
        <h1 className="bagel-fat-one-regular text-[22px] tracking-tight text-brand-navy">
          WON 실습뱅킹
        </h1>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="cursor-pointer rounded-full p-1.5 text-bell transition-colors hover:bg-slate-200 active:bg-slate-300"
          aria-label="알림"
          onClick={() => showToast(OUT_OF_SCOPE_MESSAGE)}
        >
          <BellIcon className="h-6 w-6" />
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-full p-1.5 text-slate-700 transition-colors hover:bg-slate-200 active:bg-slate-300"
          aria-label="메뉴"
          onClick={() => showToast(OUT_OF_SCOPE_MESSAGE)}
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
