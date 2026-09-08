const accountOptions = [
  { label: '전체계좌', value: 'all' },
  { label: '우리 첫급여통장', value: 'acc1' },
  { label: '우리 SUPER주거래통장', value: 'acc2' },
  { label: '우리 청년도약계좌', value: 'acc3' },
]

const transactionTypeOptions = [
  { label: '전체', value: 'all' },
  { label: '입금', value: 'in' },
  { label: '출금', value: 'out' },
]

function FilterOptions({ options, selectedOption, onSelect, scrollable = false }) {
  return (
    <div
      className={scrollable ? 'overflow-x-auto pb-2' : ''}
      role="group"
    >
      <div className={scrollable ? 'flex w-max gap-2' : 'flex flex-wrap gap-2'}>
      {options.map((option) => {
        const isSelected = selectedOption === option.value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            aria-pressed={isSelected}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isSelected
                ? 'bg-brand-navy text-white'
                : 'bg-surface text-black hover:bg-slate-200'
            }`}
          >
            {option.label}
          </button>
        )
      })}
      </div>
    </div>
  )
}

export default function AccountsFilter({ accountId, type, onAccountChange, onTypeChange }) {
  return (
    <section className="space-y-5" aria-label="거래내역 필터">
      <div className="space-y-2">
     
        <FilterOptions
          options={accountOptions}
          selectedOption={accountId}
          onSelect={onAccountChange}
          scrollable
        />
      </div>

      <div className="space-y-2">
   
        <FilterOptions
          options={transactionTypeOptions}
          selectedOption={type}
          onSelect={onTypeChange}
        />
      </div>
    </section>
  )
}
