import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';


import './font.css';
import '@fontsource/comfortaa'; // Defaults to weight 400



const theme = createTheme({
    palette: {
        iris: {
            main: '#5D3FD3',
            light: '#8689E1',
            dark: '#3E2A8C',
            contrastText: '#242105',
        },
    },
});


// eslint-disable-next-line no-undef, no-unused-vars
var myCircle;

function Usage() {

    const [username, setUsername] = useState("...");

    const [creditsUsed, setCreditsUsed] = useState(0);

    const [creditLimit, setCreditLimit] = useState(0); 

    const [circleColor, setCircleColor] = useState(['#D3B6C6', '#5D3FD3']);

    const [animationDuration, setAnimationDuration] = useState(350);

    const [radius, setRadius] = useState(90);

    const [ringWidth, setRingWidth] = useState(20);
    
    const [buttonObject, setButtonObject] = useState(
        <Button
        color='iris'
        sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 'bold' }}
        variant='outlined'
        size="medium"
        href="https://www.tubereader.practicalsoftware.com/buy/"

        >Add More</Button>
    );

    const isXs = useMediaQuery('(max-width:600px)'); // Extra small devices (portrait phones)
    const isSm = useMediaQuery('(min-width:601px) and (max-width:959px)'); // Small devices (landscape phones)
    const isMd = useMediaQuery('(min-width:960px) and (max-width:1279px)'); // Medium devices (tablets)
    const isLg = useMediaQuery('(min-width:1280px) and (max-width:1919px)'); // Large devices (desktops)
    const isXl = useMediaQuery('(min-width:1920px)'); // Extra large devices (large desktops)

    useEffect( () => {
        if (isXs) {
            setRadius(50);
            setRingWidth(11);
            setButtonObject(
                <Button
                color='iris'
                sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 'bold' }}
                variant='outlined'
                size="small"
                href="https://www.tubereader.practicalsoftware.com/buy/"
                >Add More</Button>
            );
        } else if (isSm) {
            setRadius(62);
            setRingWidth(17);
            setButtonObject(
                <Button
                color='iris'
                sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 'bold' }}
                variant='outlined'
                size="medium"
                href="https://www.tubereader.practicalsoftware.com/buy/"
                >Add More</Button>
            );
        } else if (isMd){
            setRadius(90);
            setRingWidth(20);
            setButtonObject(
                <Button
                color='iris'
                sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 'bold' }}
                variant='outlined'
                size="medium"
                href="https://www.tubereader.practicalsoftware.com/buy/"
                >Add More</Button>
            );
        } else {
            setRadius(100);
            setRingWidth(24);
            setButtonObject(
                <Button
                color='iris'
                sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 'bold' }}
                variant='outlined'
                size="large"
                href="https://www.tubereader.practicalsoftware.com/buy/"
                >Add More</Button>
            );
        }
    }, [isMd, isSm, isXs]);

    useEffect(() => {
        fetch(`https://www.tubereader.practicalsoftware.com/php/get-usage.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(function(response){

            return response.json();

        }).then(function(data){

            const usageData = data[0];

            setUsername(usageData.display_name);

            setCreditsUsed(usageData.usage_count);

            setCreditLimit(usageData.usage_limit);

            // setCreditsUsed(33);

            // setCreditLimit(50);

            if ( ((creditLimit - creditsUsed) / creditLimit) >= 0.7 ) {
                setCircleColor(["#cfdfb4", "#8ac926"]);
                setAnimationDuration(450);

                
            }
            if ( ((creditLimit - creditsUsed) / creditLimit) < 0.7 && ((creditLimit - creditsUsed) / creditLimit) >= 0.3 ) {
                setCircleColor(["#fff0c9", "#ffca3a"]);
                setAnimationDuration(350);
            }
            if ( ((creditLimit - creditsUsed) / creditLimit) < 0.3  ) {
                setCircleColor(["#ffd2d2","#ff595e"]);
                setAnimationDuration(220);
            }

        });
    }, [creditLimit, creditsUsed]);

    useEffect(() => {
        myCircle = Circles.create({
            id: 'remainingCircle',
            radius: radius,
            value:(creditLimit - creditsUsed),
            maxValue: creditLimit,
            width: ringWidth,
            text: function(value) { return value; },
            colors: circleColor,
            duration: animationDuration,
        });
    }, [animationDuration, circleColor, creditLimit, creditsUsed, radius, ringWidth]);



    

    return (
        <ThemeProvider theme={theme}>
        <Stack className='raleway' sx={{ pl: 2, pr: 2, pt: 3 }} direction="row" spacing={4} justifyContent="center" useFlexGap flexWrap="wrap">
            <Card sx={{ pl: 3, pr: 3, pb: 3, pt: 3 }}>
                <CardContent> 
                    <Grid container spacing={0}>
                        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="circle" id="remainingCircle" style={{ margin: 0, padding: 0, fontFamily: 'Comfortaa' }}></div>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={3}>
                                <Typography
                                    align="center"
                                    sx={{
                                        fontFamily: 'Raleway, sans-serif',
                                        fontSize: {
                                            xs: "1.55em",
                                            sm: "2em",
                                            md: "2.3em",
                                            lg: "3em",
                                        }

                                    }}
                                    variant="h3"
                                >
                                    Credits Remaining
                                </Typography>
                                {buttonObject}
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {/* <Card sx={{ pl: 5, pr: 5, pb: 3, pt: 3, display: "flex" }}>
                <Typography className='raleway' variant="h3">Credits Remaining</Typography>
            </Card> */}
        </Stack>
        </ThemeProvider>
    );
}

export default Usage;
