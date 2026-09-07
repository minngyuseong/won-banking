import { formatWon } from './formatWon'

export function AssetCard({
  totalAssets,
  accountCount,
  isHidden,
  onToggleHidden,
}) {
  return (
    <section className="rounded-[18px] bg-[#0067ac] px-[22px] py-5 text-white">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[13px] font-normal text-white/85">
          총 자산
        </h2>

        <button
          type="button"
          onClick={onToggleHidden}
          className="rounded-lg bg-white/20 px-2.5 py-1 text-[11px] text-white"
        >
          {isHidden ? '보기' : '숨기기'}
        </button>
      </div>

      <strong className="block text-[26px] font-extrabold tracking-[-0.02em]">
        {isHidden ? '••••••••원' : formatWon(totalAssets)}
      </strong>

      <p className="mt-1.5 text-[12px] text-white/75">
        계좌 {accountCount}개 합산 금액입니다
      </p>
    </section>
  )
}