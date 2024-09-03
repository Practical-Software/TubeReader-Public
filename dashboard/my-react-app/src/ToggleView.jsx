import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

function ToggleView() {
    const [view, setView] = React.useState('list');

    const handleChange = (event, nextView) => {
        setView(nextView);
    };

    return (
        <ToggleButtonGroup
        orientation="horizontal"
        value={view}
        exclusive
        onChange={handleChange}
        >
        <ToggleButton value="gallery" aria-label="gallery">
            <ViewModuleIcon />
        </ToggleButton>    
        <ToggleButton value="list" aria-label="list">
            <ViewListIcon />
        </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default ToggleView;