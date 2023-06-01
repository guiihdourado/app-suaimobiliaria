import React, { InputHTMLAttributes, forwardRef } from 'react'
import classnames from 'classnames'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  errorMessage?: string
  isRequired?: boolean
}

const baseInput =
  'h-12 w-full border border-solid hover:border-sky-700 focus:outline-0 rounded-xl px-4 transition-all duration-300'

const InputComponent = (
  { label, errorMessage, isRequired, ...inputProps }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
): JSX.Element => {
  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        {label && <label className="text-sm font-bold mb-1">{label}
        {isRequired && <span className="text-red-500">*</span>}
        </label>}

        {!!errorMessage && <span className="text-red-500 text-sm font-bold">{errorMessage}</span>}
      </div>
      <input
        {...inputProps}
        className={classnames(baseInput, {
          'border-red-500 hover:border-red-500': !!errorMessage,
          'border-gray-300 hover:border-blue-500 focus:border-blue-500':
            !errorMessage,
        })}
        ref={ref}
      />
    </div>
  )
}

const Input = forwardRef(InputComponent)

export { Input }
