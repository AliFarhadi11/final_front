import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Slide } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { requestResetPassword } from '../../request_services/UserService';
import { useFormik } from "formik";
import { string as yapstring } from 'yup'
import { object as yapobject } from 'yup'
import { addContorlers } from '../../redux/reducers';


export default function ResetPassword({ setShow_dialog }) {
    const [email4reset, setEmail4reset] = useState('');
    const dispatch = useDispatch();
    const contorlers = useSelector((state) => state.contorlers.value)
    const validationSchema = yapobject().shape({
        email: yapstring()
            .email(<FormattedMessage id='alarms.email_error' />)
            .required(<FormattedMessage id='alarms.email_isblank' />),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: (values) => {
            handleSubmit(values)
        },
        validationSchema: validationSchema,
    });


    const handleSubmit = async (values) => {
        try {
            const { status } = await requestResetPassword(values)
            if (status === 202) {
                setShow_dialog(false)
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message: <FormattedMessage id='alarms.reset_link_send' />,
                        severity: 'success',
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
        <Grid container item direction="row" justifyContent="center" alignItems="center" >
            <Typography textAlign='center' > <FormattedMessage id='authentication.sending_email_info' /> </Typography>
            <Grid xs={12} sm={10} container item
                direction="row" justifyContent="center" alignItems="center"
                component="form" onSubmit={formik.handleSubmit}
                autoComplete="on"
            >
                <TextField
                    fullWidth size="small" id="email"
                    label={<FormattedMessage id='authentication.email' />} variant="outlined"
                    name='email'
                    helperText={
                        formik.touched
                            .email
                            ? formik
                                .errors
                                .email
                            : null
                    }

                    error={Boolean(
                        formik.touched
                            .email &&
                        formik
                            .errors
                            .email
                    )}
                    value={
                        formik.values
                            ?.email
                    }
                    onChange={
                        formik.handleChange
                    }
                    sx={{ my: 3 }}
                />

                <Grid xs={5} container item direction="row" justifyContent="center" alignItems="center" >
                    <Button fullWidth type="submit" variant="contained"  >
                        <FormattedMessage id='common.send' />
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

