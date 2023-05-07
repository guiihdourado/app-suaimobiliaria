import { ElementType, useMemo } from 'react'

import { useRouter } from 'next/router'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import classNames from 'classnames'

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
      className={classNames(
        'flex items-center p-4 hover:bg-sky-600 hover:text-white text-black/80',
        {
          'bg-sky-700 text-white hover:bg-sky-700': isActive,
        },
      )}
      href={href}
      {...rest}
    >
      <Icon fontSize="20" />
      <span className="ml-4 font-medium">{children}</span>
    </NextLink>
  )
}
