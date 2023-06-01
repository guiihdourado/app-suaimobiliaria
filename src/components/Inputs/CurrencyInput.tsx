import classNames from 'classnames'
import React from 'react'
import { Controller } from 'react-hook-form'
import IntlCurrencyInput from 'react-intl-currency-input'

interface CurrencyInputProps {
  name: string
  currency: string
  label: string
  control: any
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  name,
  currency,
  label,
  control,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState }) => {
        const { errors } = formState
        const errorMessage = errors[name]?.message
        const isError = !!errorMessage

        return (
          <div className="flex flex-col gap-1">
            <label htmlFor={name} className="font-medium text-gray-500">
              {label}
            </label>
            <div
              className={classNames(
                'flex gap-2 border border-gray-400 rounded-xl p-2',
                {
                  'border-red-500': isError,
                },
              )}
            >
              <span className="bg-gray-200">{currency}</span>
              <IntlCurrencyInput
                value={field.value}
                onChange={(_, value, __) => field.onChange(value)}
                currency={currency}
                config={{
                  locale: 'pt-BR',
                  formats: {
                    number: {
                      [currency]: {
                        style: 'currency',
                        currency,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    },
                  },
                }}
                max={999999999.99}
                defaultValue={0}
              />
            </div>

            {isError && (
              <span className="text-red-500 text-sm font-bold">
                {errorMessage as string}
              </span>
            )}
          </div>
        )
      }}
    />
  )
}

export { CurrencyInput }
