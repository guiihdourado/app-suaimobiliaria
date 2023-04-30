import React, { ButtonHTMLAttributes } from 'react'

interface ButtonLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType
  children: string
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  icon: Icon,
  ...rest
}) => {
  return (
    <button
      className="bg-inherit hover:bg-inherit hover:underline p-0 mt-[-8px] flex items-center justify-start"
      {...rest}
    >
      {Icon && <Icon fontSize="20" />}
      <span className="ml-4 font-medium text-black/80">{children}</span>
    </button>
  )
}

export { ButtonLink }
