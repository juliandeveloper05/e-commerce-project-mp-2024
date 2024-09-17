import React from 'react';
import PropTypes from 'prop-types';
import './product-image-slider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';

const ProductImagesSlider = (props) => {
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        className="product-images-slider"
      >
        {props.images.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} alt="product images" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

ProductImagesSlider.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ProductImagesSlider;
