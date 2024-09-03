import * as React from 'react';

import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Usage from "./Usage";
import AddButton from "./AddButton";
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import '@fontsource-variable/raleway';
import Tooltip from '@mui/material/Tooltip';

import DCardGallery from "./DCardGallery";
import DTableView from "./DTableView";


function Dashboard(){

    const [view, setView] = React.useState('gallery');

    const handleChange = (event, nextView) => {
        if (nextView !== null) {
            setView(nextView);
        }
    };

    return(
        <Stack paddingBottom={12} style={{ fontFamily: 'Raleway Variable, sans-serif'}} direction="column" spacing={2}>
            <Usage/>

            <Box display="flex" justifyContent="center" alignItems="center">
            <ToggleButtonGroup
                orientation="horizontal"
                value={view}
                exclusive
                onChange={handleChange}
            >
                <Tooltip title="Gallery View" arrow>
                    <ToggleButton value="gallery" aria-label="gallery">
                        <ViewModuleIcon />
                    </ToggleButton>   
                </Tooltip>

                <Tooltip title="Table View" arrow>
                    <ToggleButton value="table" aria-label="list">
                        <ViewListIcon />
                    </ToggleButton>
                </Tooltip>

            </ToggleButtonGroup>
            </Box>


            {view === "gallery" &&
                <DCardGallery/>
            }

            {view === "table" &&
                <DTableView/>
            }
            <AddButton/>
        </Stack>
    );
}

export default Dashboard;