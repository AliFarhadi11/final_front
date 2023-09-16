import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Avatar, Divider, Grid, IconButton, } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
    addContorlers, dellContorlers, dellFindingInputs, dellInfoData,
    dellLeagues, dellPlayerFinding, dellPlayerRating, dellRatingInputs,
    dellSeasons, dellClubs, dellUser
} from '../../redux/reducers';
import { useRouter } from 'next/router';
import PersonIcon from '@mui/icons-material/Person';
import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';
import LogoutIcon from '@mui/icons-material/Logout';

export default function UserMenu({ user }) {
    const dispatch = useDispatch()
    let router = useRouter()
    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef(null)

    const handleSignOut = () => {
        dispatch(dellUser())
        dispatch(dellRatingInputs())
        dispatch(dellFindingInputs())
        dispatch(dellLeagues())
        dispatch(dellPlayerFinding())
        dispatch(dellPlayerRating())
        dispatch(dellSeasons())
        dispatch(dellClubs())
        dispatch(dellInfoData())

        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        dispatch(addContorlers({
            snackbar: {
                state: true,
                message: 'Logout was successful',
                severity: 'info',
            }
        }))

    }

    const handleShowProfilemenu = () => {
        setOpen((prevOpen) => !prevOpen);
    }

    const handleGetProfile = (event,link) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        router.push(link)
        setOpen(false);
    };

    const handleCloseProfilemenu = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2} sx={{mx:2}}   >


            {!isEmpty(user) && <div>
                <Grid item
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"

                >
                    <IconButton

                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleShowProfilemenu}
                    >
                        <Avatar sx={{ bgcolor: '#256' }} >
                            <PersonIcon />
                        </Avatar>
                    </IconButton>
                </Grid>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseProfilemenu}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        {!isEmpty(user) &&
                                            <MenuItem onClick={(event) => handleGetProfile(event, '/user-profile')}>
                                                <IconButton sx={{ mr: 5 }}
                                                    size='small'
                                                    id="user-button"
                                                    aria-controls={open ? 'user-menu' : undefined}
                                                    aria-haspopup="true"
                                                >
                                                    <Avatar sx={{ bgcolor: '#256', width: 30, height: 30 }}
                                                        size='small'
                                                    >
                                                        {user.user_name[0].toUpperCase()}
                                                    </Avatar>
                                                </IconButton>
                                                {user.user_name}
                                            </MenuItem>
                                        }
                                        <Divider />
                                        <MenuItem onClick={(event) => handleGetProfile(event, '/learn-more')} ><FormattedMessage id='Home.title8' /></MenuItem>
                                        {!isEmpty(user) &&
                                            <MenuItem onClick={handleSignOut}>
                                                <LogoutIcon sx={{ mr: 3 }} />
                                                <FormattedMessage id='User.logout' />
                                            </MenuItem>
                                        }
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>}
        </Stack>
    );
}
