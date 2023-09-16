import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, TextField, Typography, } from "@mui/material"
import { requestEditProfile } from "../../../request_services/UserService";
import decodeToken from '../../utility/decodeToken';
import { addContorlers, addUser } from '../../../redux/reducers';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';
import Grid2 from '@mui/material/Unstable_Grid2';
import { string as yapstring } from 'yup'
import { object as yapobject } from 'yup'
import { useFormik } from "formik";


export default function ChangeInfo() {
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()
    let router = useRouter()

    const validationSchema = yapobject().shape({
        user_name: yapstring().required(<FormattedMessage id='alarms.user_name_isblank' />)
            .max(60, <FormattedMessage id='profile.unauthorized_value' />),
        first_name: yapstring().max(60, <FormattedMessage id='profile.unauthorized_value' />),
        last_name: yapstring().max(60, <FormattedMessage id='profile.unauthorized_value' />)

    });
    const formik = useFormik({
        initialValues: {
            user_name: user.user_name,
            first_name: user.first_name,
            last_name: user.last_name,
            last_name: user.last_name,
            mobile_number: '',
        },
        onSubmit: (values) => {
            handleSubmit(values)
        },
        validationSchema: validationSchema,
    });

    const handleSubmit = async (values) => {
        try {
            let token = localStorage.getItem("access_token")
            const { data, status } = await requestEditProfile(values, token)
            if (status == 200) {
                localStorage.setItem("access_token", data.access)
                localStorage.setItem("refresh_token", data.refresh)
                // dispatch(addUser(decodeToken(data.access).payload))
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message: <FormattedMessage id='alarms.edit_profile_ok' />,
                        severity: 'success',
                    }
                }))
            }
        } catch (error) {
            if (error.response.status === 406) {
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message: <FormattedMessage id='alarms.user_name_exist' />,
                        severity: 'error',
                    }
                }))
            }
            else if (error.response.status === 429) {
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
    useEffect(() => {
        if (isEmpty(user)) router.push('/')
    }, [user])


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
                component="form" onSubmit={formik.handleSubmit}
                sx={{
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    py: 5,
                    px: { xs: 2, sm: 3, md: 5 },
                }} >
                <Grid2
                    container item
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography sx={{ fontWeight: 600, mb: 1 }}  ><FormattedMessage id='profile.edit_profile' /> </Typography>
                </Grid2>
                <TextField
                    fullWidth size="small" id="user_name"
                    label={<FormattedMessage id='profile.user_name' />} variant="outlined"
                    name='user_name' sx={styles.fields}
                    helperText={
                        formik.touched
                            .user_name
                            ? formik
                                .errors
                                .user_name
                            : null
                    }

                    error={Boolean(
                        formik.touched
                            .user_name &&
                        formik
                            .errors
                            .user_name
                    )}
                    value={
                        formik.values
                            ?.user_name
                    }
                    onChange={
                        formik.handleChange
                    }
                    autoComplete="off"
                />
                <TextField
                    fullWidth size="small" id="first_name"
                    label={<FormattedMessage id='profile.first_name' />} variant="outlined"
                    name='first_name' sx={styles.fields}
                    helperText={
                        formik.touched
                            .first_name
                            ? formik
                                .errors
                                .first_name
                            : null
                    }

                    error={Boolean(
                        formik.touched
                            .first_name &&
                        formik
                            .errors
                            .first_name
                    )}
                    value={
                        formik.values
                            ?.first_name
                    }
                    onChange={
                        formik.handleChange
                    }
                    autoComplete="off"
                />
                <TextField
                    fullWidth size="small" id="last_name"
                    label={<FormattedMessage id='profile.last_name' />} variant="outlined"
                    name='last_name' sx={styles.fields}
                    helperText={
                        formik.touched
                            .last_name
                            ? formik
                                .errors
                                .last_name
                            : null
                    }

                    error={Boolean(
                        formik.touched
                            .last_name &&
                        formik
                            .errors
                            .last_name
                    )}
                    value={
                        formik.values
                            ?.last_name
                    }
                    onChange={
                        formik.handleChange
                    }
                    autoComplete="off"
                />
                <TextField
                    fullWidth size="small" id="mobile_number"
                    label={<FormattedMessage id='profile.mobile_number' />} variant="outlined"
                    name='mobile_number' disabled sx={styles.fields}
                    helperText={
                        formik.touched
                            .mobile_number
                            ? formik
                                .errors
                                .mobile_number
                            : null
                    }

                    error={Boolean(
                        formik.touched
                            .mobile_number &&
                        formik
                            .errors
                            .mobile_number
                    )}
                    value={
                        formik.values
                            ?.mobile_number
                    }
                    onChange={
                        formik.handleChange
                    }
                    autoComplete="off"

                />
                <Button fullWidth size="large" variant="contained"
                    type='submit'
                    sx={styles.fields} >
                    <FormattedMessage id='profile.edit_profile' /> </Button>
            </Grid2>
        </>
    )
}


