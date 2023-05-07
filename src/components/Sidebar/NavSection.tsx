import { ReactNode } from 'react'

type NavSectionProps = {
  title: string
  children: ReactNode
}
// text-[#9fb7bd]
export function NavSection({ title, children }: NavSectionProps) {
  return (
    <div>
      <span className="font-bold text-sky-900 text-sm px-4">{title}</span>
      <div className="flex flex-col items-stretch mt-6">{children}</div>
    </div>
  )
}
