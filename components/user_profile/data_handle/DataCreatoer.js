import { Chip, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import ResultDialog from "./ResultDialog";
import SaveData from "./SaveData";
import SaveRating from "./SaveRating";



export default function DataCreatoer() {
    const contorlers = useSelector((state) => state.contorlers.value)
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')

    return (
        <>

            <ResultDialog
                show={show} setShow={setShow}

            >
                <Typography align='center' variant='h5'
                >  * Created : {message.created_player} </Typography>
                <Typography align='center' variant='h5'
                >  * Duplicate : {message.duplicate_player} </Typography>
                <Typography align='center' variant='h5'
                >  * Errors: {message.errors}  </Typography>
            </ResultDialog>

            <Grid container >
                <Grid
                    container item xs={11}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={12} >
                        <Divider variant='fullWidth' sx={{ my: '3vh', }} >
                            <Chip label='Save Players' color="success" />
                        </Divider>
                    </Grid>
                    <SaveData type='players'
                        show={show} setShow={setShow}
                        setMessage={setMessage}

                    />

                    <Grid item xs={12} >
                        <Divider variant='fullWidth' sx={{ my: '2vh', }} >
                            <Chip label='Save Clubs' color="primary" />
                        </Divider>
                    </Grid>
                    <SaveData type='clubs'
                        show={show} setShow={setShow}
                        setMessage={setMessage}

                    />

                    <Grid item xs={12} >
                        <Divider variant='fullWidth' sx={{ my: '2vh', color: 'red' }} color='red' >
                            <Chip label='Save Rating System' color="warning" />
                        </Divider>
                    </Grid>
                    <SaveRating type='rating_system'
                        show={show} setShow={setShow}
                        setMessage={setMessage}
                        second ={false}

                    />

                    <Grid item xs={12} >
                        <Divider variant='fullWidth' sx={{ my: '2vh', color: 'red' }} color='red' >
                            <Chip label='Save Second League' color="error" />
                        </Divider>
                    </Grid>
                    <SaveRating type='second_league'
                        show={show} setShow={setShow}
                        setMessage={setMessage}
                        second ={true}
                    />

                </Grid>
            </Grid>

        </>
    )
}