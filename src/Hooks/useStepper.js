import { useState } from 'react'

export default function useStepper(firstTimeAnimation) {
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})
  const steps = ['Step 1', 'Step 2', 'Step 3']

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    firstTimeAnimation.current = false
    setActiveStep(0)
    setCompleted({})
  }

  const handleComplete = () => {
    firstTimeAnimation.current = false
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    handleNext()
  }

  return {
    handleComplete,
    handleReset,
    handleBack,
    steps,
    completed,
    activeStep,
  }
}
