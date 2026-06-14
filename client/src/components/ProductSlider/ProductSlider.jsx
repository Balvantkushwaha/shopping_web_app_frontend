import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './ProductSlider.module.css';
import ProductCard from '../ProductCard/ProductCard';

const ProductSlider = ({ title, products, seeAllLink }) => {
  return (
    <div className={styles.sliderSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {seeAllLink && (
          <button className={styles.seeAllBtn}>See All</button>
        )}
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className={styles.productSwiper}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;