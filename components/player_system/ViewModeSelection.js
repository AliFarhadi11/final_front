import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useSelector, useDispatch } from 'react-redux'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { addContorlers } from '../../redux/reducers';


// toggle-button in system finding and system rating to view cards or tables
export default function ViewModeSelection( ) {
    const dispatch = useDispatch()
    const contorlers = useSelector((state) => state.contorlers.value)
    const handleChangeView = (event, nextView) => {
        if (nextView !== null)
        dispatch(addContorlers({systems_view:nextView}))
    };

    return (
        <ToggleButtonGroup
            orientation="horizontal"
            value={contorlers.systems_view}
            exclusive
            size='small'
            onChange={handleChangeView}
        >
            <ToggleButton value="list" aria-label="list">
                <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="module" aria-label="module">
                <ViewModuleIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
