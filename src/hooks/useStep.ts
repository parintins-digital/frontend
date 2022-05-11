import {useState} from 'react'

export function useStep(initialStep: number, lastStep: number) {
  const [step, setStep] = useState(initialStep)

  function getStep(): number {
    return step
  }

  function resetStep() {
    setStep(initialStep)
  }

  function nextStep() {
    if (step + 1 <= lastStep) {
      setStep(step + 1)
    }
  }

  function backStep() {
    if (step - 1 >= initialStep) {
      setStep(step - 1)
    }
  }

  return {
    getStep,
    nextStep,
    backStep,
    resetStep,
  }
}
