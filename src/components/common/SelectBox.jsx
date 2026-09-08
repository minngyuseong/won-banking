import { useEffect, useRef, useState } from 'react'

/**
 * 공통 커스텀 셀렉트 박스.
 *
 * 브라우저 기본 select 대신 직접 목록을 렌더링하여
 * 모서리, 화살표, 목록 스타일을 동일하게 제어한다.
 */
export function SelectBox({ value, options, onChange, placeholder = '선택해주세요' }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)

  const selected = options.find(option => option.value === value)

  // 셀렉트 영역 밖을 클릭하면 목록 닫기
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const handleSelect = (option) => {
    onChange(option.value)
    setIsOpen(false)
  }

  return (
    <div ref={selectRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={`relative w-full border-[1.5px] bg-[#f5f7f9] px-[14px] py-[13px] pr-12 text-left text-[14.5px] font-semibold text-[#1a1d21] outline-none transition ${
          isOpen
            ? 'rounded-t-[12px] border-[#1e88d6] bg-white'
            : 'rounded-[12px] border-transparent'
        }`}
      >
        <span>{selected?.label || placeholder}</span>

        <span
          className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-[#6b7280] transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-30 overflow-hidden rounded-b-[12px] border-x-[1.5px] border-b-[1.5px] border-[#1e88d6] bg-white shadow-md">
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option)}
              className={`block w-full px-[14px] py-[11px] text-left text-[14px] transition hover:bg-[#f3f8fc] ${
                option.value === value
                  ? 'font-bold text-[#0067ac]'
                  : 'text-[#1a1d21]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}