import React, {
  TextareaHTMLAttributes,
  useMemo,
  useState,
  forwardRef,
  useCallback,
} from 'react'
import classnames from 'classnames'

export type InputTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  typeInput?: 'rounded-full' | 'normal' | 'rounded'
  errorMessage?: string
  icon?: JSX.Element
  isRequired?: boolean
}

const baseTextArea =
  'flex flex-row transition duration-300 p-[10px] items-center justify-between w-full h-full border border-solid selection:bg-slate-1 selection:text-white-bee2pay font-Open-Sans w-full text-body3 focus:outline-none text-slate-2'

const InputTextAreaComponent = (
  {
    typeInput = 'normal',
    label,
    name,
    disabled,
    errorMessage,
    isRequired,
    onBlur,
    onFocus,
    ...props
  }: InputTextAreaProps,
  ref: React.ForwardedRef<HTMLInputElement>,
): JSX.Element => {
  const [hasFocus, setHasFocus] = useState(false)

  const isError = useMemo(() => !!errorMessage, [errorMessage])

  const handleOnFocus = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setHasFocus(true)
      onFocus && onFocus(event)
    },
    [onFocus],
  )

  const handleOnBlur = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setHasFocus(false)
      onBlur && onBlur(event)
    },
    [onBlur],
  )

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="font-Open-Sans text-slate-2 text-subtitle3"
        >
          {label}
          {isRequired && <span className="text-error">*</span>}
        </label>
      )}
      <textarea
        className={classnames(baseTextArea, {
          'border-slate-1': hasFocus,
          'rounded-full': typeInput === 'rounded-full',
          rounded: typeInput === 'rounded',
          'bg-slate-5 text-slate-1': disabled,
          'bg-white-bee2pay hover:border-slate-1': !disabled,
          'bg-slate-5 border-slate-4': disabled,
          'border-error hover:border-error': isError,
          'border-slate-4': !isError,
        })}
        rows={5}
        name={name}
        {...props}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={disabled}
        ref={ref}
      />
      {isError && <span className="text-body7 text-error">{errorMessage}</span>}
    </div>
  )
}

const InputTextArea = forwardRef(InputTextAreaComponent)

export { InputTextArea }
