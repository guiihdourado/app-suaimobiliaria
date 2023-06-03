import {  Divider, Input, NumberInput, TextareaInput } from '@/components'
import React from 'react'

interface Step3Props {
  control: any
  register: any
  formState: any
}

const Step3: React.FC<Step3Props> = ({ control, register, formState }) => {
  return (
    <div className="flex flex-col gap-8">
      <h1>Conte-nos um pouco mais sobre seu imóvel.</h1>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-8">
          <div className="w-1/4 flex gap-10">
            <NumberInput
              control={control}
              label="Quartos"
              name="bedroomsNumber"
            />
            <NumberInput
              control={control}
              label="Banheiros"
              name="bathroomsNumber"
            />
          </div>
          <div className="w-1/4 flex gap-10">
            <NumberInput
              control={control}
              label="Suítes"
              name="suitesNumber"
            />
            <NumberInput
              control={control}
              label="Garagens"
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
            <Input 
              label="Titulo" 
              {...register('name')} 
              isRequired 
              errorMessage={formState?.errors?.name?.message} 
            />
            <TextareaInput 
              label='Descrição' 
              name='description' 
              register={register} 
              isRequired
              errorMessage={formState?.errors?.description?.message} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { Step3 }
