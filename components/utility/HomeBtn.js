import { Button } from "@mui/material";

export default function HomeBtn(props) {

    return (
        <Button size="large" variant="contained"
            color={props.color}
            sx={{ borderRadius: 2, color: 'black', fontSize: '20px',
            textDecoration: 'none', fontWeight: 700, ...props.sx }} >
            {props.text} </Button>
    )
}