/**
 * 계좌 관련 API
 *
 * 계좌 목록 조회와 계좌 상세 조회 요청을 담당한다.
 */

import { apiRequest } from './apiClient'

// 전체 계좌 목록 조회
export function getAccounts() {
  return apiRequest('/accounts')
}

// 특정 계좌 상세 조회
export function getAccount(accountId) {
  return apiRequest(`/accounts/${accountId}`)
}