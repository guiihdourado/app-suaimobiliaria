import { ElementType, useMemo } from 'react'

import { useRouter } from 'next/router'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

type NavLinkProps = NextLinkProps & {
  icon: ElementType
  href: string
  children: string
  shouldMatchExactHref?: boolean
}

export function NavLink({
  icon: Icon,
  href,
  children,
  shouldMatchExactHref = false,
  ...rest
}: NavLinkProps) {
  const { asPath } = useRouter()

  const isActive = useMemo(() => {
    if (shouldMatchExactHref && (asPath === href || asPath === rest.as)) {
      return true
    }

    if (
      !shouldMatchExactHref &&
      (asPath.startsWith(href.toString()) ||
        (rest.as && asPath.startsWith(rest.as?.toString())))
    ) {
      return true
    }

    return false
  }, [asPath, href, rest.as, shouldMatchExactHref])

  return (
    <NextLink
      className={`flex items-center ${
        isActive ? 'text-sky-600' : 'text-black/80'
      } hover:underline`}
      href={href}
      {...rest}
    >
      <Icon fontSize="20" />
      <span className="ml-4 font-medium">{children}</span>
    </NextLink>
  )
}
