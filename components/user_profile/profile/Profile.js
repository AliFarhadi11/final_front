import React from 'react';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import Grid2 from '@mui/material/Unstable_Grid2';
import ChangeInfo from './ChangeInfo';


export default function Profile() {

    return (
        <>
            <Grid2
                container item xs={12}
                direction="row"
                justifyContent="space-evenly"
                alignItems="flex-start"
                sx={{
                    pt: 3,
                    backgroundColor: 'background.second',
                }}
            >
                <Grid2
                    container item xs={12} md={8} lg={5}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        mb: 3,
                        px: 1,
                    }} >

                    <Grid2 xs={12} sx={{
                        mb: 3,
                        backgroundColor: 'background.paper',
                        borderRadius: 3,

                    }} >
                        <ChangeEmail />
                    </Grid2>

                    <Grid2 xs={12} sx={{
                        backgroundColor: 'background.paper',
                        borderRadius: 3,
                    }} >
                        <ChangePassword />
                    </Grid2>
                </Grid2>

                <Grid2 xs={12} md={8} lg={5}
                    sx={{
                        mb: 3,
                        backgroundColor: 'background.paper',
                        mx: {xs:1,md:0},
                        borderRadius: 3,
                    }} >

                    <ChangeInfo />
                </Grid2>


            </Grid2>
        </>
    )
}




