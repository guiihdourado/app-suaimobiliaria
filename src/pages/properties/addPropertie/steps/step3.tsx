import {  Divider, Input, NumberInput, TextareaInput } from '@/components'
import React from 'react'

interface Step3Props {
  control: any
  register: any
}

const Step3: React.FC<Step3Props> = ({ control, register }) => {
  return (
    <div className="flex flex-col gap-8">
      <h1>Conte-nos um pouco mais sobre seu imóvel.</h1>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-8">
          <div className="w-1/4 flex gap-10">
            <NumberInput
              control={control}
              label="Quartos (opcional)"
              name="bedroomsNumber"
            />
            <NumberInput
              control={control}
              label="Banheiros (opcional)"
              name="bathroomsNumber"
            />
          </div>
          <div className="w-1/4 flex gap-10">
            <NumberInput
              control={control}
              label="Suítes (opcional)"
              name="suitesNumber"
            />
            <NumberInput
              control={control}
              label="Garagens (opcional)"
              name="garagesNumber"
            />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <span className="text-sky-900 font-semibold text-xl">Área do imóvel</span>
          <div className="w-1/4 flex gap-10">
            <NumberInput
              control={control}
              label="Área útil (m²)"
              name="usefulArea"
              isRequired
            />
            <NumberInput
              control={control}
              label="Área total (m²)"
              name="totalArea"
              isRequired
            />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <span className="text-sky-900 font-semibold text-xl">Valor</span>
          <div className="w-1/4 flex flex-col gap-10">
            {/* <CurrencyInput
              label="Valor do Imóvel"
              control={control}
              currency="BRL"
              name="price"
            /> */}
             <NumberInput
              control={control}
              label="Valor do Imóvel"
              name="price"
              isRequired
            />
            <NumberInput
              control={control}
              label="IPTU"
              name="iptu"
              isRequired
            />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <span className="text-sky-900 font-semibold  text-xl">Descreva o Imóvel</span>
          <div className="w-1/4 flex flex-col gap-10">
            <Input label="Titulo" {...register('name')} isRequired />
            <TextareaInput label='Descrição' name='description' register={register} isRequired />
          </div>
        </div>
      </div>
    </div>
  )
}

export { Step3 }
