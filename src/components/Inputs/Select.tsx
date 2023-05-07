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
    height: '48px',
    borderRadius: '12px',
    boxShadow: null,
    borderColor: isFocused ? '#0369A1' : '#E0E0E0',
    '&:hover': {
      borderColor: '#0369A1',
    },
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    height: '48px',
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
    height: '48px',
  }),
  menu: (styles: any) => ({
    ...styles,
    borderRadius: '12px',
    marginTop: '4px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  }),
  menuList: (styles: any) => ({
    ...styles,
    padding: '0px',
    '::-webkit-scrollbar': {
      width: '5px',
      borderWidth: '5px',
      height: '5px',
    },
    '::-webkit-scrollbar-track-piece': {
      backgroundColor: 'transparent',
      borderColor: '#ffffff',
      borderWidth: '2px 2px 2px 2px',
      borderStyle: 'solid',
    },
    '::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      backgroundColor: ' #c5c5c5',
      borderColor: '#c5c5c5',
      borderStyle: 'solid',
      borderWidth: '1px 8px 1px 8px',
    },
  }),

  option: (styles: any, { isDisabled, isSelected }: any) => {
    return {
      ...styles,
      borderRadius: '12px',
      height: '44px',
      display: 'flex',
      backgroundColor: isSelected ? '#0369A1' : 'white',
      color: isSelected ? 'white' : 'black',
      cursor: isDisabled ? 'not-allowed' : 'default',
      '&:hover': {
        backgroundColor: '#0284C7',
        color: 'white',
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
