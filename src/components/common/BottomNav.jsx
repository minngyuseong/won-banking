import { NavLink } from 'react-router-dom'
import { APP_ROUTES, BOTTOM_TABS } from '../../constants/navigation'
import { AllIcon, HistoryIcon, HomeIcon, TransferIcon } from './icons'
import { OUT_OF_SCOPE_MESSAGE, useToast } from './Toast'

const TAB_ICONS = {
  홈: HomeIcon,
  이체: TransferIcon,
  거래내역: HistoryIcon,
  전체: AllIcon,
}

/**
 * 화면 하단에 고정되는 4개 도메인 탭.
 *
 * NavLink가 현재 URL과 to를 비교해 활성 탭에 브랜드 색을 입힌다.
 * 탭을 눌러도 Header는 그대로 두고, Layout의 Outlet 내용만 바뀐다.
 * 전체 탭은 실습 범위 밖이라 이동하지 않고 토스트만 띄운다.
 */
export function BottomNav() {
  const showToast = useToast()

  return (
    <nav
      className="flex shrink-0 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)]"
      aria-label="주요 메뉴"
    >
      {BOTTOM_TABS.map((tab) => {
        const Icon = TAB_ICONS[tab.label]
        const isOutOfScope = tab.to === APP_ROUTES.all

        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            // 홈(/)만 end를 켠다. 끄면 /history 같은 경로에서도 홈이 활성화된다.
            end={tab.end}
            onClick={(event) => {
              if (!isOutOfScope) {
                return
              }

              event.preventDefault()
              showToast(OUT_OF_SCOPE_MESSAGE)
            }}
            className={({ isActive }) =>
              [
                'flex flex-1 cursor-pointer flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors hover:bg-slate-200 active:bg-slate-300',
                isActive && !isOutOfScope ? 'text-brand' : 'text-nav-inactive',
              ].join(' ')
            }
          >
            <Icon className="h-6 w-6" />
            {tab.label}
          </NavLink>
        )
      })}
    </nav>
  )
}
