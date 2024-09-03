import * as React from 'react';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import '@fontsource-variable/raleway';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';


function ArticleCard(props) {
    const { youtube_id, title, author, date_uploaded, file_name, category, language, word_count, visibility, thumbnail_url, mature_flag, date_article_created } = props;

    // Convert MySQL timestamp to a JavaScript Date object
    const formattedDate = new Date(date_article_created).toLocaleDateString();

    const articleUrl = `https://tubereader.practicalsoftware.com/article/${file_name}.php`;

    const readTime = Math.floor(word_count / 190);

    return (
        <Card align="left" sx={{ 
            minWidth: 150,
            maxWidth: 360, 
            maxHeight: 600,
            boxShadow: 7,
            margin: 'auto',
            fontFamily: 'Raleway Variable, sans-serif',
        }}>
            <CardActionArea component="a" href={articleUrl} target="_blank">
                <CardMedia
                    sx={{
                        height: {
                            xs: 180,
                            sm: 190, 
                            md: 200,
                        },
                    }}
                    image={thumbnail_url}
                    title={title}
                />
                <CardContent>
                    <Stack
                        direction="column"
                        justifyContent="space-between"
                        spacing={2}
                    >
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                                mb={1}
                            >
                                <Typography gutterBottom variant="body2" color="text.secondary">
                                    {category}
                                </Typography>
                                <Typography gutterBottom variant="body2" color="text.secondary" sx={{fontWeight: 'bold'}}>
                                    {visibility}
                                </Typography>
                                { mature_flag == 1 &&
                                
                                <Tooltip
                                    title="Potential mature content"
                                    placement="left"
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 150 }}
                                >
                                    <FontAwesomeIcon color='#ff595e' icon={faFlag} size="sm"/>
                                </Tooltip>
                                }

                            </Box>
                            <Typography 
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{
                                    fontSize: {
                                        xs: '1.1em',
                                        sm: '1.2em', 
                                        md: '1.3em',
                                        lg: '1.4em',
                                    },
                                }}
                            >
                                {title}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                sx={{
                                    fontSize: {
                                        xs: '1.0em',
                                        sm: '1.1em', 
                                        md: '1.2em',
                                    },
                                }}
                                display="inline"
                            >
                                {author}
                            </Typography>
                        </Box>

                        <Box>
                            <Divider variant='fullWidth' sx={{backgroundColor:"gray"}}/>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                                mt={2}
                            >
                                <Typography variant="body1" component="div">
                                    {formattedDate}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {/* <FontAwesomeIcon icon={faStopwatch} size="lg" style={{ marginRight: "0.3em" }} /> */}
                                    {/* {readTime} */}

                                    <FontAwesomeIcon icon={faLanguage} size="lg" style={{ marginRight: "0.3em" }}/>
                                    {language}
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>



                </CardContent>
                
            </CardActionArea>
        </Card>
    );
}

ArticleCard.propTypes = {
    id: PropTypes.number.isRequired,
    youtube_id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date_uploaded: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    word_count: PropTypes.number.isRequired,
    thumbnail_url: PropTypes.string.isRequired,
    mature_flag: PropTypes.number.isRequired,
    date_article_created: PropTypes.string.isRequired,
};


export default ArticleCard;
