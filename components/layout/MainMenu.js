import { useEffect, useRef, useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Grid, IconButton, } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';


export default function MainMenu() {
    const [open, setOpen] = useState(false)
    const anchorRef = useRef(null)
    const user = useSelector((state) => state.user.value)

    const handleShowProfilemenu = () => {
        setOpen((prevOpen) => !prevOpen);
    }

    const handleCloseMenu = (event) => {
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

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);
    let style = {
        px: 3,
        mx: 2,
        borderRadius: 3
    }

    return (
        <Stack direction="row" spacing={2} zIndex={999} >
            <div >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <IconButton sx={{ mx: 3 }}
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleShowProfilemenu}
                    >
                        <MenuOpenIcon color='primary' /> </IconButton>
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
                            <Paper sx={{ zIndex: 999 }}>
                                <ClickAwayListener onClickAway={handleCloseMenu}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >

                                    { isEmpty(user) &&   <Link className='link' href="/signin" >
                                            <MenuItem onClick={() => setOpen(false)}  ><FormattedMessage id='SignIn.sign_in' /></MenuItem>
                                        </Link>}
                                    { isEmpty(user) &&   <Link className='link' href="/signup" >
                                            <MenuItem onClick={() => setOpen(false)}  ><FormattedMessage id='SignIn.sign_up' /></MenuItem>
                                        </Link>}

                                        <Link className='link' href="/" >
                                            <MenuItem onClick={() => setOpen(false)}  ><FormattedMessage id='General.home' /></MenuItem>
                                        </Link>

                                        <Link className='link' href="/system-choose/player-information-system" >
                                            <MenuItem onClick={() => setOpen(false)}  ><FormattedMessage id='General.pis' /></MenuItem>
                                        </Link>

                                        <Link className='link' href="/system-choose/player-rating-system" >
                                            <MenuItem onClick={() => setOpen(false)}  ><FormattedMessage id='General.prs' /></MenuItem>
                                        </Link>

                                        <Link className='link' href="/system-choose/player-finding-system" >
                                            <MenuItem onClick={() => setOpen(false)}  ><FormattedMessage id='General.pfs' /></MenuItem>
                                        </Link>



                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    );
}
