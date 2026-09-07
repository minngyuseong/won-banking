import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

const ToastContext = createContext(null)

export const OUT_OF_SCOPE_MESSAGE = '이번 실습 범위 밖입니다.'

/**
 * 헤더/하단 탭에서 같은 토스트를 띄우기 위한 컨텍스트.
 * 메시지는 약 2초 뒤 자동으로 사라진다.
 */
export function ToastProvider({ children }) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)

  const showToast = useCallback((text) => {
    setMessage(text)
    setVisible(true)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      setVisible(false)
    }, 2000)
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {visible ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-20 z-20 flex justify-center px-5">
          <p
            role="status"
            className="rounded-full bg-zinc-800/90 px-4 py-2.5 text-center text-sm text-white shadow-lg"
          >
            {message}
          </p>
        </div>
      ) : null}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const showToast = useContext(ToastContext)

  if (!showToast) {
    throw new Error('useToast는 ToastProvider 안에서만 사용할 수 있습니다.')
  }

  return showToast
}
