import logo from "../../assets/logo.png";
import { BellIcon, MenuIcon } from "./icons";

/**
 * 모든 도메인 페이지 상단에 고정되는 공통 헤더.
 *
 * 로고/앱 이름은 왼쪽, 알림과 햄버거 메뉴는 오른쪽에 둔다.
 * 실제 알림·메뉴 동작은 이 이슈 범위가 아니므로 UI만 배치한다.
 */
export function Header() {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
      <div className="flex items-center gap-2">
        {/* Vite가 src/assets/logo.png를 번들에 넣고, 해시된 URL을 만들어 준다. */}
        <img
          src={logo}
          alt="우리금융그룹"
          className="h-6 w-6 rounded-lg object-contain"
        />
        <h1 className="text-[17px] font-bold tracking-tight text-brand-navy">
          WON 실습뱅킹
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" className="text-bell" aria-label="알림">
          <BellIcon className="h-6 w-6" />
        </button>
        <button type="button" className="text-slate-700" aria-label="메뉴">
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
