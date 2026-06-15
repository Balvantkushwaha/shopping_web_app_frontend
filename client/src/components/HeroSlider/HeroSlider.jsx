import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './HeroSlider.module.css';
import { heroSlides } from '../../data/categories';

const HeroSlider = () => {
  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        // navigation
        className={styles.heroSwiper}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={styles.slide}>
              <div 
                className={styles.slideImage}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className={styles.overlay}>
                  <div className={styles.content}>
                    <h2>{slide.title}</h2>
                    <p>{slide.subtitle}</p>
                    <button className={styles.ctaBtn}>Shop Now</button>
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