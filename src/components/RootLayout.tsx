import React from 'react'

import { Sidebar } from '@/components'

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full">
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export { RootLayout }
