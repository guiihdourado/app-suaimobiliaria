import {  Divider, ImageInput, Input, NumberInput, TextareaInput } from '@/components'
import React, { useCallback } from 'react'
import { RiInformationLine } from 'react-icons/ri'

interface Step3Props {
  register: any
  setValue: any
  watch: any
}

const Step4: React.FC<Step3Props> = ({  register, setValue, watch }) => {
  const images = watch('images')

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <span className="text-sky-900 font-semibold text-xl">Fotos</span>
          <p className="text-gray-500 text-sm flex items-center gap-1"> <RiInformationLine size={16} className="fill-sky-700"/>Carregue entre 5 e 50 fotos. Uma vez carregado, arraste e solte para alterar sua ordem. Os formatos jpg, jpeg e png são suportados de 500 x 500px a 6000 x 6000px.</p>
          <ImageInput name="images" register={register} setValue={setValue} value={images} />
        </div>
      </div>
    </div>
  )
}

export { Step4 }
