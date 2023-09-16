import React, { useState } from 'react';
import {
    Button, Grid,
    IconButton, Typography,
    Paper,
    Slide,
    Dialog,
    DialogTitle,
    Divider, Fade,
    DialogContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


function PaperComponent(props) {
    return (<Paper sx={{ borderRadius: 2.5 }}   {...props} />);
}

const FadeTransition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});

// A dialog for use any where
export default function ResultDialog(props) {
    const { show, setShow } = props
    return (
        <>
            <Dialog open={show}
                TransitionComponent={FadeTransition}
                onClose={() => setShow(false)}
                PaperComponent={PaperComponent}
                transitionDuration={{ appear: 500, enter: 500, exit: 500, }}
                maxWidth='md' fullWidth hideBackdrop
            >
                <DialogTitle
                    sx={{ bgcolor: '#EDF0F3', py: 1 }}
                >
                    <Grid xs={12} item container sx={{ bgcolor: '#EDF0F3' }}
                        direction="row"
                        justifyContent="space-between" alignItems="center"
                    >

                        <Grid item xs={10}
                        >
                            <Typography component="h5" fontWeight={600} variant="body1" >
                                Result
                            </Typography>
                        </Grid>
                        <Grid item xs={1} container justifyContent="flex-end" >
                            <IconButton
                                aria-label="close" color='error'
                                onClick={() => setShow(false)}
                            >
                                <CloseIcon fontSize='small' />
                            </IconButton>
                        </Grid>

                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ bgcolor: 'primary', }}>
                    {props.children}
                </DialogContent>
            </Dialog>
        </>
    )
}
