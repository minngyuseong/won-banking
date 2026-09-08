import { useState } from 'react'

const accountOptions = [
  '전체계좌',
  '우리 첫급여통장',
  '우리 SUPER주거래통장',
  '우리 청년도약계좌',
]

const transactionTypeOptions = ['전체', '입금', '출금']

function FilterOptions({ options, selectedOption, onSelect, scrollable = false }) {
  return (
    <div
      className={scrollable ? 'overflow-x-auto pb-2' : ''}
      role="group"
    >
      <div className={scrollable ? 'flex w-max gap-2' : 'flex flex-wrap gap-2'}>
      {options.map((option) => {
        const isSelected = selectedOption === option

        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            aria-pressed={isSelected}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isSelected
                ? 'bg-brand-navy text-white'
                : 'bg-surface text-black hover:bg-slate-200'
            }`}
          >
            {option}
          </button>
        )
      })}
      </div>
    </div>
  )
}

export default function AccountsFilter() {
  const [account, setAccount] = useState('전체계좌')
  const [type, setType] = useState('전체')

  return (
    <section className="space-y-5" aria-label="거래내역 필터">
      <div className="space-y-2">
     
        <FilterOptions
          options={accountOptions}
          selectedOption={account}
          onSelect={setAccount}
          scrollable
        />
      </div>

      <div className="space-y-2">
   
        <FilterOptions
          options={transactionTypeOptions}
          selectedOption={type}
          onSelect={setType}
        />
      </div>
    </section>
  )
}
