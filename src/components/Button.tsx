import React, { ButtonHTMLAttributes } from 'react'
import { SpinnerLoading } from './SpinnerLoading'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isLoading?: boolean
  typeButton?: 'primary' | 'secondary' | 'tertiary'
}

const baseButton =
  'w-full px-4 h-12 rounded-xl  duration-300  flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'

const customButton = {
  primary: 'bg-sky-600 hover:bg-sky-700 text-white',
  secondary:
    'bg-white hover:bg-gray-100 text-sky-600 border border-sky-600 font-semibold',
  tertiary: 'bg-transparent hover:bg-gray-100 text-sky-600 font-semibold',
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  typeButton = 'primary',
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={`${baseButton} ${customButton[typeButton]}`}
    >
      {isLoading ? <SpinnerLoading /> : children}
    </button>
  )
}

export { Button }
