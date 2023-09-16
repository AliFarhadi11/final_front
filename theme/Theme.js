import { createTheme } from '@mui/material/styles';

const Theme = createTheme({

    typography: {
        htmlFontSize: 16,
        fontFamily: "'Gilroy-Medium','Gilroy-Regular','Roboto', 'Gilroy-SemiBold','Gilroy-Bold','Gilroy-Heavy','sans-serif','Gilroy-ExtraBold'",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,

        keys: {
            fontFamily: lang === 'fa' ? "'Yekan'": 'Gilroy-SemiBold',
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
        },
        values: {
            fontFamily: lang === 'fa' ? "'Yekan'": 'Gilroy-SemiBold',
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
            opacity: 0.7
        },
        title1: {
            fontFamily: lang === 'fa' ? "'Yekan'": 'Gilroy-Bold',
            fontWeight: 500,
            fontSize: 35,
            lineHeight: '50px',
            letterSpacing: "-0.01562em",
            textTransform: "capitalize",

        },
        title2: {
            fontFamily: lang === 'fa' ? "'Yekan'": 'Gilroy-SemiBold',
            fontWeight: 500,
            fontSize: 32,
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
        },
        title3: {
            fontFamily: lang === 'fa' ? "'Yekan'": 'Gilroy-Medium',
            fontWeight: 500,
            fontSize: 24,
            lineHeight: '50px',
            letterSpacing: "-0.01562em",
            opacity: 0.7,
        },

        title4: {
            fontFamily: lang === 'fa' ? "'Yekan'": 'Gilroy-SemiBold',
            fontWeight: 500,
            fontSize: 22,
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
        },
        title5: {
            fontFamily: lang === 'fa' ? "'Yekan'": 'Gilroy-SemiBold',
            fontWeight: 500,
            fontSize: 18,
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
        },

        title6:{
            fontFamily: lang === 'fa' ? "'Yekan'": 'Gilroy-Medium',
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
            
        },
        title7:{
            fontFamily: lang === 'fa' ? "'Yekan'": 'Gilroy-Semibold', 
            fontWeight: 400, 
            fontSize: 17,
            lineHeight: 1.767,
            letterSpacing: "-0.01562em",
        },
        h1: {
            fontFamily: "'Gilroy-Medium','Gilroy-Regular','Roboto'",
            fontWeight: 300,
            fontSize: "6rem",
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
        },

        h2: {
            fontFamily: lang === 'fa' ? "'Yekan'": "'Gilroy-Medium','Gilroy-Regular','Roboto'",
            fontWeight: 300,
            fontSize: "3.75rem",
            lineHeight: 1.2,
            letterSpacing: "-0.00833em",
        },

        h3: {
            fontFamily: lang === 'fa' ? "'Yekan'": "'Gilroy-Medium','Gilroy-Regular','Roboto'",
            fontWeight: 400,
            fontSize: "3rem",
            lineHeight: 1.167,
            letterSpacing: "0em",
        },

        h4: {
            fontFamily: lang === 'fa' ? "'Yekan'": "'Gilroy-Medium','Gilroy-Regular','Roboto'",
            fontWeight: 400,
            fontSize: "2.125rem",
            lineHeight: 1.235,
            letterSpacing: "0.00735em",
        },

        h5: {
            fontFamily: lang === 'fa' ? "'Yekan'": "'Gilroy-Medium','Gilroy-Regular','Roboto'",
            fontWeight: 400,
            fontSize: "1.5rem",
            lineHeight: 1.334,
            letterSpacing: "0em",
        },

        h6: {
            fontFamily: lang === 'fa' ? "'Yekan'": "'Gilroy-Medium','Gilroy-Regular','Roboto'",
            fontWeight: 500,
            fontSize: "1.25rem",
            lineHeight: 1.6,
            letterSpacing: "0.0075em",
        },

        subtitle1: {
            fontFamily: lang === 'fa' ? "'Yekan'": "'Gilroy-Medium','Gilroy-Regular','Roboto'",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.75,
            letterSpacing: "0.00938em",
        },

        subtitle2: {
            fontFamily: lang === 'fa' ? "'Yekan'": "'Gilroy-semibold','Gilroy-Regular','Roboto'",
            fontWeight: 500,
            fontSize: "0.875rem",
            lineHeight: 1.57,
            letterSpacing: "0.00714em",
        },

        body1: {
            fontFamily: lang === 'fa' ? "'Yekan'": "'Gilroy-Medium','Gilroy-Regular','Roboto'",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.5,
            letterSpacing: "0.00938em",
        },

        body2: {
            fontFamily: "'Gilroy-Medium','Gilroy-Regular','Roboto'",
            fontWeight: 400,
            fontSize: "0.875rem",
            lineHeight: 1.43,
            letterSpacing: "0.01071em",
        },

        button: {
            fontFamily: lang === 'fa' ? "'Yekan'": "'Gilroy-Medium','Gilroy-Regular','Roboto'",
            fontWeight: 500,
            fontSize: "0.875rem",
            lineHeight: 1.75,
            letterSpacing: "0.02857em",
            textTransform: "uppercase",
        },

        caption: {
            fontFamily: lang === 'fa' ? "'Yekan'": "'Gilroy-Medium','Gilroy-Regular','Roboto'",
            fontWeight: 400,
            fontSize: "0.75rem",
            lineHeight: 1.66,
            letterSpacing: "0.03333em",
        },

        overline: {
            fontFamily: lang === 'fa' ? "'Yekan'": "'Gilroy-Medium','Gilroy-Regular','Roboto'",
            fontWeight: 400,
            fontSize: "0.75rem",
            lineHeight: 2.66,
            letterSpacing: "0.08333em",
            textTransform: "uppercase",
        },
    },

    spacing: 8,
    palette: {
        ranking: {
            light: '#ffeb3b',
            main: '#ffc107',
            dark: '#ff5722'

        },
        btnwhite: {
            light: '#FFFFFF',
            main: '#FFFFFF',
            dark: '#FFFFFF'

        },
        btnslide: {
            light: '#DDDCDC',
            main: '#DDDCDC',
            dark: '#DDDCDC'

        },

    },
    components: {

        MuiButtonBase: {
            styleOverrides: {
                root: {
                    textTransform: 'none !important',
                }
            },
        },

    }
});

export default Theme


// MuiTableRow-root MuiTableRow-hover css-ifsr0f-MuiTableRow-root