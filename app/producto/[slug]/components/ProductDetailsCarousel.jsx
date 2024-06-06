import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';

const ProductDetailsCarousel = ({ mainImage, images }) => {
  const renderCustomArrowPrev = (onClickHandler, hasPrev) => (
    <button
      type="button"
      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-gray-100 p-2 transition-colors duration-300 hover:bg-gray-200"
      onClick={onClickHandler}
      disabled={!hasPrev}
    >
      <svg
        className="h-6 w-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );

  const renderCustomArrowNext = (onClickHandler, hasNext) => (
    <button
      type="button"
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-gray-100 p-2 transition-colors duration-300 hover:bg-gray-200"
      onClick={onClickHandler}
      disabled={!hasNext}
    >
      <svg
        className="h-6 w-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );

  return (
    <div className="relative mx-auto w-full max-w-[1800px] select-none text-[20px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        showThumbs={true}
        thumbWidth={60}
        swipeable={false}
        autoPlay={false}
        renderArrowPrev={renderCustomArrowPrev}
        renderArrowNext={renderCustomArrowNext}
        className="productCarousel"
      >
        <div>
          <img src={mainImage} width={1000} height={1000} alt="Main" />
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
