/**
 * 이체 관련 API
 *
 * 수취 계좌의 예금주 조회와 실제 이체 요청을 담당한다.
 */

import { apiRequest } from './apiClient'

// 은행과 계좌번호를 이용해 예금주 조회
export function lookupOwner(bank, accountNo) {
  const params = new URLSearchParams({
    bank,
    accountNo,
  })

  return apiRequest(
    `/transfer/lookup?${params.toString()}`
  )
}

// 입력한 이체 정보를 서버로 전달해 이체 실행
export function transferMoney(payload) {
  return apiRequest('/transfers', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}