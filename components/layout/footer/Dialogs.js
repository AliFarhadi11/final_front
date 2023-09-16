import React from 'react';
import {
    Grid,
    IconButton, Typography,
    Paper,
    Slide,
    Dialog,
    DialogTitle,
    Divider, DialogContent, useMediaQuery,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles'
import TermofUse from './TermofUse';
import FAQ from './FAQ';
import PrivacyPolicy from './PrivacyPolicy';



function PaperComponent(props) {
    return (<Paper sx={{ borderRadius: 2.5, bgcolor: 'white' }}   {...props} />);
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Dialogs = ({ mode, show, setShow }) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <>
            <Dialog open={show}
                TransitionComponent={Transition}
                onClose={() => setShow(false)}
                PaperComponent={PaperComponent}
                transitionDuration={{ appear: 500, enter: 500, exit: 500, }}
                // fullScreen
                maxWidth='lg'
                fullWidth
                hideBackdrop fullScreen={fullScreen}
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
                                {mode}
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
                <DialogContent sx={{ bgcolor: 'primary' }}
                >

                    {mode == 'Term of Use' &&
                        < TermofUse />
                    }

                    {mode == 'Privacy Policy' &&
                        < PrivacyPolicy />
                    }

                    {mode == 'FAQ' &&
                        < FAQ />
                    }

                </DialogContent>
            </Dialog>
        </>
    )
}
export default Dialogs