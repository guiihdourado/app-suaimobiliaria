import React from 'react'
import { Button } from '../Button'

interface StepFooterProps {
  steppersNumber: number
  stepCurrentNumber: number
  setStepCurrentNumber: React.Dispatch<React.SetStateAction<number>>
  handleFinish?: () => void
}

const StepFooter: React.FC<StepFooterProps> = ({
  stepCurrentNumber,
  steppersNumber,
  setStepCurrentNumber,
  handleFinish,
}) => {
  return (
    <div className="w-full flex p-4 bg-[#F3F7F8]">
      <div className="w-80 flex gap-4 ml-auto">
        <Button
          onClick={() => setStepCurrentNumber(stepCurrentNumber - 1)}
          disabled={stepCurrentNumber === 1}
          typeButton="secondary"
        >
          {'Anterior'}
        </Button>
        <Button
          onClick={() => {
            if (stepCurrentNumber === steppersNumber) {
              handleFinish && handleFinish()
            } else {
              setStepCurrentNumber(stepCurrentNumber + 1)
            }
          }}
        >
          {stepCurrentNumber === steppersNumber ? 'Finalizar' : 'Próximo'}
        </Button>
      </div>
    </div>
  )
}

export { StepFooter }
