import React from 'react'

import { Sidebar } from '@/components'

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-full flex scrollbar-imob">
        <Sidebar />
        <div className="flex flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}

export { RootLayout }
