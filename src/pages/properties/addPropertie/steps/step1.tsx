import { Select } from '@/components'
import classNames from 'classnames'
import React, { useMemo, useState } from 'react'

interface Step1Props {
  control: any
  setValue: any
  category: string
  subCategory: string
  propertyStatus: string
  formState: any
}

const Step1: React.FC<Step1Props> = ({ control, setValue, category, subCategory, propertyStatus, formState }) => {
  const [typeOperation, setTypeOperation] = useState(propertyStatus || null)

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
  }, []).sort((a, b) => {
    if (a.label < b.label) {
      return -1
    }
    if (a.label > b.label) {
      return 1
    }
    return 0
  })

  const optionsSubCategory = useMemo(() => {
    return [
      {
        value: 'default',
        label: 'Padrão',
      },
      {
        value: 'rooftop',
        label: 'Cobertura',
      },
      {
        value: 'flat',
        label: 'Flat',
      },
      {
        value: 'kitnet',
        label: 'Kitnet',
      },
      {
        value: 'loft',
        label: 'Loft',
      },
      {
        value: 'studio',
        label: 'Studio',
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
        value: 'singleStoreyHouse',
        label: 'Casa Térrea',
      },
      {
        value: 'gallery',
        label: 'Galeria',
      },
      {
        value: 'shopping',
        label: 'Shopping',
      },
      {
        value: 'clinic',
        label: 'Clínica',
      },
      {
        value: 'office',
        label: 'Escritório',
      },
    ]
  }, []).sort((a, b) => {
    if (a.label < b.label) {
      return -1
    }
    if (a.label > b.label) {
      return 1
    }
    return 0
  })

  return (
    <div className="flex flex-col gap-10">
      <h1>Diga-nos, que tipo de operação deseja realizar?</h1>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold mb-1">
          Status do imóvel
        <span className="text-red-500">*</span>
        </label>
        <div className="w-fit flex divide-x-[1px] border-[1px] rounded-xl">
          <button
            className={classNames('p-4', {
              'bg-sky-600 text-white rounded-s-xl': typeOperation === 'sell',
            })}
            onClick={() => {
              setTypeOperation('sell');
              setValue('propertyStatus', 'sell')
            }}
          >
            Venda
          </button>
          <button
            className={classNames('p-4', {
              'bg-sky-600 text-white rounded-e-xl': typeOperation === 'rent',
            })}
            onClick={() => {
              setTypeOperation('rent');
              setValue('propertyStatus', 'rent')
            }}
          >
            Aluguel
          </button>
        </div>
        {formState?.errors?.propertyStatus?.message ? (
          <span className="text-red-500 text-sm font-bold">{formState?.errors?.propertyStatus.message}</span>
        ) : null}
      </div>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <Select
            defaultValue={category}
            label="Categoria do imóvel"
            name="category"
            control={control}
            block
            placeholder="Selecione uma opção"
            options={optionsCategory}
            isRequired
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Select
            defaultValue={subCategory}
            label="Subcategoria do imóvel"
            name="subCategory"
            control={control}
            block
            placeholder="Selecione uma opção"
            options={optionsSubCategory}
            isRequired
          />
        </div>
      </div>
    </div>
  )
}

export { Step1 }
