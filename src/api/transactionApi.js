/**
 * 거래내역 관련 API
 *
 * 거래내역 목록 조회와 거래 상세 조회 요청을 담당한다.
 * 계좌, 입출금 유형, 조회 개수 등의 조건으로 목록을 조회할 수 있다.
 */

import { apiRequest } from './apiClient'

// 거래내역 목록 조회
export function getTransactions(params = {}, options = {}) {
  const searchParams = new URLSearchParams()

  if (params.accountId) {
    searchParams.append('accountId', params.accountId)
  }

  if (params.type && params.type !== 'all') {
    searchParams.append('type', params.type)
  }

  if (params.limit) {
    searchParams.append('limit', params.limit)
  }

  const query = searchParams.toString()

  return apiRequest(
    `/transactions${query ? `?${query}` : ''}`,
    options,
  )
}

// 특정 거래내역 상세 조회
export function getTransaction(id) {
  return apiRequest(`/transactions/${id}`)
}
