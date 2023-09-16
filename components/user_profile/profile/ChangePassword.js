import React  from 'react';
import { useDispatch } from 'react-redux'
import { Button, Typography, } from "@mui/material"
import { requestEditPassword } from "../../../request_services/UserService";
import PasswordField from '../../utility/PasswordField';
import { addContorlers, dellUser, } from '../../../redux/reducers';
import { FormattedMessage } from 'react-intl';
import { string as yapstring } from 'yup'
import { object as yapobject } from 'yup'
import { ref as yapref } from 'yup'
import { useFormik } from "formik";
import Grid2 from '@mui/material/Unstable_Grid2';
import { useRouter } from 'next/router';


export default function ChangePassword() {
    const dispatch = useDispatch()
    let router = useRouter()

    const validationSchema = yapobject().shape({
        old_password: yapstring().required(<FormattedMessage id='alarms.password_isblank' />)
            .min(8, <FormattedMessage id='alarms.password_len_error' />),
        new_password: yapstring().required(<FormattedMessage id='alarms.password_isblank' />)
            .min(8, <FormattedMessage id='alarms.password_len_error' />),
        confirm_new_password: yapstring().required(<FormattedMessage id='alarms.password_isblank' />)
            .min(8, <FormattedMessage id='alarms.password_len_error' />)
            .oneOf([yapref('new_password'), null], <FormattedMessage id='alarms.unmach_pass' />)
    });

    const formik = useFormik({
        initialValues: {
            old_password: '',
            new_password: '',
            confirm_new_password: '',
        },
        onSubmit: (values) => {
            handleSubmit(values)
        },
        validationSchema: validationSchema,
    });

    const handleSubmit = async (values) => {
        try {
            const token = localStorage.getItem("access_token")
            const { data, status } = await requestEditPassword(values, token)
            if (status == 201) {
                localStorage.removeItem("access_token")
                localStorage.removeItem("refresh_token")
                dispatch(dellUser())
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message: <FormattedMessage id='alarms.edit_pass_done' />,
                        severity: 'success'
                    }
                }))
                router.push('/signin')
            }
        } catch (error) {
            if (error.response.status === 406) {
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message: <FormattedMessage id='alarms.old_pass_wrong' />,
                        severity: 'error'
                    }
                }))
            }
            else {
                if (error.response.status === 429) {
                    dispatch(addContorlers({
                        snackbar: {
                            state: true,
                            message: <FormattedMessage id='alarms.limitaion_request' />,
                            severity: 'error',
                        }
                    }))
                }
                else {
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
    }


    const styles = {
        fields: {
            my: 2,
        },
    }
    return (
        <>
            <Grid2
                container item xs={12}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    py: 5,
                    px: { xs: 2, sm: 3, md: 5 },
                }} component="form" onSubmit={formik.handleSubmit} >
                <Grid2
                    container item
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography sx={{ fontWeight: 600, mb: 1 }} ><FormattedMessage id='profile.edit_password' /></Typography>
                </Grid2>
                <PasswordField onChange={formik.handleChange}
                    sx={styles.fields} id='old_password' label={<FormattedMessage id='profile.old_password' />}
                    error={Boolean(
                        formik.touched
                            .old_password &&
                        formik
                            .errors
                            .old_password
                    )}
                    helperText={
                        formik.touched
                            .old_password
                            ? formik
                                .errors
                                .old_password
                            : null
                    }
                />
                <PasswordField onChange={formik.handleChange}
                    sx={styles.fields} id='new_password' label={<FormattedMessage id='profile.new_password' />}
                    error={Boolean(
                        formik.touched
                            .new_password &&
                        formik
                            .errors
                            .new_password
                    )}
                    helperText={
                        formik.touched
                            .new_password
                            ? formik
                                .errors
                                .new_password
                            : null
                    }
                />
                <PasswordField onChange={formik.handleChange}
                    sx={styles.fields} id='confirm_new_password' label={<FormattedMessage id='profile.double_password' />}
                    error={Boolean(
                        formik.touched
                            .confirm_new_password &&
                        formik
                            .errors
                            .confirm_new_password
                    )}
                    helperText={
                        formik.touched
                            .confirm_new_password
                            ? formik
                                .errors
                                .confirm_new_password
                            : null
                    }
                />
                <Button fullWidth size="large" variant="contained"
                    type="submit"
                    sx={styles.fields} >
                    <FormattedMessage id='profile.edit_password' /> </Button>
            </Grid2>

        </>
    )
}