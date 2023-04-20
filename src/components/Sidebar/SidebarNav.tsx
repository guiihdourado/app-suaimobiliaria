import {
  RiDashboardFill,
  RiLogoutCircleLine,
  RiCommunityFill,
} from 'react-icons/ri'

import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

// import { useAuth } from '@/providers/AuthProvider'

export function SidebarNav() {
  // const { logout } = useAuth()

  return (
    <div className="flex flex-col pl-8 gap-10 mt-6">
      <NavSection title="GERAL">
        <NavLink href="/" shouldMatchExactHref icon={RiDashboardFill}>
          Dashboard
        </NavLink>
        <NavLink href="/properties" icon={RiCommunityFill}>
          Imóveis
        </NavLink>
      </NavSection>
      <NavSection title="CONFIGURAÇÃO">
        <NavLink href="#" icon={RiLogoutCircleLine}>
          Sair
        </NavLink>
      </NavSection>
    </div>
  )
}
