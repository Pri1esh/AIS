import { BaseSlider, CustomImage } from '@components';
import { ISlider, ISliderGalleryData } from '@interfaces';
import React from 'react';
import styles from './slider.module.scss';

const Slider = (props: ISlider) => {
  const { gallery } = props;

  return (
    <div className={styles.wrapper}>
      <BaseSlider
        isMobSlider={true}
        settings={{
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
          variableWidth: true,
          arrows: true,
          autoplay: true,
          draggable: false,
          autoplaySpeed: 2200,
          cssEase: 'linear',
          pauseOnHover: false,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2.25,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1.5,
                arrows: false,
              },
            },
          ],
        }}
      >
        <React.Fragment key=".0">
          {gallery?.map((item: ISliderGalleryData, index: number) => (
            <div key={`${item?.link + index}`}>
              <div className={styles.item}>
                <a href={item?.link}>
                  {item?.imageSource && (
                    <CustomImage
                      src={{
                        defaultSource: item?.imageSource,
                        mobileSource: item?.imageSourceMobile,
                        tabletSource: item?.imageSourceTablet,
                      }}
                      alt={item?.imageAlt}
                    />
                  )}
                  <span>{item?.label}</span>
                  <div className={styles.gradientWrapper}></div>
                </a>
              </div>
            </div>
          ))}
        </React.Fragment>
      </BaseSlider>
    </div>
  );
};

export default Slider;
