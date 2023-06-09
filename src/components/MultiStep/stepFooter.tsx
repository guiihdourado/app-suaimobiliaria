import React, { useCallback } from 'react'
import { Button } from '../Button'
import { RiArrowLeftSLine } from 'react-icons/ri'
import * as Yup from 'yup'

interface StepFooterProps {
  steppersNumber: number
  stepCurrentNumber: number
  setStepCurrentNumber: (stepNumber: number) => void
  currentStepSchema: Yup.ObjectSchema<any> | undefined
  currentStepValidation: any
  setError: any
  handleFinish: () => void
  clearErrors: any
  isLoading?: boolean
}

const StepFooter: React.FC<StepFooterProps> = ({
  stepCurrentNumber,
  steppersNumber,
  setStepCurrentNumber,
  currentStepValidation,
  currentStepSchema,
  setError,
  handleFinish,
  clearErrors,
  isLoading
}) => {
  const isLastStep = stepCurrentNumber === steppersNumber

  const handleBack = () => {
    setStepCurrentNumber(stepCurrentNumber - 1)
  }

  const handleSaveAndExit = () => {
    // Implementar ação de salvar e sair
  }

  const handleNext = useCallback(() => {
    if (currentStepSchema) {
      currentStepSchema
        .validate(currentStepValidation, { abortEarly: false })
        .then(() => {
          clearErrors()
          if (isLastStep) {
            handleFinish()
          }
          if (!isLastStep) {
            setStepCurrentNumber(stepCurrentNumber + 1)
          }
          window.scrollTo(0, 0);
        })
        .catch((error: Yup.ValidationError) => {          
          error.inner.forEach((e: any) => {
            const fieldName = e.path.split('.')[0]
            setError(fieldName, { message: e.message })
          })
        })
    } else {
      setStepCurrentNumber(stepCurrentNumber + 1)
    }
  }, [currentStepSchema, setError, setStepCurrentNumber, stepCurrentNumber, currentStepValidation])

  return (
    <div className="w-full flex py-4 px-10 bg-[#F3F7F8] justify-center">
      <div className="w-full flex justify-between items-center">
        <div>
          <Button
            onClick={handleBack}
            disabled={stepCurrentNumber === 1}
            typeButton="tertiary"
          >
            <RiArrowLeftSLine size={24} />
            Voltar
          </Button>
        </div>
        <div className="flex gap-4 w-1/5">
          <Button
            onClick={handleSaveAndExit}
            disabled={stepCurrentNumber === 1}
            typeButton="secondary"
          >
            Salvar e sair
          </Button>
          <Button onClick={handleNext} isLoading={isLoading}>
            {isLastStep ? 'Finalizar' : 'Próximo'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export { StepFooter }