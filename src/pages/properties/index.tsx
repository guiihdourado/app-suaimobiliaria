import Image from 'next/image'

import { FiCopy } from 'react-icons/fi'

import { RootLayout } from '@/components'

const properties = Array.from({ length: 10 }, (_, i) => i + 1)

export default function Properties() {
  return (
    <RootLayout>
      <div className="py-10 px-14 w-full bg-slate-50 mb-10">
        <h3 className="font-semibold text-2xl text-black/80">Meus Imóveis</h3>
        <div className="flex flex-col mt-8 gap-4">
          {properties.map((property) => (
            <div
              key={property}
              className="flex border border-slate-200 bg-white items-center justify-between py-4 px-6 rounded-2xl cursor-pointer hover:shadow-md hover:duration-300"
            >
              <div className="flex gap-4">
                <Image
                  src={
                    property % 2 === 0
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
                      Casa - Aluguel
                    </h4>
                    <h3 className="text-base font-semibold text-black/80 flex items-center gap-2">
                      Excelente Casa, QNF 22, Bem Localizado
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        <div className="flex items-center justify-center gap-1">
                          42IE7RN <FiCopy className="cursor-pointer" />
                        </div>
                      </span>
                    </h3>
                    <span className="text-xs font-medium text-gray-500">
                      Setor F Norte QNF 22 Casa 27
                    </span>

                    {/* <span className="w-fit inline-flex items-center rounded-md bg-blue-500 px-2 py-1 text-base font-semibold text-white ring-1 ring-inset ring-blue-600/10">
                    R$ 3000,00
                  </span> */}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg text-sky-700 flex flex-col leading-5">
                      R$ 3000,00
                      <span className="font-light text-xs text-gray-500">
                        Postado em 10/10/2021
                      </span>
                    </span>
                  </div>
                  {/* <div className="flex gap-1">
                  <span className="inline-flex items-center rounded-md bg-blue-500 px-2 py-1 text-xs font-normal text-white ring-1 ring-inset ring-blue-600/10">
                    Casa
                  </span>
                  <span className="inline-flex items-center rounded-md bg-orange-500 px-2 py-1 text-xs font-normal text-white ring-1 ring-inset ring-orange-600/10">
                    Aluguel
                  </span>
                </div> */}
                </div>
              </div>
              <div className="flex flex-col pl-7">
                <div className="flex divide-x gap-7">
                  <span className="text-xs font-light text-gray-500 flex flex-col items-center justify-center">
                    <span className="text-lg font-semibold text-black/90">
                      100
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
