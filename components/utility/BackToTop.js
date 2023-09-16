import { Button } from "@mui/material";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



export default function BackToTop() {

    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    useEffect(() => {

        if (typeof window !== 'undefined') window.addEventListener('scroll', toggleVisible);
    }, [])

    return (
        <IconButton
            onClick={scrollToTop} color="primary" variant="contained" size='small'
            disableElevation={true} disableFocusRipple={true} disableRipple={true}
            sx={{
                display: visible ? 'inline' : 'none',
                position: 'fixed',
                right: 20, bottom: 20, zIndex: 9999, borderRadius: 100,
                backgroundColor: '#99CCF3'

            }}
        > <KeyboardDoubleArrowUpIcon fontSize='large' />  </IconButton>
    )
}
