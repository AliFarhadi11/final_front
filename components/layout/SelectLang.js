import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { Grid, IconButton,  } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addContorlers,  } from "../../redux/reducers";
import Image from "next/image";
import lang_icon from "../../public/images/lang_icon.svg";

export default function SelectLang() {
    const dispatch = useDispatch();
    const contorlers = useSelector((state) => state.contorlers.value);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleShowMenu = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleChange = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
        dispatch(addContorlers({ lang: event.target.id }));
        localStorage.setItem("lang", event.target.id);
    };

    const handleCloseMenu = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
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
        <Stack direction="row" spacing={2} zIndex={999}>
            <div>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <IconButton
                        ref={anchorRef}
                        id="language-selection-button"
                        aria-controls={open ? "language-selection" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleShowMenu}>
                        <Image src={lang_icon} alt="lang_icon" unoptimized width={40} height={40} />
                    </IconButton>
                </Grid>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
                            }}>
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseMenu}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="language-selection"
                                        aria-labelledby="language-selection-button"
                                        onKeyDown={handleListKeyDown}>
                                        <Button
                                            fullWidth
                                            color={contorlers.lang === "fa" ? "primary" : "inherit"}
                                            onClick={(event) => handleChange(event)}
                                            id="fa">
                                            Persian
                                        </Button>
                                        <Button
                                            fullWidth
                                            color={contorlers.lang === "en" ? "primary" : "inherit"}
                                            onClick={(event) => handleChange(event)}
                                            id="en">
                                            English
                                        </Button>
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
