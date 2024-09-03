import React, { useState, useEffect, useRef } from 'react';
import ArticleCard from "./ArticleCard";

import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline';  // Import CssBaseline

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Mousewheel, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';


function ArticleList() {
    const [featuredArticles, setFeaturedArticles] = useState([]);

    useEffect(() => {

        fetch(`https://www.tubereader.practicalsoftware.com/php/get-all-articles.php?index=-1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(function(response){

            return response.json();

        }).then(function(data){

            console.log(data);
            const featured = data;

            //articles.sort(function(a, b){return b.view_count - a.view_count});

            //const featured = articles.slice(0, 7);

            //console.log(articles);
            //console.error(featured);

            setFeaturedArticles(featured);


            
        });
    }, []); // Empty dependency array means this effect runs once after the initial render

    const listingCards = featuredArticles.map(article => (
        <SwiperSlide key={parseInt(article.article_id)}>
            <ArticleCard 
                id={parseInt(article.article_id)}
                youtube_id={article.youtube_id}
                file_name={article.file_name}
                title={article.title}
                author={article.youtube_author}
                category={article.category}
                date_uploaded={article.date_uploaded}
                language={article.language}
                word_count={article.word_count}
                thumbnail_url={article.thumbnail_url}
                date_article_created={article.date_article_created}
                mature_flag={article.mature_flag}
            />
        </SwiperSlide>
    ));

    return(
        <div>
            <CssBaseline/>  {/* Add CssBaseline to reset default browser styling */}
            <Container>
            <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
            }}
            pagination={{
                clickable: true,
            }}
            mousewheel={true}
            navigation={true}
            modules={[Autoplay, Mousewheel, EffectCoverflow, Pagination, Navigation]}
            breakpoints={{
                640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }}
            className="mySwiper"
            style={{ 
                "--swiper-pagination-color": "#5D3FD3",
                "--swiper-navigation-color": "#5D3FD3",
            }}
        >
                    {listingCards}
                </Swiper>  
            </Container>
        </div>
    );
}

export default ArticleList;
