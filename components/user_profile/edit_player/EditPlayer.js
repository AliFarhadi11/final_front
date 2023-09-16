import { Chip, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import ResultDialog from "./ResultDialog";
import SaveData from "./SaveData";



export default function EditPlayer() {
    const contorlers = useSelector((state) => state.contorlers.value)
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')

    return (
        <>

            <ResultDialog
                show={show} setShow={setShow}

            >
                <Typography align='center' variant='h5'
                >  * Edited : {message.edited_player} </Typography>
                <Typography align='center' variant='h5'
                >  * Not Founded : {message.not_founded} </Typography>
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
                            <Chip label='Edit Players' color="success"  />
                        </Divider>
                    </Grid>
                    <SaveData 
                        show={show} setShow={setShow}
                        setMessage={setMessage}
                    />

                </Grid>
            </Grid>

        </>
    )
}