import { ReactElement, useState } from 'react'
const useMultistep = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const next = () => {
    setCurrentStepIndex((prev) => {
      if (prev >= steps.length) {
        return prev
      }
      return prev + 1
    })
  }
  const back = () => {
    setCurrentStepIndex((prev) => {
      if (prev <= 0) {
        return prev
      }
      return prev - 1
    })
  }
  const goto = (index: number) => {
    setCurrentStepIndex(index)
  }
  const isFirstStep = ():boolean => currentStepIndex === 0

  const isLastStep = () => currentStepIndex === steps.length - 1
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    isFirstStep,
    isLastStep,
    next,
    back,
    goto,
  }
}
export default useMultistep
