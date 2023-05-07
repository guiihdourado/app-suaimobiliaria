import { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { DateTime } from 'luxon'
import { FiCopy } from 'react-icons/fi'

import { api } from '@/services/api'
import { useAuth } from '@/providers/AuthProvider'

import { Button, RootLayout } from '@/components'

type Category =
  | 'apartment'
  | 'residentialHouse'
  | 'condominiumHouse'
  | 'villageHouse'

type Property = {
  id: string
  name: string
  category: Category
  propertyStatus: 'sell' | 'rent'
  propertyType: string
  zipCode: string
  address: string
  city: string
  addressNumber: string
  neighborhood: string
  commercialNeighborhood: string | null
  state: string
  complement: string
  price: number
  views: number
  extras: string[]
  tenantId: string
  createdAt: string
}

const propertyStatus = {
  sell: 'Vender',
  rent: 'Alugar',
}

const category = {
  apartment: 'Apartamento',
  residentialHouse: 'Casa',
  condominiumHouse: 'Casa de Condomínio',
  villageHouse: 'Casa de Vila',
}

export default function Properties() {
  const { user } = useAuth()
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    api
      .get<Property[]>(`/properties/${user?.tenantId}/getProperties`)
      .then(({ data }) => {
        setProperties(data)
      })
  }, [user?.tenantId])

  return (
    <RootLayout>
      <div className="py-10 px-14 w-full bg-slate-50 mb-10">
        <div className="flex justify-between">
          <h3 className="font-semibold text-2xl text-black/80">Meus Imóveis</h3>
          <div>
            <Link href="/properties/addPropertie">
              <Button>Adicionar</Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col mt-8 gap-4 pb-8">
          {properties.map((property, key) => (
            <div
              key={property.id}
              className="flex border border-slate-200 bg-white items-center justify-between py-4 px-6 rounded-2xl cursor-pointer hover:shadow-md hover:duration-300"
            >
              <div className="flex gap-4">
                <Image
                  src={
                    key % 2 === 0
                      ? 'https://casacor.abril.com.br/wp-content/uploads/sites/7/2022/01/Casa-Liu-Raiz-Arquitetura-Foto-Leonardo-Giantomasi-2.jpg'
                      : 'https://blog.archtrends.com/wp-content/uploads/2022/10/casas-modernas-1200x900.jpg'
                  }
                  width={120}
                  height={120}
                  alt={'Image'}
                  className="rounded-lg w-32"
                />
                <div className="flex flex-col justify-between gap-2">
                  <div className="flex flex-col">
                    <h4 className="text-xs font-medium text-gray-500">
                      {category[property.category]} -{' '}
                      {propertyStatus[property.propertyStatus]}
                    </h4>
                    <h3 className="text-base font-semibold text-black/80 flex items-center gap-2">
                      {property.name}
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        <div className="flex items-center justify-center gap-1">
                          42IE7RN <FiCopy className="cursor-pointer" />
                        </div>
                      </span>
                    </h3>
                    <span className="text-xs font-medium text-gray-500">
                      {property.address}, {property.addressNumber},{' '}
                      {property.neighborhood} - {property.zipCode} -{' '}
                      {property.city}/{property.state}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg text-sky-700 flex flex-col leading-5">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(property.price / 100)}
                      <span className="font-light text-xs text-gray-500">
                        Postado em{' '}
                        {DateTime.fromISO(property.createdAt).toFormat(
                          'dd/MM/yyyy',
                        )}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col pl-7">
                <div className="flex divide-x gap-7">
                  <span className="text-xs font-light text-gray-500 flex flex-col items-center justify-center">
                    <span className="text-lg font-semibold text-black/90">
                      {property.views}
                    </span>
                    Visualizações
                  </span>
                  <span className="text-xs font-light text-gray-500 flex flex-col items-center justify-center pl-7">
                    <span className="text-lg font-semibold text-black/90">
                      100
                    </span>
                    Interessados
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RootLayout>
  )
}
