import React, { useState, useEffect, useRef } from 'react';

import ArticleCard from "./ArticleCard";
import LoadHamster from './LoadHamster';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import Divider from '@mui/material/Divider';
import Slide from '@mui/material/Slide';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const theme = createTheme({
    palette: {
        primary: {
            main: '#5D3FD3',
        },
        secondary: {
            main: '#8568F7',
        },
    },
});


function DCardGallery(){

    const getArticleUrl = import.meta.env.VITE_GET_ARTICLE_URL;

    const [index, setIndex] = useState(1);

    const targetRef = [useRef(null), useRef(null)];

    const handleIndexChange = (event, value) => {
        setIndex(value);
    };

    useEffect(() => {
        // Scroll to top of Sort & Filters

        if (targetRef[0].current) {
            targetRef[0].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.scrollBy({ top: -5, behavior: 'smooth' });
        }

        if (targetRef[1].current) {
            targetRef[1].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.scrollBy({ top: -8, behavior: 'smooth' });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    const [numPages, setNumPages] = useState(3);

    const [allArticles, setAllArticles] = useState([]);

    const [languageList, setLanguageList] = useState([]);

    const [categoryList, setCategoryList] = useState([]);

    const [channel, setChannel] = useState("");

    const [articleTitle, setArticleTitle] = useState("");

    const [channelList, setChannelList] = useState([]);

    const [articleTitleList, setArticleTitleList] = useState([]);

    const [defaultTitles, setDefaultTitles] = useState([]);

    const [defaultChannels, setDefaultChannels] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [numCards, setNumCards] = useState(0);

    const [bottom, setBottom] = useState(20);


    const handleDialogOpen = () => {
        setOpenDialog(true);
    };
    
    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const [category, setCategory] = React.useState('');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const [language, setLanguage] = React.useState('');

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const [sortBy, setSortBy] = React.useState('');

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    useEffect(() => {

        fetch(`${getArticleUrl}?index=-2`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(function(response){

            return response.json();

        }).then(function(data){

            //console.log(data);

            setNumPages(Math.ceil(data.numRows / 6));

            //console.log(data.numRows);

            setLanguageList(data.languages);

            setCategoryList(data.categories);

            setDefaultTitles(data.titles);

            setArticleTitleList(data.titles);

            setDefaultChannels(data.channels);

            setChannelList(data.channels);


            
        });
    }, []);

    useEffect(() => {

        var endpoint = `${getArticleUrl}?index=${index-1}`;

        if (category) {
            endpoint += `&category=${category}`;
        }

        if (language) {
            endpoint += `&language=${encodeURIComponent(language)}`;
        }

        if (channel) {
            endpoint += `&channel=${encodeURIComponent(channel)}`;
        }

        if (articleTitle) {
            endpoint += `&articleTitle=${encodeURIComponent(articleTitle)}`;
        }

        if (sortBy) {
            endpoint += `&sortBy=${encodeURIComponent(sortBy)}`;
        }

        fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(function(response){

            return response.json();

        }).then(function(data){

            const articles = data;
            //console.log(data);
            setAllArticles(articles.rows);

            setNumCards(allArticles.length);

            /*

            const languageSet = new Set();

            for (const article of articles) {
                languageSet.add(article.language);
            }

            setLanguageList([...languageSet]);

            */
            
        });


    }, [index, category, language, channel, articleTitle, sortBy]); // Will update based on pagination index update

    const [isScrolled, setIsScrolled] = useState(false);
    
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const [contentHeight, setContentHeight] = useState(document.body.scrollHeight);


    useEffect(() => {
      const handleResize = () => setWindowHeight(window.innerHeight);
  
      window.addEventListener('resize', handleResize);
      
      // Cleanup function to remove the event listener
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleContentHeightChange = () => {
          setContentHeight(document.body.scrollHeight);
        };
    
        window.addEventListener('resize', handleContentHeightChange);
    
        // Cleanup function to remove the event listener
        return () => window.removeEventListener('resize', handleContentHeightChange);
    }, []);
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY; // or window.pageYOffset;
    
            const threshold = (scroll, wHeight, cHeight) => {
                if (scroll > 0) {
                    return 0;
                } else if (scroll === 0 && wHeight > cHeight-400) {
                    return -1;
                }
            };

            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            //console.log(scrollPosition + clientHeight >= scrollHeight - 43);

            if (scrollPosition + clientHeight >= scrollHeight - 43 && scrollPosition != 0) {
                setBottom(90);
            } else {
                setBottom(20);
            }
    
            //console.log(windowHeight + ' ' + contentHeight + ' ');
            //console.log(threshold(scrollPosition, windowHeight, contentHeight));
    
            setIsScrolled(scrollPosition > threshold(scrollPosition, windowHeight, contentHeight));
        };
    
        // Run handleScroll on initial render
        handleScroll();
    
        // Add event listener
        window.addEventListener('scroll', handleScroll);
    
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [windowHeight, contentHeight, numCards]);
    
    


    /*
    const categoryList = [
        "Art",
        "Business",
        "Cooking",
        "Crafts",
        "Education",
        "Entertainment",
        "Gaming",
        "Health",
        "History",
        "Language",
        "Misc",
        "Motivation",
        "Music",
        "Politics",
        "Science",
        "Sports",
        "Technology"
    ];
    */
    var debounceTimer;

    function searchTitle(title) {
        // Clear any previously scheduled debounce call
        clearTimeout(debounceTimer);
    
        // Set a new debounce call after 300 milliseconds
        debounceTimer = setTimeout(function() {
            var endpoint = `${getArticleUrl}?index=-3`;
    
            if (title) {
                endpoint += `&articleTitle=${encodeURIComponent(title)}`;
    
                fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    setArticleTitleList(data.titles);
                });
            }
        }, 3);
    }

    function searchChannel(channel) {
        // Clear any previously scheduled debounce call
        clearTimeout(debounceTimer);
    
        // Set a new debounce call after 300 milliseconds
        debounceTimer = setTimeout(function() {
            var endpoint = `${getArticleUrl}?index=-3`;
    
            if (channel) {

                //console.log(channel);

                endpoint += `&channel=${encodeURIComponent(channel)}`;
            
                fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    setChannelList(data.channels);

                    if (data.channels == [] || data.channels == undefined) {
                        setChannelList([]);
                    }
                });
            }
        }, 3);
    }


    const selectCategoryOptions = [
        <MenuItem key="Category" value="">
            ‎ 
        </MenuItem>,
        ...categoryList.map(option => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
        ))
    ];
    
    const selectLanguageOptions = [
        <MenuItem key="Language" value="">
            ‎ 
        </MenuItem>,
        ...languageList.map(option => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
        ))
    ];

    const sortList = [
        "Article Creation Date (Descending)",
        "Article Creation Date (Ascending)",
        "YouTube Publish Date (Descending)",
        "YouTube Publish Date (Ascending)",
        "View Count (Descending)",
        "View Count (Ascending)",
    ];

    const selectSortOptions = [
        <MenuItem key="Sort" value="">
            ‎ 
        </MenuItem>,
        ...sortList.map(option => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
        ))
    ];
    


    const listingCards = allArticles.map((article) => (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4} 
        key={parseInt(article.article_id)}
        //ref={idx === 0 ? targetRef : null}
        >
            <ArticleCard 
                id={parseInt(article.article_id)}
                youtube_id={article.youtube_id}D
                file_name={article.file_name}
                title={article.title}
                author={article.youtube_author}
                category={article.category}
                date_uploaded={article.date_uploaded}
                date_article_created={article.date_article_created}
                language={article.language}
                word_count={article.word_count}
                visibility={article.visibility}
                thumbnail_url={article.thumbnail_url}
                mature_flag={article.mature_flag}
            />
        </Grid>
    ));

    

    return (
        <ThemeProvider theme={theme}>
        {/* { !allArticles &&
        <Box
        style={{ 
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center"
        }}>
            <LoadHamster/>
        </Box>
        } */}
        <Box>
            <Stack direction="column" spacing={3} 
                sx={{
                    paddingRight: [4, 7, 10],   // xs: 4, sm: 7, md: 10
                    paddingLeft: [4, 7, 10]  ,   // xs: 4, sm: 7, md: 10
                }}
                >

                <Box
                    align="center"
                    sx = {{
                        display: {
                            xs:'block',
                            sm:'block',
                            md:'block',
                            lg:'none',
                            xl:'none',
                        }
                    }}
                    ref={targetRef[0]}

                >
                    <Button variant="outlined" onClick={handleDialogOpen}>
                        <FontAwesomeIcon icon={faFilter} size="lg" style={{ marginRight: "0.3em" }}/>
                        Filters & Sort
                    </Button>
                </Box>

                <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                >
                    <DialogTitle id="alert-dialog-title">
                        Filter
                    </DialogTitle>
                    <Divider sx={{backgroundColor:"gray"}}/>
                    <DialogContent>
                    <IconButton
                        aria-label="close"
                        onClick={handleDialogClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                    <CloseIcon />
                    </IconButton>
                        <Stack direction="row" spacing={2} justifyContent="center" useFlexGap flexWrap="wrap">

                        <FormControl sx={{
                            minWidth: {
                                xs: "63%",

                            },
                        }}>
                            <InputLabel id="sort-select-label">Sort</InputLabel>
                            <Select
                                labelId="sort-select-label"
                                id="sort-select"
                                value={sortBy}
                                label="Sort By"
                                onChange={handleSortChange}
                            >
                                {selectSortOptions}
                            </Select>
                        </FormControl>
                        
                        <Autocomplete 
                            disablePortal
                            id="articleTitle"
                            options={articleTitleList}
                            sx={{
                                minWidth: {
                                    xs: "63%",
                                },
                            }}
                            onChange={(event, newValue) => {
                                setArticleTitle(newValue);
                            }}
                            onInputChange={(event, newValue) => {
                                if (newValue) {
                                    searchTitle(newValue);
                                } else {
                                    setArticleTitleList(defaultTitles);
                                }
                            }}
                            renderInput={(params) => <TextField {...params} label="Article Title" />}
                        />
                        <Autocomplete
                            disablePortal
                            id="ytChannel"
                            options={channelList}
                            sx={{
                                minWidth: {
                                    xs: "63%",
                                },
                            }}
                            onChange={(event, newValue) => {
                                setChannel(newValue);
                            }}
                            onInputChange={(event, newValue) => {
                                if (newValue) {
                                    searchChannel(newValue);
                                } else {
                                    setChannelList(defaultChannels);
                                }
                            }}
                            renderInput={(params) => <TextField {...params} label="YouTube Channel" />}
                        />

                        <FormControl sx={{
                            minWidth: {
                                xs: "63%",

                            },
                        }}>
                            <InputLabel id="category-select-label">Category</InputLabel>
                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                value={category}
                                label="Category"
                                onChange={handleCategoryChange}
                            >
                                {selectCategoryOptions}
                            </Select>
                        </FormControl>

                        <FormControl sx={{
                            minWidth: {
                                xs: "63%",

                            },
                        }}>
                            <InputLabel id="language-select-label">Language</InputLabel>
                            <Select
                                labelId="language-select-label"
                                id="language-select"
                                value={language}
                                label="Language"
                                onChange={handleLanguageChange}
                            >
                                {selectLanguageOptions}
                            </Select>
                        </FormControl>

                    </Stack>
                    </DialogContent>
                </Dialog>
                <Box 
                    sx = {{
                        display: {
                            xs:'none',
                            sm:'none',
                            md:'none',
                            lg:'block',
                            xl:'block',
                        }
                    }}
                    ref={targetRef[1]}
                >
                
                <Stack direction="row" spacing={2} justifyContent="center" useFlexGap flexWrap="wrap">
                    
                    <Autocomplete 
                        disablePortal
                        id="articleTitle"
                        options={articleTitleList}
                        sx={{
                            minWidth: {
                                xs: "63%",
                                sm: "40%",
                                md: "20em",
                            },
                        }}
                        onChange={(event, newValue) => {
                            setArticleTitle(newValue);
                        }}
                        onInputChange={(event, newValue) => {
                            if (newValue) {
                                searchTitle(newValue);
                            } else {
                                setArticleTitleList(defaultTitles);
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Article Title" />}
                    />
                    <Autocomplete
                        disablePortal
                        id="ytChannel"
                        options={channelList}
                        sx={{
                            minWidth: {
                                xs: "63%",
                                sm: "40%",
                                md: "16em",
                            },
                        }}
                        onChange={(event, newValue) => {
                            setChannel(newValue);
                        }}
                        onInputChange={(event, newValue) => {
                            if (newValue) {
                                searchChannel(newValue);
                            } else {
                                setChannelList(defaultChannels);
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="YouTube Channel" />}
                    />

                    <FormControl sx={{
                        minWidth: {
                            xs: "63%",
                            sm: "30%",
                            md: "8em",
                        },
                    }}>
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={category}
                            label="Category"
                            onChange={handleCategoryChange}
                        >
                            {selectCategoryOptions}
                        </Select>
                    </FormControl>

                    <FormControl sx={{
                        minWidth: {
                            xs: "63%",
                            sm: "30%",
                            md: "9em",
                        },
                    }}>
                        <InputLabel id="language-select-label">Language</InputLabel>
                        <Select
                            labelId="language-select-label"
                            id="language-select"
                            value={language}
                            label="Language"
                            onChange={handleLanguageChange}
                        >
                            {selectLanguageOptions}
                        </Select>
                    </FormControl>
                    <FormControl sx={{
                        minWidth: {
                            xs: "63%",
                            sm: "30%",
                            md: "6em",
                        },
                    }}>
                        <InputLabel id="sort-select-label">Sort</InputLabel>
                        <Select
                            labelId="sort-select-label"
                            id="sort-select"
                            value={sortBy}
                            label="Sort By"
                            onChange={handleSortChange}
                        >
                            {selectSortOptions}
                        </Select>
                    </FormControl>
                </Stack>

                </Box>

                <Box align="center">
                    <Grid
                    container
                    spacing={4}
                    sx={{ 
                        width: {
                            xs: "90%",
                            sm: "80%",
                            md: "70%",
                            lg: "70%",

                        } 
                    }}
                    >
                        {listingCards}
                    </Grid>
                </Box>


            </Stack>

            {numPages > 1 &&
            <>
                <Slide direction="up" in={isScrolled} mountOnEnter unmountOnExit>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        position: 'fixed',
                        bottom: {bottom},
                        width: '100%',
                        zIndex: 1000, 
                    }}
                >
                    <Grid item>
                        <Pagination 
                            count={numPages}
                            //count={1}
                            siblingCount={0}
                            defaultPage={1}
                            size="large"
                            variant='outlined'
                            color="primary"
                            sx={{
                                p: 0.5,
                                pl: 2 ,
                                pr: 2 ,
                                backgroundColor: "rgba(246, 246, 246, 0.8)",
                                border:'#D2D2D2 solid 1px',
                                borderRadius: 90,
                            }}
                            page={index}
                            onChange={handleIndexChange}
                        />
                    </Grid>
                </Grid>
                </Slide>
            </>
            }
        </Box>
        </ThemeProvider>


    );
}


export default DCardGallery;