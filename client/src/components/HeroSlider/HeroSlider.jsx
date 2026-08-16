// HeroSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './HeroSlider.module.css';
import { heroSlides } from '../../data/categories';
import { useNavigate } from 'react-router-dom';

const HeroSlider = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/search?category=${categoryName.toLowerCase()}`);
  };

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        loop={true}
        speed={600}
        className={styles.heroSwiper}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={styles.slide}
              onClick={() => handleCategoryClick(slide.category)}
            >
              <div
                className={styles.slideImage}
                style={{ backgroundImage: `url(${slide.image})` }}
                role="img"
                aria-label={slide.title}
              >
                <div className={styles.overlay}>
                  <div className={styles.contentWrapper}>
                    <div className={styles.content}>
                      <span className={styles.categoryTag}>{slide.category}</span>
                      <h2 className={styles.title}>{slide.title}</h2>
                      <p className={styles.subtitle}>{slide.subtitle}</p>
                      <p className={styles.description}>{slide.description}</p>
                      <button className={styles.exploreBtn}>
                        <span>{slide.cta}</span>
                        <svg
                          className={styles.btnArrow}
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;