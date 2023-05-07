import { Select } from '@/components'
import classNames from 'classnames'
import React, { useMemo, useState } from 'react'

interface Step1Props {
  control: any
}

const Step1: React.FC<Step1Props> = ({ control }) => {
  const [typeOperation, setTypeOperation] = useState('sale')
  const optionsCategory = useMemo(() => {
    return [
      {
        value: 'apartment',
        label: 'Apartamento',
      },
      {
        value: 'residentialHouse',
        label: 'Casa Residencial',
      },
      {
        value: 'condominiumHouse',
        label: 'Casa de Condomínio',
      },
      {
        value: 'villageHouse',
        label: 'Casa de Vila',
      },
      {
        value: 'rooftop',
        label: 'Cobertura',
      },

      {
        value: 'rural',
        label: 'Rural',
      },
      {
        value: 'flat',
        label: 'Flat',
      },
      {
        value: 'residentialGround',
        label: 'Terreno Residencial',
      },
      {
        value: 'loft',
        label: 'Loft',
      },
      {
        value: 'commercialHouse',
        label: 'Casa Comercial',
      },
      {
        value: 'clinic',
        label: 'Clínica',
      },
      {
        value: 'deposit',
        label: 'Depósito',
      },
      {
        value: 'garage',
        label: 'Garagem',
      },
      {
        value: 'hotel',
        label: 'Hotel',
      },
      {
        value: 'commercialGround',
        label: 'Terreno Comercial',
      },
      {
        value: 'store',
        label: 'Loja',
      },
      {
        value: 'building',
        label: 'Prédio',
      },
      {
        value: 'livingRoom',
        label: 'Sala Comercial',
      },
    ]
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
          name="category"
          control={control}
          block
          placeholder="Selecione uma opção"
          options={optionsCategory}
        />
      </div>
    </div>
  )
}

export { Step1 }
