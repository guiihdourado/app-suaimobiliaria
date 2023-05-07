import { Input, Map } from '@/components'
import axios from 'axios'
import cep from 'cep-promise'
import { LeafletMouseEvent } from 'leaflet'
// import classNames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'

interface Step2Props {
  formState: any
  register: any
  setValue: any
  watch: any
}

interface CepPromise {
  cep: string
  state: string
  city: string
  street: string
  neighborhood: string
}

const Step2: React.FC<Step2Props> = ({
  formState,
  register,
  setValue,
  watch,
}) => {
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0, 0,
  ])
  const cepWatch = watch('cep')

  const searchAddress = useCallback(
    async (zipcode: string) => {
      try {
        cep(zipcode).then((data: CepPromise) => {
          setValue('state', data.state)
          setValue('city', data.city)
          setValue('neighborhood', data.neighborhood)
          setValue('address', data.street)
        })
      } catch (error) {
        console.log(error)
      }
    },
    [setValue],
  )

  const getMakerPointer = useCallback((cep: any) => {
    axios
      .post(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=AIzaSyDtqJks6udvhaTfdBYHcs1vgaCFqSCsr3k`,
      )
      .then((response) => {
        const { lat, lng } = response.data.results[0].geometry.location
        setSelectedPosition([lat, lng])
      })
      .catch((error) => {
        console.log('Erro na requisição:', error)
      })
  }, [])

  useEffect(() => {
    const cepWatchReplace = cepWatch?.replace('-', '').replace('.', '')
    if (cepWatchReplace && cepWatchReplace.length === 8) {
      searchAddress(cepWatchReplace)
      getMakerPointer(cepWatchReplace)
    }
  }, [cepWatch, searchAddress, getMakerPointer])

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng])
  }, [])

  return (
    <div>
      <h1>Onde está localizado seu imóvel?</h1>
      <div className="flex flex-col gap-4 mt-2">
        <Input
          label="CEP"
          errorMessage={formState.errors?.cep?.message}
          {...register('cep')}
        />
        <div className="flex flex-1 gap-2">
          <Input
            label="Estado"
            errorMessage={formState.errors?.state?.message}
            {...register('state')}
          />
          <Input
            label="Cidedade"
            errorMessage={formState.errors?.city?.message}
            {...register('city')}
          />
        </div>
        <div className="flex flex-1 gap-2">
          <Input
            label="Bairro"
            errorMessage={formState.errors?.neighborhood?.message}
            {...register('neighborhood')}
          />
          <Input
            label="Endereço"
            errorMessage={formState.errors?.address?.message}
            {...register('address')}
          />
        </div>
        {selectedPosition[0] !== 0 ? (
          <div className="w-full h-[500px]">
            <Map
              handleMapClick={handleMapClick}
              selectedPosition={selectedPosition}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { Step2 }
