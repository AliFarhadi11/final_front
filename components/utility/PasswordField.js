import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useState } from "react"
import { StyledTextField } from "./StyledComponents"



export default function PasswordField({ ...props }) {
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = (event) => {
        setShowPassword(!showPassword)
    }
    return (
        <>

            <StyledTextField
                fullWidth size="small" id={props.id}
                label={props.label} variant="outlined"
                type={showPassword ? 'text' : 'password'}
                name={props.id}
                value={props.value}
                onChange={props.handleChange}
                sx={{ my: 3, }}
                {...props}
                InputProps={{
                    endAdornment: <IconButton
                        aria-label="password field"
                        onClick={handleClickShowPassword}
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>,
                }}

            />


        </>
    )
}