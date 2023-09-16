import React, { useState } from 'react';
import { Button, Grid, } from '@mui/material';
import { useDispatch } from 'react-redux';
import { StyledTextField } from '../../utility/StyledComponents';
import { isEmpty, isNull } from 'lodash';
import { addContorlers } from '../../../redux/reducers';
import { requestEditPlayers } from '../../../request_services/PlayersService';


export default function SaveData(props) {

    const { setShow,setMessage } = props
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)
    const [field_name, setField_name] = useState('')
    const [sheet_name, setSheet_name] = useState('')

    const filehandler = (e) => {
        if (e.target.files.length !== 0) {
            setFile(e.target.files[0])
        }
    }

    // function for send pictur to save in backend
    const handleSave = async event => {
        // check for null file pictuer
        if (isNull(file)) {
            dispatch(addContorlers({
                snackbar: {
                    state: true,
                    message: ' Please select a file',
                    severity: 'error',
                }
            }))
            return
        }
        // check for empty image pictuer
        if (isEmpty(field_name)) {
            dispatch(addContorlers({
                snackbar: {
                    state: true,
                    message: ' Please enter sheet name ',
                    severity: 'error',
                }
            }))
            return
        }
        // if the picture is accepted, try can be run 
        try {
            let form_data = new FormData()
            form_data.append("file", file)
            form_data.append("field_name", field_name)
            form_data.append("sheet_name", sheet_name)
            const token = localStorage.getItem("access_token")
            const { data, status } = await requestEditPlayers(form_data, token)
            if (status == 200) {
                setShow(true)
                setMessage(data)
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message:
                            `created_player:${data.created_player}  duplicate_player:${data.duplicate_player} errors:${data.errors}`,
                        severity: data.errors ==0 ? 'success' : 'warning' ,
                    }
                }))
            }
        } catch (ex) {
            // if receive an error, this section will be run
            
            dispatch(addContorlers({
                snackbar: {
                    state: true,
                    message: 'Not Accepted',
                    severity: 'error',
                }
            }))
        }
    }


    return (
        <Grid
            item container xs={12}
            justifyContent="flex-start"
            alignItems="center"
            p={2} spacing={3}
        >
            <Grid item xs={5}>
                <StyledTextField
                    fullWidth size="small" id="Filed Name"
                    label="Filed Name" variant="outlined"
                    name='Filed Name'
                    value={field_name}
                    onChange={(e) => setField_name(e.target.value)}
                    sx={{ my: 3, }}
                />
            </Grid>
            <Grid item xs={5}>
                <StyledTextField
                    fullWidth size="small" id="Sheet Name"
                    label="Sheet Name" variant="outlined"
                    name='Sheet Name'
                    value={sheet_name}
                    onChange={(e) => setSheet_name(e.target.value)}
                    sx={{ my: 3, }}
                />
            </Grid>
            <Grid item xs={5}>
                <input type="file"
                    accept="file/xlsx"
                    onChange={filehandler}
                />
            </Grid>
            <Grid item xs={1} mx={1}  >
                <Button fullWidth variant='outlined' onClick={handleSave} > Edit </Button>
            </Grid>
        </Grid>
    )
}

