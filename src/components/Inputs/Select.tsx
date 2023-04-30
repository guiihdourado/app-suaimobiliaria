import React, { CSSProperties, forwardRef } from 'react'
import { Controller, Control } from 'react-hook-form'
import ReactSelect, { Props, OptionTypeBase } from 'react-select'

type Options = {
  label: string
  value: string
  icon: any
}

export type SelectProps = Props<OptionTypeBase, boolean> & {
  label?: string
  subLabel?: string
  block?: boolean
  isRequired?: boolean
  control: Control<any, object>
  name: string
  icon?: any
  containerStyle?: CSSProperties
  onChange?: (e: any) => void
  options?: Options
}

const customStyles = {
  control: (styles: any, { isFocused }: any) => ({
    ...styles,
    minHeight: '32px',
    height: 'fit-content',
    borderRadius: '2px',
    boxShadow: null,
    borderColor: isFocused ? '#151b26' : '#E0E0E0',
    '&:hover': {
      borderColor: '#151b26',
    },
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    height: 'fit-content',
    padding: '0 6px',
  }),

  input: (styles: any) => ({
    ...styles,
    margin: '0px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (styles: any) => ({
    ...styles,
    height: '32px',
  }),
  option: (styles: any, { isDisabled, isSelected }: any) => {
    return {
      ...styles,
      height: '32px',
      display: 'flex',
      backgroundColor: isSelected ? '#F5F5F5' : 'white',
      color: 'black',
      cursor: isDisabled ? 'not-allowed' : 'default',
      '&:hover': {
        backgroundColor: '#F5F5F5',
      },
    }
  },
}

const Select = (
  {
    label,
    block,
    isRequired,
    control,
    name,
    options,
    containerStyle,
    onChange,
    subLabel,
    ...restProps
  }: SelectProps,
  ref: any,
): JSX.Element => {
  return (
    <div>
      {label && <label className="text-sm font-bold mb-1">{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field, formState }) => {
          const { errors } = formState
          const errorMessage = errors[name]?.message
          const isError = !!errorMessage

          return (
            <>
              <ReactSelect
                block={block}
                error={isError}
                options={options}
                ref={ref}
                {...restProps}
                styles={customStyles}
                onChange={(e: any) => {
                  field.onChange(e)
                  onChange && onChange(e)
                }}
              />
              {isError && (
                <span className="text-[#ff0000] text-sm">
                  {errorMessage as any}
                </span>
              )}
            </>
          )
        }}
      />
    </div>
  )
}

export default forwardRef(Select)
