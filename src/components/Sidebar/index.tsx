import Image from 'next/image'

import logo from '@/assets/logo.svg'

import { SidebarNav } from './SidebarNav'

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-100 flex justify-between flex-col flex-start py-5">
      <div className=" flex flex-col flex-start w-full">
        <div className="w-full pt-2 pb-5 flex items-center justify-center">
          <Image src={logo} alt="Logo" className="w-44" />
        </div>
        <SidebarNav />
      </div>

      <div className="flex flex-col w-full px-6 gap-5">
        <hr className="border border-gray-200" />

        <div className="w-full gap-4 flex items-center justify-center">
          <Image
            className="rounded-full"
            width={48}
            height={48}
            alt="Avatar"
            src="https://avatars.githubusercontent.com/u/8441209?v=4"
          />
          <div className="text-left">
            <p className="font-semibold text-black/80 text-sm">
              Guilherme Dourado
            </p>
            <span className="text-black/70 text-xs">
              guiihdourado@gmail.com
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
