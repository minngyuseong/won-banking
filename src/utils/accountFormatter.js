/**
 * 은행별 계좌번호 표시 형식을 적용한다.
 *
 * 실제 상태에는 숫자만 저장하고
 * 화면에 표시할 때만 은행별 형식에 맞춰 '-'를 추가한다.
 */
export function formatAccountNo(bank, value) {
  const number = value.replace(/[^0-9]/g, '')

  switch (bank) {
    case '우리은행':
      return formatByGroups(number, [4, 3, 6])

    case '국민은행':
      return formatByGroups(number, [6, 2, 6])

    case '신한은행':
      return formatByGroups(number, [3, 3, 6])

    case '하나은행':
      return formatByGroups(number, [3, 6, 5])

    case '카카오뱅크':
      return formatByGroups(number, [4, 2, 7])

    default:
      return number
  }
}

/**
 * 전달받은 자리수 기준으로 계좌번호를 '-'로 구분한다.
 */
function formatByGroups(value, groups) {
  const result = []
  let start = 0

  for (const size of groups) {
    if (start >= value.length) break

    result.push(value.slice(start, start + size))
    start += size
  }

  if (start < value.length) {
    result.push(value.slice(start))
  }

  return result.join('-')
}