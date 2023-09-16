import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Grid, Typography, } from "@mui/material"
import Link from "next/link"
import { SiteRoad, PasswordField, StyledTextField, MyMessages } from "../components";
import GoogleIcon from '@mui/icons-material/Google';
import Image from "next/image";
import { requestUserRegister } from '../request_services/UserService';
import { useRouter } from 'next/router';
import { addContorlers } from '../redux/reducers';
import { isEmpty } from 'lodash';
import Head from 'next/head';
import { FormattedMessage } from 'react-intl';
import { string as yapstring } from 'yup'
import { object as yapobject } from 'yup'
import { useFormik } from "formik";
// import MyMessages from '../components/utility/MyMessages';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import BreadCrumbSearchBox from '../components/layout/BreadCrumbSearchBox';


export default function SignUp() {
    const user = useSelector((state) => state.user.value)
    const contorlers = useSelector((state) => state.contorlers.value)
    let router = useRouter()
    const dispatch = useDispatch()


    if (!isEmpty(user)) router.push('/')

    const validationSchema = yapobject().shape({
        user_name: yapstring()
            .required(<FormattedMessage id='alarms.user_name_isblank' />),
        email: yapstring()
            .email(<FormattedMessage id='alarms.email_error' />)
            .required(<FormattedMessage id='alarms.email_isblank' />),
        password: yapstring().required(<FormattedMessage id='alarms.password_isblank' />)
            .min(8, <FormattedMessage id='alarms.password_len_error' />),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            user_name: '',
            password: '',
        },
        onSubmit: (values) => {
            handleSubmit(values)
        },
        validationSchema: validationSchema,
    });

    const handleSubmit = async (values) => {
        try {
            const { data, status } = await requestUserRegister(values)
            if (status == 201) {
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message: <FormattedMessage id='alarms.signup_ok' />,
                        severity: 'success',
                    }
                }))
                setShow(true)
            }
        } catch (error) {
            if (error.response.status === 429) {
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message: <FormattedMessage id='alarms.limitaion_request' />,
                        severity: 'error',
                    }
                }))

            } else if (error.response.status === 406) {
                let errors = Object.keys(error.response.data.info)
                if (errors.includes("email")) {
                    dispatch(addContorlers({
                        snackbar: {
                            state: true,
                            message: <FormattedMessage id='alarms.email_exist' />,
                            severity: 'error',
                        }
                    }))
                } else if (errors.includes("user_name")) {
                    dispatch(addContorlers({
                        snackbar: {
                            state: true,
                            message: <FormattedMessage id='alarms.user_name_exist' />,
                            severity: 'error',
                        }
                    }))
                } else {
                    dispatch(addContorlers({
                        snackbar: {
                            state: true,
                            message: <FormattedMessage id='alarms.not_valid_info' />,
                            severity: 'error',
                        }
                    }))
                }
            } else {
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message: <FormattedMessage id='alarms.not_valid_info' />,
                        severity: 'error',
                    }
                }))

            }

        }
    }
    const [show, setShow] = useState(false)

    return (
        <>
            <Head>
                <meta name="robots" content="noindex,nofollow" />
                <title>
                    Sign Up
                </title>
            </Head>

            <MyMessages
                transition='f'
                max_width='sm'
                full_screen={false}
                hide_backdrop={false}
                title={<FormattedMessage id='authentication.registration_successful' />}
                setShowMessage={setShow}
                showMessage={show}

            >
                <Grid2 item xs={12}   >
                    <Typography variant='h6' align="justify"
                        sx={{ m : 2, }}  >
                        <FormattedMessage id='authentication.check_mail1' />
                        <FormattedMessage id='authentication.check_mail2' />
                    </Typography>
                </Grid2>
            </MyMessages>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                sx={{ px: { xs: 1, sm: 5, } }}
                mb={20}

            >
                <Grid
                    container item xs={11}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    sx={{ mt: 4, mb: 2 }}
                >
                    <BreadCrumbSearchBox
                        current={"Sign up"}
                        path={"signup"}
                        search={false}
                    />
                </Grid>
                <Grid item xs={12} sm={11} md={5}
                    sx={{
                        mx: { xs: 0, sm: 2, }, p: { xs: 1, sm: 2, }, boxShadow: 3,
                        borderRadius: 3, overflow: 'hidden',

                    }}
                    component="form"
                    onSubmit={formik.handleSubmit}

                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"

                    >
                        <div>
                            <span className="fw-semibold font-20" style={{ position: 'relative', top: '9px', left: '3px', }}>
                                <FormattedMessage id='SignIn.sign_up' />
                            </span>
                        </div>
                        <div className="font-18" style={{ color: '#979797', position: 'relative', top: '9px', right: '3px', }}>
                            <Link href="signin/"><FormattedMessage id='SignIn.sign_in' /></Link>
                        </div>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} sx={{ pr: { xs: 0, sm: 0.5 } }} >
                            <StyledTextField
                                fullWidth size="small" id="outlined-basic"
                                label={<FormattedMessage id='profile.user_name' />} variant="outlined"
                                name='user_name'
                                sx={{ my: 3, mt: 5, }}
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
                                autoFocus


                            />
                        </Grid>
                        <Grid item xs={12} sx={{ pl: { xs: 0, sm: 0.5 } }}   >
                            <StyledTextField
                                fullWidth size="small" id="[p]assword"
                                label={<FormattedMessage id='profile.email' />} variant="outlined"
                                name='email' autoComplete="email"
                                sx={{ my: 1, }}
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
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ pr: { xs: 0, sm: 0.5 } }} >
                            <PasswordField
                                onChange={formik.handleChange}
                                id='password' label={<FormattedMessage id='authentication.password' />}
                                value={formik.values?.password} autoComplete="current-password"
                                error={Boolean(
                                    formik.touched
                                        .password &&
                                    formik
                                        .errors
                                        .password
                                )}
                                helperText={
                                    formik.touched
                                        .password
                                        ? formik
                                            .errors
                                            .password
                                        : null
                                }

                            />

                        </Grid>
                    </Grid>
                    <Button fullWidth size="large" variant="contained"
                        type="submit"
                        sx={{ borderRadius: 2, my: 1 }} > <FormattedMessage id='authentication.create_account' /> </Button>
                </Grid>
                <Grid item xs={6}
                    sx={{
                        position: 'relative', borderRadius: 3, overflow: 'hidden', boxShadow: 1,
                        width: 'auto',
                        height: '69vh', display: { xs: 'none', md: 'block', }
                    }}
                >
                    <Image style={{ objectFit: 'cover' }}
                        alt=''
                        src='https://playerscubestore.storage.iran.liara.space/images/signup.jpg'
                        layout="fill" quality={75}
                        priority
                    />
                    <Grid sx={{ position: 'absolute', mt: '24vw', }}
                        container
                        direction="column"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Grid item
                            xs={12} md={11} lg={10}
                        >
                            <Typography sx={{ fontSize: 'large' }} variant="subtitle1" mb={2} align='center' component='h6' color='white' >
                                <FormattedMessage id='SignIn.picword' />
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}




