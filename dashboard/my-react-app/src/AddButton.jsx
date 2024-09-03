import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const CustomFab = styled(Fab)(({ theme }) => ({
    '&.MuiFab-primary:hover': {
        backgroundColor: theme.palette.primary.main,
    },
}));

const fabStyles = {
    position: 'fixed',
    bottom: 20,
    right: 30,
    transition: 'width 0.3s ease-in-out',
};

const theme = createTheme({
    palette: {
        primary: {
            main: '#5D3FD3',
        },
    },
});

function AddButton() {
    const [isHovered, setIsHovered] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const isLg = useMediaQuery('(min-width:960px)'); // Medium devices (tablets)

    useEffect(() => {
        setShowButton(isLg);
    }, [isLg]);

    return (
        <ThemeProvider theme={theme}>
            {showButton && (
                <CustomFab
                    color="primary"
                    aria-label="add"
                    sx={{
                        ...fabStyles,
                        width: isHovered ? 200 : 56,
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    variant="extended"
                    href="https://www.tubereader.practicalsoftware.com/generate/"
                >
                    {isHovered ? (
                        <Typography variant='body1' noWrap>
                            Generate Article
                        </Typography>
                    ) : (
                        <AddIcon />
                    )}
                </CustomFab>
            )}
        </ThemeProvider>
    );
}

export default AddButton;
