import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux'
import { addContorlers } from '../../redux/reducers';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//snake bar for handle all messages in site
// Colors can be set to one of these =>  error(red) , warning(orange) , info(blue) , success(green)  
// set color to => severity 
export default function SnackBar() {
  const dispatch = useDispatch()
  const contorlers = useSelector((state) => state.contorlers.value)

  const handleClose = (event, reason) => {
    dispatch(addContorlers({
      snackbar: {
        state: false,
        message: '',
        severity: 'info',
      }
    }))

  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={contorlers.snackbar.state} autoHideDuration={5000} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert onClose={handleClose} severity={contorlers.snackbar.severity} sx={{ width: '100%' }}>
          {contorlers.snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}


