import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./footer/Footer";
import Header from "./Header";
import Theme from "./theme/Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import SnackBar from "../snacke_bar/SnackBar";
import { addContorlers, addUser, dellUser } from "../../redux/reducers";
import translate from "../language";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import IndexHeader from "./IndexHeader";
import { isEmpty } from 'lodash';
import { decodeToken } from "../utility/decodeToken";
import { requestGetPictures } from "../../request_services/UserService";
import BackToTop from './BackToTop';

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

export default function IndexLayout({ children }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const contorlers = useSelector((state) => state.contorlers.value);
    const user = useSelector((state) => state.user.value)
    let [theme, setTheme] = useState(Theme(contorlers.lang, contorlers.theme_mode));
    const [locale, setLocal] = useState(router.locale)
    useEffect(() => {
        setTheme(Theme(contorlers.lang, contorlers.theme_mode));
    }, [contorlers.lang, contorlers.theme_mode]);


    useEffect(() => {
        //  user checking : get access_token from local storage.
        if (typeof window !== "undefined") {
            let local_lang = localStorage.getItem("lang");
            if (local_lang) {
                dispatch(addContorlers({ lang: local_lang }));
            } else {
                localStorage.setItem("lang", contorlers.lang);
            }
        }
    }, []);

    useEffect(() => {
        //  user checking : get access_token from local storage.
        if (typeof window !== 'undefined') {
            if (isEmpty(user)) {
                let token = localStorage.getItem("access_token");
                if (token) {
                    const decodedToken = decodeToken(token);
                    const dateNow = Date.now() / 1000;
                    if (decodedToken.payload.exp < dateNow) {
                        localStorage.removeItem("access_token");
                        dispatch(dellUser());
                        dispatch(addContorlers({
                            snackbar: {
                                state: true,
                                message: 'Your access token has expired',
                                severity: 'warning',
                            }
                        }))
                    } else dispatch(addUser(decodedToken.payload));
                }
            }
            let local_lang = localStorage.getItem("lang")
            if (local_lang) {
                dispatch(addContorlers({ lang: local_lang }))
            } else {
                localStorage.setItem("lang", locale)
                dispatch(addContorlers({ lang: locale }))
            }

        }
    }, [])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLocal(contorlers.lang)
        }
    }, [contorlers.lang])

    return (
        <>

        
            <IntlProvider locale={contorlers.lang} messages={translate[contorlers.lang]}>
                <ThemeProvider theme={theme}>
                <BackToTop />
                    {contorlers.lang === "fa" ? (
                        <CacheProvider value={cacheRtl}>
                            <dev dir="rtl">
                                <CssBaseline />
                                <SnackBar />
                                {router.pathname == "/" ? <IndexHeader /> : <Header />}
                                {children}
                                <Footer />
                            </dev>
                        </CacheProvider>
                    ) : (
                        <dev dir="ltr">
                            <CssBaseline />
                            <SnackBar />
                            {router.pathname == "/" ? <IndexHeader /> : <Header />}
                            {children}
                            <Footer />
                        </dev>
                    )}
                </ThemeProvider>
            </IntlProvider>
        </>
    );
}
