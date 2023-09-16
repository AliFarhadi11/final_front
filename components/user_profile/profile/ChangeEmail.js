import React, { useState } from 'react';
import { Button, Grid, Slide, Paper,  Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles'
import Grid2 from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { requestSendEmailChangeLink } from '../../../request_services/UserService';
import { addContorlers } from '../../../redux/reducers';
import { isEmpty } from 'lodash';

function PaperComponent(props) {
    return (<Paper sx={{ borderRadius: 3,  }}   {...props} />);
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function ChangeEmail() {
    const theme = useTheme()
    const dispatch = useDispatch()
    const [show_dialog, setShow_dialog] = useState(false);
    const contorlers = useSelector((state) => state.contorlers.value)
    const user = useSelector((state) => state.user.value)

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("access_token")
            const { data, status } = await requestSendEmailChangeLink(token)
            if (status == 200) {
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message: <FormattedMessage id='alarms.email_link_send' />,
                        severity: 'success'
                    }
                }))
            }
        } 
        catch (error) {
            if (error.response.status === 429) {
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message: <FormattedMessage id='alarms.limitaion_request' />,
                        severity: 'error',
                    }
                }))
            }
            else if (error.response.status === 404) {
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message: <FormattedMessage id='alarms.not_found_user_email' />,
                        severity: 'error',
                    }
                }))
            }else{
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message: <FormattedMessage id='alarms.error_occurred' />,
                        severity: 'error',
                    }
                }))

            }
        }
    }

    return (
        <>
            <Grid2
                sx={{
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    py: 5,
                    px: { xs: 2, sm: 3, md: 5 },
                }}
                container item xs={12}
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                <Grid2 item  >
                    <Typography sx={{ fontWeight: 600, }}  ><FormattedMessage id='profile.change_email' />: </Typography>
                </Grid2>
                <Grid2 item  >
                    <Button type="button" variant="contained" onClick={() => setShow_dialog(true)} >
                        <FormattedMessage id='profile.change_email' />
                    </Button>
                </Grid2>
            </Grid2>

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
                                <FormattedMessage id='profile.change_email' />
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
                        dir={contorlers.lang === 'fa' ? 'rtl' : 'ltr'}
                    >
                        <Typography sx={{ fontWeight: 600, my: 2 }}  ><FormattedMessage id='profile.sending_edit_link' /> </Typography>
                        <Typography variant='body1' align='justify' >
                            {contorlers.lang === 'fa' && !isEmpty(user) &&
                                <>
                                    برای تغییر ادرس ایمیل خود، نیاز است که یک لینک به ایمیل خود &nbsp;({user.email.slice(0, 2) + '...@...' + user.email.slice(-3)})&nbsp;
                                    ارسال کنید و از طریق آن، آدرس ایمیل خود را ویرایش کنید.
                                </>}
                            {contorlers.lang === 'en' && !isEmpty(user) &&
                                <>
                                    To change your email address, you need to send a link to your email
                                    &nbsp;({user.email.slice(0, 2) + '...@...' + user.email.slice(-3)})&nbsp;
                                    and edit your email address through that.
                                </>
                            }
                        </Typography>
                        <Grid2
                            container item xs={12}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mt: 3 }}
                        >
                            <Button type="button" variant="contained" onClick={() => handleSubmit()} >
                                <FormattedMessage id='profile.send_link' />
                            </Button>
                        </Grid2>


                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
}

