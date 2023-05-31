import React from 'react'
import { Button } from '../Button'
import { RiArrowLeftSLine } from 'react-icons/ri'

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
    <div className="w-full flex py-4 px-10 bg-[#F3F7F8] justify-center">
      <div className="w-full flex justify-between items-center">
        <div>
          <Button
            onClick={() => setStepCurrentNumber(stepCurrentNumber - 1)}
            disabled={stepCurrentNumber === 1}
            typeButton="tertiary"
          >
            <RiArrowLeftSLine size={24} />
            Voltar
          </Button>
        </div>
        <div className="flex gap-4 w-1/5">
          <Button
            onClick={() => {}}
            disabled={stepCurrentNumber === 1}
            typeButton="secondary"
          >
            Salvar e sair
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
    </div>
  )
}

export { StepFooter }
