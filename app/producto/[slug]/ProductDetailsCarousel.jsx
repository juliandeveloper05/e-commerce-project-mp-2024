import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';

const ProductDetailsCarousel = ({ mainImage, images }) => {
  return (
    <div className="sticky top-[50px] mx-auto w-full max-w-[1360px] text-[20px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        <div>
          <img src={mainImage} alt="Main" />
        </div>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

ProductDetailsCarousel.propTypes = {
  mainImage: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductDetailsCarousel;
