import React, { useCallback } from 'react'
import { useController } from 'react-hook-form'

interface NumberInputProps {
  name: string
  label: string
  control: any
  isRequired?: boolean
  min?: number
  max?: number
}

const buttonStyle =
  'flex bg-gray-200 py-1 px-3 border border-gray-200 hover:bg-gray-300 transition-all duration-300 rounded-lg'

const NumberInput: React.FC<NumberInputProps> = ({
  name,
  label,
  control,
  isRequired,
  min,
  max,
}) => {
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { required: isRequired, min, max },
    defaultValue: 0,
  })

  const handleIncrement = useCallback(
    () => onChange(Number(value) + 1),
    [onChange, value],
  )

  const handleDecrement = useCallback(
    () => onChange(Number(value) - 1),
    [onChange, value],
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value
      const numericValue = inputValue.replace(/[^0-9]/g, '')
      onChange(numericValue)
    },
    [onChange],
  )

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-medium text-gray-500">
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div className="w-40 flex border border-solid rounded-xl p-[0.125rem]">
        <button type="button" onClick={handleDecrement} className={buttonStyle}>
          -
        </button>
        <input
          type="text"
          id={name}
          name={name}
          ref={ref}
          value={value}
          onChange={handleInputChange}
          onBlur={onBlur}
          className={`border-none focus:outline-0 w-full text-center`}
        />
        <button type="button" onClick={handleIncrement} className={buttonStyle}>
          +
        </button>
      </div>
      {invalid ? (
        <span className="text-red-500 text-sm">Este campo é obrigatório.</span>
      ) : null}
      {error ? (
        <span className="text-red-500 text-sm">{error.message}</span>
      ) : null}
    </div>
  )
}

export { NumberInput }
