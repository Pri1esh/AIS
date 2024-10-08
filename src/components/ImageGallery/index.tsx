import { BaseSlider } from '@components';
import { IImageGallery, IImageGalleryCarouselItem } from '@interfaces';
import { useDeviceType } from '@utils';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CustomImage from '../CustomImage';
import styles from './imageGallery.module.scss';

const ImageGallery = (props: IImageGallery) => {
  const { compData, containerRequired = true } = props;
  const { carouselData, date = '', title = '', description = '' } = compData;

  const [mainNav, setMainNav] = useState<any>(null);
  const [thumbNav, setThumbNav] = useState<any>(null);
  const [mainSlider, setMainSlider] = useState<any>(null);
  const [thumbSlider, setThumbSlider] = useState<any>(null);
  const { deviceType } = useDeviceType();

  useEffect(() => {
    setMainNav(mainSlider);
    setThumbNav(thumbSlider);
  }, [mainSlider, thumbSlider]);

  const mainNavSettings = {
    arrows: true,
    autoplay: false,
    autoplaySpeed: 2000,
    dots: false,
    infinite: false,
    pauseOnHover: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
    fade: true,
    initialSlide: 0,
    asNavFor: '.slider-nav',
    centerMode: false,
    responsive: [
      { breakpoint: 991, settings: { slidesToShow: 1 } },
      {
        breakpoint: 767,
        settings: { slidesToShow: 1 },
      },
    ],
    swipe: true,
  };
  const thumbNavSettings = {
    centerMode: false,
    asNavFor: '.slider-for',
    dots: false,
    arrows: false,
    swipeToSlide: true,
    focusOnSelect: true,
    infinite: false,
    slidesToShow: 7.25,
    responsive: [
      { breakpoint: 991, settings: { slidesToShow: 4 } },
      {
        breakpoint: 767,
        settings: { slidesToShow: 3.25 },
      },
    ],
  };

  const galleryBody = () => {
    return (
      <div className={styles.wrapper}>
        {carouselData?.length > 0 ? (
          <div className={styles.sliderWrapper}>
            <div className={styles.mainSlider}>
              <BaseSlider
                settings={{ ...mainNavSettings }}
                asNavFor={thumbNav}
                sliderRef={(slider: any) => setMainSlider(slider)}
              >
                <React.Fragment key=".0">
                  {carouselData?.map((item: IImageGalleryCarouselItem, index: number) => (
                    <div className={styles.mainNav} key={`${item?.imageSource + index}`}>
                      <div className={styles.imageWrapper}>
                        {item?.imageSource && (
                          <CustomImage
                            className={styles.image}
                            alt={item?.imageAlt}
                            src={{
                              mobileSource: item?.imageSourceMobile,
                              tabletSource: item?.imageSourceTablet,
                              defaultSource: item?.imageSource,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              </BaseSlider>
            </div>
            {carouselData?.length > 1 && (
              <div className={styles.thumbSlider}>
                <BaseSlider
                  settings={{ ...thumbNavSettings }}
                  asNavFor={mainNav}
                  sliderRef={(slider: any) => setThumbSlider(slider)}
                  key={(deviceType === 'desktop')?.toString()}
                >
                  <React.Fragment key=".0">
                    {carouselData?.map((item: IImageGalleryCarouselItem, index: number) => (
                      <div className={styles.thumbNav} key={`${item?.thumbImageSource + index}`}>
                        <div className={styles.imageWrapper}>
                          {item?.thumbImageSource && (
                            <CustomImage
                              className={styles.image}
                              alt="1111"
                              src={{
                                mobileSource: item?.thumbImageSourceMobile,
                                tabletSource: item?.thumbImageSourceTablet,
                                defaultSource: item?.thumbImageSource,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                </BaseSlider>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
        {(date || title || description) && (
          <div className={styles.textWrapper}>
            {date && <p className={styles.date}>{date}</p>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />}
          </div>
        )}
      </div>
    );
  };
  return deviceType !== 'mobile' && containerRequired ? <Container>{galleryBody()}</Container> : galleryBody();
};

export default ImageGallery;
