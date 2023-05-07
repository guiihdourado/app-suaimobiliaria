import {
  RiDashboardFill,
  RiLogoutCircleLine,
  RiCommunityFill,
} from 'react-icons/ri'

import { ButtonLink } from '@/components'

import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

import { useAuth } from '@/providers/AuthProvider'

export function SidebarNav() {
  const { logout } = useAuth()

  return (
    <div className="flex flex-col gap-10 mt-6">
      <NavSection title="GERAL">
        <NavLink href="/" shouldMatchExactHref icon={RiDashboardFill}>
          Dashboard
        </NavLink>
        <NavLink href="/properties" icon={RiCommunityFill}>
          Imóveis
        </NavLink>
      </NavSection>
      <NavSection title="CONFIGURAÇÃO">
        <ButtonLink
          onClick={() => {
            logout()
          }}
          icon={RiLogoutCircleLine}
        >
          Sair
        </ButtonLink>
      </NavSection>
    </div>
  )
}
