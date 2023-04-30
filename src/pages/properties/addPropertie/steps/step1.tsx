import { Select } from '@/components'
import classNames from 'classnames'
import React, { useMemo, useState } from 'react'

interface Step1Props {
  control: any
}

const Step1: React.FC<Step1Props> = ({ control }) => {
  const [typeOperation, setTypeOperation] = useState('sale')
  const optionsPropertyType = useMemo(() => {
    return []
  }, [])

  return (
    <div className="flex flex-col gap-10">
      <h1>Diga-nos, que tipo de operação deseja realizar?</h1>
      <div className="flex flex-col gap-2">
        <span className="text-gray-400">Tipo de operação</span>
        <div className="w-fit flex divide-x-[1px] border-[1px] rounded-xl">
          <button
            className={classNames('p-4', {
              'bg-sky-600 text-white rounded-s-xl': typeOperation === 'sale',
            })}
            onClick={() => setTypeOperation('sale')}
          >
            Venda
          </button>
          <button
            className={classNames('p-4', {
              'bg-sky-600 text-white rounded-e-xl': typeOperation === 'rent',
            })}
            onClick={() => setTypeOperation('rent')}
          >
            Aluguel
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-gray-400">Tipo de imóvel</span>
        <Select
          name="propertyType"
          control={control}
          block
          placeholder="Selecione uma opção"
        />
      </div>
    </div>
  )
}

export { Step1 }
