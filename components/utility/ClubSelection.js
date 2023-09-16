import * as React from 'react';
import {StyledTextField,StyledBox,StyledAutocomplete} from './StyledComponents'


export default function ClubSelection({ clubs,value, setValue }) {
  return (
    <StyledAutocomplete
      value={value}
      onChange={(event, newValue) => setValue(event, newValue)}
      size='small'
      id="Nationality-Select"
      options={clubs} fullWidth
      autoHighlight
      getOptionLabel={(option) => option.club}
      renderOption={(props, option) => (
        <StyledBox component="li"   {...props}>
          {option.club}
        </StyledBox>
      )}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
          }}
        />
      )}
    />
  );
}

