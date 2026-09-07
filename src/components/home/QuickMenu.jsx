import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../constants/navigation'

export function QuickMenu() {
  const navigate = useNavigate()

  const menus = [
    { icon: '💸', label: '이체', onClick: () => navigate(APP_ROUTES.transfer) },
    { icon: '📋', label: '거래내역', onClick: () => navigate(APP_ROUTES.history) },
    { icon: '📦', label: '상품', onClick: () => alert('상품 화면은 준비 중입니다.') },
    { icon: '📊', label: '자산관리', onClick: () => alert('자산관리 화면은 준비 중입니다.') },
    { icon: '•••', label: '전체', onClick: () => alert('전체 화면은 준비 중입니다.') },
  ]

  return (
    <nav aria-label="빠른 메뉴">
      <ul className="grid grid-cols-5 gap-2">
        {menus.map((menu) => (
          <li key={menu.label}>
            <button
  type="button"
  onClick={menu.onClick}
  className="flex w-full flex-col items-center gap-1.5 px-0.5 py-1.5 text-[11px] font-semibold text-slate-700"
>
  <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#f3f8fc] text-[19px] leading-none">
    {menu.icon}
  </span>

  {menu.label}
</button>
        </li>
      ))}
    </ul>
  </nav>
)
}