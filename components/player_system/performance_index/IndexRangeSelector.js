import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CssBaseline, Grid } from '@mui/material';

const PrettoSlider = styled(Slider)({
    color: '#2e7d32',
    height: 5,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 15,
        width: 15,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 20,
        height: 20,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#52af77',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});

//range selector for system finding parameters
export default function IndexRangeSelector({ index, item, value, handlehangeValue }) {
    return (
        <Grid id={item.name} key={item.name + index} 
        sx={{
            px:2,my:1
        }}
            xs={6} sm={4} md={3} item container alignItems="center" >
            <Typography gutterBottom sx={{
                direction: 'ltr',
                fontFamily: 'Gilroy-Regular'
            }} dir='ltr' >{item.label}   {value}</Typography>
            <input name={item.name} type="range"
                id={item.name} value={value}
                style={{
                    width: '100%', 
                    height:'5px'
                }}
                min="1" max="9"
                onChange={e => handlehangeValue(e)}
            />

            {/* 




*/}
        </Grid>
    );
}