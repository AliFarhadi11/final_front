import React, { useEffect, useState } from 'react';
import { Button, Grid, MenuItem, Select, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { StyledFormControl, StyledTextField } from '../../utility/StyledComponents';
import { isEmpty, isNull } from 'lodash';
import { addContorlers, addLeagues, addSeasons, addClubs } from '../../../redux/reducers';
import { requestPreData, requestSavePlayersData } from '../../../request_services/PlayersService';


export default function SaveRating(props) {
    const leagues = useSelector((state) => state.leagues.value)

    const { setShow, type, setMessage,second } = props
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)
    const [sheet_name, setSheet_name] = useState('')
    const [league, setLeague] = useState(null)

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
        if (isEmpty(sheet_name)) {
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
            form_data.append("sheet_name", sheet_name)
            form_data.append("type", type)
            form_data.append("league", league)
            const token = localStorage.getItem("access_token")
            const { data, status } = await requestSavePlayersData(form_data, token)
            if (status == 200) {
                setShow(true)
                setMessage(data)
                dispatch(addContorlers({
                    snackbar: {
                        state: true,
                        message:
                            `created_player:${data.created_player}  duplicate_player:${data.duplicate_player} errors:${data.errors}`,
                        severity: 'success',
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

    // Pre data is contain: seasons and leagues and Clubs
    const handleGetPreData = async event => {
        try {
            const { status, data } = await requestPreData()
            if (status === 200) {
                dispatch(addLeagues(data.leagues))
                dispatch(addSeasons(data.seasons.sort(function (a, b) { return b.id - a.id })))
                dispatch(addClubs(data.clubs))
            } 
        }
        catch (ex) {
            
        }
    }
    // this checking for empty one of seasons and leagues and Clubs
    useEffect(() => {
        if (leagues.length == 0) { handleGetPreData() }
    }, [])


    return (
        <Grid
            item container xs={12}
            justifyContent="flex-start"
            alignItems="center"
            p={2} spacing={3}
        >
            <Grid item xs={5}>
                <StyledTextField
                    fullWidth size="small" id="Season"
                    label="Season" variant="outlined"
                    name='Season'
                    value={sheet_name}
                    onChange={(e) => setSheet_name(e.target.value)}
                    sx={{ my: 3, }}
                />
            </Grid>

            <Grid item xs={5}>
                <StyledFormControl fullWidth size='small' >
                    <Select
                        labelId="league-selection"
                        id="league-selection"
                        sx={{ borderRadius: 2 }}
                        name='league'
                        onChange={(e) => setLeague(e.target.value)}
                        value={league}
                    >
                        {leagues.map(item => (
                        ((second == false && item.top_league == true) || (second == true && item.top_league == false) )&&    <MenuItem
                                key={item.id}
                                sx={{ mx: '5px', borderRadius: 2, }}
                                value={item.id}
                            >  {item.league}
                            </MenuItem>
                        ))}
                    </Select>
                </StyledFormControl>
            </Grid>

            <Grid item xs={5}>
                <input type="file"
                    accept="file/xlsx"
                    onChange={filehandler}
                />
            </Grid>
            <Grid item xs={1} mx={1}  >
                <Button fullWidth variant='outlined' onClick={handleSave} > Create </Button>
            </Grid>
        </Grid>
    )
}

