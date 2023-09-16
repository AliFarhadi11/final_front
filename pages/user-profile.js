import React, { useEffect,  } from 'react';
import { useSelector,  } from 'react-redux'
import {
    Grid, Tabs,
    Tab, Box
} from "@mui/material"
import { DataCreatoer,  } from "../components";
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Profile from '../components/user_profile/profile/Profile';
import EditPlayer from '../components/user_profile/edit_player/EditPlayer';
import BreadCrumbSearchBox from '../components/layout/BreadCrumbSearchBox';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`user-tabpanel-${index}`}
            aria-labelledby={`user-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `user-tab-${index}`,
        'aria-controls': `user-tabpanel-${index}`,
    };
}

export default function UserProfile() {
    const user = useSelector((state) => state.user.value)
    let router = useRouter()
    const [tabValue, setTabValue] = React.useState(0);
    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        if (isEmpty(user)) router.push('/')
    }, [user])

    return (
        <>
            <Head>
                <meta name="robots" content="noindex,nofollow" />
                <title>
                    Profile
                </title>
            </Head>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                sx={{ px: { xs: 1, sm: 5, } }} >
                <Grid
                    container item xs={11}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    sx={{ mt: 4, mb: 2 }} >
                    <BreadCrumbSearchBox
                        current={"Profile"}
                        path={"user-profile"}
                        search={false}
                    />
                </Grid>
                {
                    user.is_admin === false ? (
                        <Profile />

                    ) : (
                        <Box sx={{ width: '100%' }} mb={20}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={tabValue} onChange={handleChangeTab} aria-label="admin tabs">
                                    <Tab label="Profile" {...a11yProps(0)} />
                                    <Tab label="Data Creator" {...a11yProps(1)} />
                                    <Tab label="Edit Player" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={tabValue} index={0}>
                                <Box my={3}>
                                    <Profile />
                                </Box>
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                <DataCreatoer />
                            </TabPanel>
                            <TabPanel value={tabValue} index={2}>
                                <EditPlayer />
                            </TabPanel>
                        </Box>
                    )
                }
            </Grid>
        </>
    )
}




