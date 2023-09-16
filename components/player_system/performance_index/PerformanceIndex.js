import React, { useState } from 'react';
import {
    Grid,
    IconButton, Typography,
    Paper,
    Slide,
    Dialog,
    DialogTitle,
    Divider, Chip,
    DialogContent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import IndexRangeSelector from './IndexRangeSelector';
import { addFindingInputs } from '../../../redux/reducers';
import { toInteger } from 'lodash';


function PaperComponent(props) {
    return (<Paper sx={{ borderRadius: 2.5, bgcolor: 'danger' }}   {...props} />);
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const deffennsive_action =
    [{ label: 'Ball Recovery', name: 'wrec', },
    { label: 'Interception', name: 'wint', },
    { label: 'Clearance', name: 'wclr', },
    { label: 'Tackle', name: 'wtkl', },
    { label: 'Touch', name: 'wtch', },
    { label: 'Aerial', name: 'warl', },
    { label: 'Block', name: 'wblk', },
    { label: 'Press', name: 'wprs', },
    { label: 'Foul', name: 'wfls', },
    ]
const offensive_action =
    [{ label: 'Goal', name: 'wgls', },
    { label: 'Penalty Made', name: 'wpk', },
    { label: 'Dribble', name: 'wdrb', },
    { label: 'Carrier', name: 'wcri', },
    { label: 'Shot', name: 'wsh', },
    ]
const passing_action =
    [{ label: 'Pass', name: 'wpass', },
    { label: 'Assist', name: 'wast', },
    { label: 'Cross', name: 'wcrs', },]


const PerformanceIndex = ({ showIndex, setShowIndex }) => {
    const inputs_finding = useSelector((state) => state.inputs_finding.value)
    const dispatch = useDispatch()
    const handlehangeParam = (e) => {
        dispatch(addFindingInputs({
            [e.target.name]:  e.target.value ,
        }))
    }

    return (
        <>
            <Dialog open={showIndex}
                TransitionComponent={Transition}
                onClose={() => setShowIndex(false)}
                PaperComponent={PaperComponent}
                transitionDuration={{ appear: 500, enter: 500, exit: 500, }}
                maxWidth='lg' fullWidth hideBackdrop 
            >
                <DialogTitle
                    sx={{ bgcolor: '#EDF0F3', py: 1 }}
                >
                    <Grid xs={12} item container sx={{ bgcolor: '#EDF0F3' }}
                        direction="row"
                        justifyContent="space-between" alignItems="center"
                    >
                        <Grid item xs={10}
                        >
                            <Typography component="h5" fontWeight={600} variant="body1"  sx={{fontFamily: 'Gilroy-Regular'}}  >
                                Player performance index
                            </Typography>
                        </Grid>
                        <Grid item xs={1} container justifyContent="flex-end" >
                            <IconButton
                                aria-label="close" color='error'
                                onClick={() => setShowIndex(false)}
                            >
                                <CloseIcon fontSize='small' />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <Divider />

                <DialogContent sx={{ bgcolor: 'primary', }}  >
                    <Grid item xs={10} >
                        <Divider variant='fullWidth' sx={{ mt: '1vh',mb: '3vh',  }} >
                            <Chip sx={{fontFamily: 'Gilroy-Regular'}} label='DEFENSIVE ACTION' />
                        </Divider>
                    </Grid>
                    <Grid xs={12}
                        sx={{px:2}}
                        item container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        {deffennsive_action.map((item,index) => (
                            <IndexRangeSelector key={index} index={index} item={item} value={inputs_finding[`${item.name}`]} handlehangeValue={handlehangeParam} />
                        ))}

                    </Grid>
                    <Grid item xs={10} >
                        <Divider variant='fullWidth' sx={{ my: '3vh', }} >
                            <Chip sx={{fontFamily: 'Gilroy-Regular'}}  label='OFFENSIVE ACTION' />
                        </Divider>
                    </Grid>
                    <Grid xs={12}
                        sx={{px:2}}
                        item container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        {offensive_action.map((item,index) => (
                            <IndexRangeSelector key={index}  index={index} item={item} value={inputs_finding[`${item.name}`]} handlehangeValue={handlehangeParam} />
                        ))}
                    </Grid>
                    <Grid item xs={10} >
                        <Divider variant='fullWidth' sx={{ my: '3vh', }} >
                            <Chip sx={{fontFamily: 'Gilroy-Regular'}}  label='PASSING' />
                        </Divider>
                    </Grid>

                    <Grid xs={12}
                        sx={{px:2}} 
                        
                        item container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        {passing_action.map((item,index) => ( 
                            <IndexRangeSelector key={index}  index={index} item={item} value={inputs_finding[`${item.name}`]} handlehangeValue={handlehangeParam} />
                        ))}
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default PerformanceIndex