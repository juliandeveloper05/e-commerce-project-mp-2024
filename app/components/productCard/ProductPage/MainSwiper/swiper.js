import React from 'react';
import stylesSass from './swiper.modules.scss';

export default function MainSwiper() {
  return (
    <div className={stylesSass.swiper}>
      <div className={stylesSass.swiper__active}>
        <div className={stylesSass.swiper__list}></div>
        <div className={sassStyles.swiper__list}>
          {images.map((img, i) => (
            <div className={`${stylesSass.swiper__list__list_item}`} key={i}>
              <img src={img.url} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
