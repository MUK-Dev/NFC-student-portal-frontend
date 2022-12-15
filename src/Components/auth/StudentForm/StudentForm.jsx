import { useRef } from 'react';
import { Stack, Step, StepButton, Stepper } from '@mui/material';
import { motion } from 'framer-motion';

import useStepper from '../../../Hooks/useStepper';
import StudentForm1 from './StudentFormStep1';
import StudentForm2 from './StudentFormStep2';
import StudentForm3 from './StudentFormStep3';

const StudentForm = ({ animation }) => {
  const firstTimeAnimation = useRef(true);
  const { handleComplete, handleReset, handleBack, steps, activeStep } =
    useStepper(firstTimeAnimation);

  return (
    <Stack
      key='Student'
      component={motion.div}
      variants={animation}
      initial='initial'
      animate='animate'
      exit='exit'
      width='100%'
      alignItems='center'
    >
      <Stepper activeStep={activeStep} sx={{ margin: '1.5em 0', width: '90%' }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color='inherit' />
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <StudentForm1
          reset={handleReset}
          handleNext={handleComplete}
          animation={firstTimeAnimation.current && animation}
        />
      )}
      {activeStep === 1 && (
        <StudentForm2 handleNext={handleComplete} handleBack={handleBack} />
      )}

      {activeStep === 2 && <StudentForm3 handleBack={handleBack} />}
    </Stack>
  );
};

export default StudentForm;
