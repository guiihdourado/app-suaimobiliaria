import { ReactNode } from 'react'

type NavSectionProps = {
  title: string
  children: ReactNode
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <div>
      <span className="font-bold text-gray-400 text-sm">{title}</span>
      <div className="flex flex-col items-stretch gap-4 mt-6">{children}</div>
    </div>
  )
}
