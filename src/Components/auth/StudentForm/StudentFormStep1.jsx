/* eslint-disable no-unused-vars */
import {
  Divider,
  IconButton,
  Stack,
  TextField,
  Button,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const StudentForm1 = ({ animation, handleNext, reset }) => {
  const theme = useTheme();
  const [_, setSearchParams] = useSearchParams();
  const arrowAnimation = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      width='100%'
      component={motion.div}
      key='StudentForm'
      variants={animation}
      initial='initial'
      animate='animate'
      exit='exit'
      sx={{ position: 'relative' }}
    >
      <Typography variant='h5' gutterBottom>
        Enter University Information
      </Typography>
      <Divider
        sx={{
          background: theme.palette.primary.main,
          height: '4px',
          width: '25%',
          borderRadius: '50px',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1em',
        }}
      />
      <Stack gap='1em' padding='1em' width='100%'>
        <Stack
          direction='row'
          alignItems='center'
          sx={{ width: '100%', gap: '1em' }}
        >
          <TextField
            variant='outlined'
            label='Session'
            type='text'
            placeholder='eg. 2k19'
            fullWidth
          />
          <TextField
            variant='outlined'
            label='Program'
            type='text'
            placeholder='eg. BSCS'
            fullWidth
          />
        </Stack>

        <Stack
          direction='row'
          alignItems='center'
          sx={{ width: '100%', gap: '1em' }}
        >
          <TextField
            variant='outlined'
            label='Class Roll No.'
            type='number'
            placeholder='eg. 301'
            fullWidth
          />
          <TextField
            variant='outlined'
            label='Section'
            type='text'
            placeholder='eg. Red'
            fullWidth
          />
        </Stack>
      </Stack>
      <motion.div
        key='ArrowBack1'
        variants={arrowAnimation}
        initial='initial'
        animate='animate'
        exit='exit'
      >
        <IconButton
          color='primary'
          sx={{ position: 'absolute', top: -140, left: 10 }}
          onClick={() => {
            reset();
            setSearchParams({ role: null });
          }}
        >
          <ArrowBackIos />
        </IconButton>
      </motion.div>

      <Button
        variant='contained'
        endIcon={<ArrowForwardIos />}
        onClick={handleNext}
      >
        Next
      </Button>
    </Stack>
  );
};

export default StudentForm1;
