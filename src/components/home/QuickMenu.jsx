import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../constants/navigation'
import {
    OUT_OF_SCOPE_MESSAGE,
    useToast,
} from '../common/Toast'

export function QuickMenu() {
    const navigate = useNavigate()
    const showToast = useToast()

    const menus = [
        {
            icon: '💸',
            label: '이체',
            onClick: () => navigate(APP_ROUTES.transfer),
        },
        {
            icon: '📋',
            label: '거래내역',
            onClick: () => navigate(APP_ROUTES.history),
        },
        {
            icon: '📦',
            label: '상품',
            onClick: () => showToast(OUT_OF_SCOPE_MESSAGE),
        },
        {
            icon: '📊',
            label: '자산관리',
            onClick: () => showToast(OUT_OF_SCOPE_MESSAGE),
        },
        {
            icon: '•••',
            label: '전체',
            onClick: () => showToast(OUT_OF_SCOPE_MESSAGE),
        },
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
                            <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-surface text-[19px] leading-none">
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