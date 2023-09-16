import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Autocomplete, Box, InputLabel, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';


const StyledFormControl = styled(FormControl)({

  '& label.Mui-focused': {
    borderColor: 'black',
    borderWidth: '1px',
    borderRadius: '8px'
  },
  '& .MuiInput-underline:after': {
    borderColor: 'black',
    borderWidth: '1px',
    borderRadius: '8px'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      '& label.Mui-focused': {
        borderColor: 'black',
        borderWidth: '1px',
        borderRadius: '5px',

      },
    },
    '&:hover fieldset': {
      borderColor: 'black',
      borderWidth: '1px',
      borderRadius: '8px'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
      borderWidth: '1px',
      borderRadius: '8px',


    },
  },
});


const StyledTextField = styled(TextField)({

  '& label.Mui-focused': {
    borderColor: 'black',
    borderWidth: '1px',
    borderRadius: '8px',

  },
  '& .MuiInput-underline:after': {
    borderColor: 'black',
    borderWidth: '1px',
    borderRadius: '8px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
      borderWidth: '1px',
      borderRadius: '8px',
    },
    '&:hover fieldset': {
      borderColor: 'black',
      borderWidth: '1px',
      borderRadius: '8px',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
      borderWidth: '1px',
      borderRadius: '8px'

    },
  },
});

const stl = {
  '& label.Mui-focused': {
    borderColor: 'black',
    borderWidth: '1px',
    borderRadius: '8px'
  },
  '& label.Mui-': {

    borderColor: 'black',
    borderWidth: '1px',
    borderRadius: '8px'
  },
  '& .MuiInput-underline:after': {
    borderColor: 'black',
    borderWidth: '1px',
    borderRadius: '8px'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      '& label.Mui-focused': {
        borderColor: 'black',
        borderWidth: '1px',
        borderRadius: '5px',

      },

      '& label.Mui-': {
        borderColor: 'black',
        borderWidth: '1px',
        borderRadius: '5px',

      },
    },
    '&:hover fieldset': {
      borderColor: 'black',
      borderWidth: '1px',
      borderRadius: '8px'
    },
    '& fieldset': {

      borderWidth: '1px',
      borderRadius: '8px'
    },
    '&.Mui-fieldset': {
      borderColor: 'black',
      borderWidth: '1px',
      borderRadius: '8px'

    },
  },
}
const StyledAutocomplete = styled(Autocomplete)(stl);
const StyledBox = styled(Box)(stl);

export { StyledFormControl, StyledTextField, StyledBox, StyledAutocomplete }