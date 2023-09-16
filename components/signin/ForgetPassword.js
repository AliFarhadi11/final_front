import React, { useState } from 'react';
import { Button, Grid, Slide, Paper, useMediaQuery, Typography, Link } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import Dialog from '@mui/material/Dialog';
import ResetPassword from './ResetPassword';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux';

function PaperComponent(props) {
    return (<Paper sx={{ borderRadius: 2.5 }}   {...props} />);
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function ForgetPassword() {
    const [show_dialog, setShow_dialog] = useState(false);
    const contorlers = useSelector((state) => state.contorlers.value)
    return (
        <>
            <Link underline="none" component="button"
                sx={{ fontFamily: contorlers.lang === 'fa' ? 'Yekan' : 'Gilroy-Medium' }}
                onClick={() => setShow_dialog(true)}
            >
                <FormattedMessage id='authentication.forget_password' />

            </Link>

            <Dialog open={show_dialog}
                TransitionComponent={Transition}
                onClose={() => setShow_dialog(false)}
                PaperComponent={PaperComponent}
                transitionDuration={{ appear: 500, enter: 500, exit: 500, }}
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle
                    sx={{ bgcolor: '#E0E3EB', py: 1 }}
                >
                    <Grid xs={12} item container sx={{ bgcolor: '#E0E3EB' }}
                        direction="row"
                        justifyContent="space-between" alignItems="center"
                    >
                        <Grid item xs={10}
                        >
                            <Typography component="h5" fontWeight={600} variant="body1" >
                                <FormattedMessage id='authentication.reset_password' />
                            </Typography>
                        </Grid>
                        <Grid item xs={1} container justifyContent="flex-end" >
                            <IconButton
                                aria-label="close" color='error'
                                onClick={() => setShow_dialog(false)}
                            >
                                <CloseIcon fontSize='small' />
                            </IconButton>
                        </Grid>

                    </Grid>
                </DialogTitle>
                <Grid container item direction="row" justifyContent="center" alignItems="center"
                    sx={{ padding: '0rem 2rem 2rem 2rem' }}
                >
                    <Grid xs={12} md={11} item
                        sx={{
                            mx: { sx: 1, sm: 2, md: 3 },
                            my: 3,
                        }}
                    >
                        <ResetPassword setShow_dialog={setShow_dialog} />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
}

