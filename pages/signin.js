import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Grid, Typography, } from "@mui/material"
import Link from "next/link"
import { SiteRoad, PasswordField, StyledTextField, MyMessages } from "../components";
import Image from "next/image";
import { requestUserLogin } from "../request_services/UserService";
import { decodeToken } from '../components/utility/decodeToken';
import { addContorlers, addUser } from '../redux/reducers';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FormattedMessage } from 'react-intl';
import { useFormik } from "formik";
import { string as yapstring } from 'yup'
import { object as yapobject } from 'yup'
import { isEmpty } from 'lodash';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ForgetPassword from '../components/signin/ForgetPassword';
import BreadCrumbSearchBox from '../components/layout/BreadCrumbSearchBox';


export default function SignIn() {

    const user = useSelector((state) => state.user.value)
    const contorlers = useSelector((state) => state.contorlers.value)
    let router = useRouter()
    const dispatch = useDispatch()
    if (!isEmpty(user)) router.push('/')

    const validationSchema = yapobject().shape({
        email: yapstring()
            .email(<FormattedMessage id='alarms.email_error' />)
            .required(<FormattedMessage id='alarms.email_isblank' />),
        password: yapstring().required(<FormattedMessage id='alarms.password_isblank' />)
            .min(8, <FormattedMessage id='alarms.password_len_error' />),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            handleSubmit(values)
        },
        validationSchema: validationSchema,
    });


    const handleSubmit = async (data_values) => {
        try {
            const { data, status } = await requestUserLogin(data_values)
            if (status == 200) {
                localStorage.setItem("access_token", data.access)
                localStorage.setItem("refresh_token", data.refresh)
                dispatch(addUser(decodeToken(data.access).payload))
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message: <FormattedMessage id='alarms.login_ok' />,
                        severity: 'success',
                    }
                }))
                router.replace('/')
            }
        } catch (err) {
            dispatch(addContorlers({
                snackbar: {
                    state: true,
                    message: <FormattedMessage id='alarms.not_valid_info' />,
                    severity: 'error',
                }
            }))
        }
    }

    useEffect(() => {
        if (!isEmpty(user)) {
            dispatch(addContorlers({ show_message: false }))
            router.replace('/')
        }
    }, [])

    const [show_active, setShow_active] = useState(false)
    const [show_changed_password, setShow_changed_password] = useState(false)
    useEffect(() => {
        if (router.query['activation'] && router.query['activation'] === 'successfully') {
            setShow_active(true)
        }
        if (router.query['changed_password'] && router.query['changed_password'] === 'successfully') {
            setShow_changed_password(true)
        }


    }, [router])

    return (
        <>
            <Head>
                <meta name="robots" content="noindex,nofollow" />
                <title>
                    Sign In
                </title>
            </Head>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                sx={{ px: { xs: 1, sm: 5, } }}
                mb={20}

            >
                <MyMessages
                    transition='f'
                    max_width='sm'
                    full_screen={false}
                    hide_backdrop={false}
                    title={<FormattedMessage id='authentication.password_changed' />}
                    setShowMessage={setShow_changed_password}
                    showMessage={show_changed_password}

                >
                    <Grid2 item xs={12}   >
                        <Typography variant='h6' align="justify"
                            sx={{ m: 2, }}  >
                            <FormattedMessage id='authentication.password_changed1' />
                            <FormattedMessage id='authentication.password_changed2' />
                        </Typography>
                    </Grid2>
                </MyMessages>

                <MyMessages
                    transition='f'
                    max_width='sm'
                    full_screen={false}
                    hide_backdrop={false}
                    title={<FormattedMessage id='authentication.activation_successful' />}
                    setShowMessage={setShow_active}
                    showMessage={show_active}

                >
                    <Grid2 item xs={12}   >
                        <Typography variant='h6' align="justify"
                            sx={{ m: 2, }}  >
                            <FormattedMessage id='authentication.activation_successful1' />
                            <FormattedMessage id='authentication.activation_successful2' />
                        </Typography>
                    </Grid2>
                </MyMessages>




                <Grid
                    container item xs={11}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    sx={{ mt: 4, mb: 2 }}
                >
                    <BreadCrumbSearchBox
                        current={"Signin"}
                        path={"signin"}
                        search={false}
                    />

                </Grid>

                <Grid item xs={12} md={5}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"

                    sx={{
                        mx: { xs: 0, sm: 2, }, p: { xs: 1, sm: 2, }, boxShadow: 3, borderRadius: 3,
                        overflow: 'hidden',

                    }}
                >
                    <Grid container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        component="form"
                        autoComplete="on"
                        onSubmit={formik.handleSubmit}>

                        <Grid
                            container item
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <div>
                                <span className="fw-bold font-20" style={{ position: 'relative', top: '9px', left: '3px', }}>
                                    <FormattedMessage id='SignIn.sign_in' /></span>
                            </div>
                            <div className="font-18" style={{ color: '#979797', position: 'relative', top: '9px', right: '3px', }}>
                                <Link href="signup/"> <FormattedMessage id='SignIn.sign_up' /></Link>
                            </div>
                        </Grid>

                        <StyledTextField
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
                            sx={{ my: 1, mt: 8, }}
                        />
                        <PasswordField onChange={formik.handleChange}
                            id='password' label={<FormattedMessage id='authentication.password' />}
                            value={formik.values?.password}
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
                        <Button fullWidth size="large" variant="contained" type="submit"
                            sx={{ borderRadius: 2, my: 3 }} >
                            <FormattedMessage id='SignIn.sign_in' />
                        </Button>
                    </Grid>



                    <Grid2
                        container xs={12} item
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent={{ xs: "center", sm: "space-between" }}
                        alignItems="center"
                        sx={{ my: 1 }}
                    >
                        <ForgetPassword />
                    </Grid2>
                </Grid>

                <Grid item xs={6}
                    sx={{
                        position: 'relative', borderRadius: 3, overflow: 'hidden', boxShadow: 5,
                        width: 'auto',
                        height: '69vh', display: { xs: 'none', md: 'block', }
                    }}
                >
                    <Image style={{ objectFit: 'cover' }}
                        alt=''
                        src='https://playerscubestore.storage.iran.liara.space/images/signin.jpg'
                        layout="fill" quality={75}
                        priority
                    />
                    <Grid sx={{ position: 'absolute', mt: '23vw', }}
                        container
                        direction="column"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Grid item xs={12} md={11} lg={10} >
                            <Typography mb={2} sx={{ fontSize: 'large' }} variant="subtitle1" align='center' component='h6' color='white' >
                                <FormattedMessage id='SignIn.picword1' />
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}




