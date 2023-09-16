import { Box, Fab, Fade } from "@mui/material";
import { useEffect, useState } from "react";
import {KeyboardArrowUp} from '@mui/icons-material';

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
        <Fade in={visible}  >
            <Box 
                onClick={scrollToTop}
                role="presentation"
                sx={{
                    position: 'fixed', bottom: 16,
                    right: 16 ,
                    zIndex:1000
                }}
            >
                <Fab size="small" sx={{ backgroundColor: 'primary.light' }} aria-label="scroll back to top">
                    <KeyboardArrowUp />
                </Fab>
            </Box>
        </Fade>
    )
}
