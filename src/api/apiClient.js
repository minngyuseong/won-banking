/**
 * API 공통 요청 처리
 *
 * 모든 API에서 공통으로 사용하는 fetch 요청과
 * 응답 데이터 및 오류 처리를 담당한다.
 */

const API_BASE = 'http://localhost:4000/api'

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  let data = null

  try {
    data = await response.json()
  } catch {
    // 응답 body가 없는 경우
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `요청에 실패했습니다. (${response.status})`
    )
  }

  return data
}