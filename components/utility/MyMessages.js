import React from 'react';
import {
    Grid,
    IconButton, Typography,
    Paper,
    Slide,
    Dialog,
    DialogTitle,
    Divider, DialogContent, useMediaQuery, Fade,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles'
import { addContorlers } from '../../redux/reducers';



function PaperComponent(props) {
    return (<Paper sx={{ borderRadius: 2.5, }}   {...props} />);
}
const FadeTransition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});
const SlideTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MyMessages = (props) => {
    const contorlers = useSelector((state) => state.contorlers.value)

    return (
        <>
            <Dialog open={props.showMessage}
                TransitionComponent={props.transition === 's' ? SlideTransition : FadeTransition}
                onClose={() => props.setShowMessage(false)}
                PaperComponent={PaperComponent}
                transitionDuration={{ appear: 500, enter: 500, exit: 500, }}
                fullScreen={props.full_screen}
                maxWidth={props.max_width}
                fullWidth
                hideBackdrop={props.hide_backdrop}
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
                                {props.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} container justifyContent="flex-end" >
                            <IconButton
                                aria-label="close" color='error'
                                onClick={() => props.setShowMessage(false)}
                            >
                                <CloseIcon fontSize='small' />
                            </IconButton>
                        </Grid>

                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent dir={contorlers.lang === 'fa' ? 'rtl' : 'ltr'} >
                    {props.children}
                </DialogContent>
            </Dialog>
        </>
    )
}

MyMessages.defaultProps = {
    transition: 'f',
    max_width: 'sm',
    full_screen: false,
    hide_backdrop: true,
    title: '',
    showMessage: false,

}

export default MyMessages