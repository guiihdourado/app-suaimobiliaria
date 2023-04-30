import React, { useMemo } from 'react'
import classNames from 'classnames'
import { StepperProps } from '.'

interface NumbersStepsProps {
  steppers: StepperProps[]
  stepCurrentNumber: number
}

const StepHeader: React.FC<NumbersStepsProps> = ({
  stepCurrentNumber,
  steppers,
}) => {
  const arraySteppersNumber = useMemo(() => {
    return Array.from({ length: steppers.length }, (_, i) => i)
  }, [steppers])

  return (
    <div className="flex justify-center items-center p-4 shadow">
      {arraySteppersNumber.map((stepNumber) => {
        return (
          <div
            key={stepNumber}
            className={classNames(
              'flex items-center justify-between text-sky-600',
              {
                'w-full after:w-full after:h-1 after:border-b after:border-sky-100 after:border-4 after:inline-block':
                  stepNumber !== steppers.length - 1,
                'after:border-sky-800': stepNumber + 1 < stepCurrentNumber,
              },
            )}
          >
            <span
              className={classNames(
                'flex items-center justify-center w-10 h-10 bg-sky-100 rounded-full lg:h-12 lg:w-12  shrink-0 text-white',
                {
                  'bg-sky-800': stepNumber < stepCurrentNumber,
                },
              )}
            >
              {stepNumber + 1}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export { StepHeader }
