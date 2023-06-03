import React, { useMemo, useState, useCallback } from 'react'
import { StepFooter } from './stepFooter'
import { StepHeader } from './stepHeader'
import * as Yup from 'yup'

export type StepperProps = {
  step: JSX.Element
  stepNumber: number
  stepTitle: string
  schema: Yup.ObjectSchema<any>
  validation: any
}

interface MultiStepProps {
  steppers: StepperProps[]
  handleFinish: () => void
  title?: string
  setError?: any
  clearErrors?: any
  isLoading?: boolean
}

const MultiStep: React.FC<MultiStepProps> = ({
  steppers,
  handleFinish,
  setError,
  title,
  clearErrors,
  isLoading
}) => {
  const [stepCurrentNumber, setStepCurrentNumber] = useState(1)

  const stepCurrent = useMemo(() => {
    const step = steppers.find((step) => step.stepNumber === stepCurrentNumber)
    return step?.step
  }, [stepCurrentNumber, steppers])

  const stepTitle = steppers.find(
    (step) => step.stepNumber === stepCurrentNumber,
  )?.stepTitle

  return (
    <div className="w-full flex flex-col gap-12">
      <StepHeader steppers={steppers} stepCurrentNumber={stepCurrentNumber} />
      <div className="w-full h-full flex flex-col justify-start items-center p-8 overflow-auto scrollbar-imob">
        <div className="w-full h-fit flex flex-col">
          <div className="mb-2">
            {title ? (
              <span className="font-semibold pb-4 ">{title} - </span>
            ) : null}
            <span className="font-semibold pb-4 text-sky-600 text-lg">
              {' '}
              {stepTitle}
            </span>
          </div>
          <div className="flex flex-col shadow-xl rounded-xl mb-8">
            <div className="p-10">{stepCurrent}</div>
            <StepFooter
              setStepCurrentNumber={setStepCurrentNumber}
              stepCurrentNumber={stepCurrentNumber}
              steppersNumber={steppers.length}
              currentStepSchema={steppers[stepCurrentNumber - 1]?.schema} 
              currentStepValidation={steppers[stepCurrentNumber - 1]?.validation}
              setError={setError}
              handleFinish={handleFinish}
              clearErrors={clearErrors}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { MultiStep }