import ArticleList from "./ArticleList";
import DCardGallery from "./DCardGallery";

import Stack from '@mui/material/Stack';

import '@fontsource-variable/raleway';
import { Typography } from "@mui/material";


function App(){
    return(
        <Stack style={{ fontFamily: 'Raleway Variable, sans-serif'}} paddingBottom={12} direction="column" spacing={4}>
            <Typography pt={3} variant="h3" style={{ fontFamily: 'Raleway Variable, sans-serif'}} textAlign={"center"} >Featured Articles</Typography>
            <ArticleList/>
            <DCardGallery/>
        </Stack>
    );
}

export default App;