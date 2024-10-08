import { BaseSlider, CustomImage, CustomLink } from '@components';
import { ICardSliderData, ISliderCardData } from '@interfaces';
import { GTMHelper } from '@utils';
import React from 'react';
import styles from './slider.module.scss';

const Slider = (props: ICardSliderData) => {
  const { cardDetails } = props;

  const getCardVariant = (variant: string) => {
    switch (variant) {
      case 'secondary':
        return styles.textWrapper;
      case 'falilityCard':
        return styles.headingWrapper;
      default:
        return styles.textContainer;
    }
  };

  const sliderCard = (item: ISliderCardData) => {
    return (
      <div className={styles.item}>
        {item.imageSource && (
          <CustomImage
            src={{
              mobileSource: item?.imageSourceMobile,
              tabletSource: item?.imageSourceTablet,
              defaultSource: item?.imageSource,
            }}
            alt={item.imageAlt}
          />
        )}

        <div className={getCardVariant(cardDetails?.variant || '')}>
          {item?.heading && <h3>{item?.heading}</h3>}
          {item?.description && <p>{item?.description}</p>}
          {item?.date && <p>{item?.date}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <BaseSlider
        isMobSlider={true}
        settings={{
          dots: false,
          infinite: false,
          speed: 400,
          slidesToShow: 3.4,
          slidesToScroll: 1,
          arrows: true,
          autoplay: false,
          autoplaySpeed: 2200,
          cssEase: 'linear',
          pauseOnHover: false,
          responsive: [
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 2.4,
              },
            },

            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1.4,
              },
            },
          ],
        }}
      >
        <React.Fragment key=".0">
          {cardDetails?.gallery?.map((item: ISliderCardData, key: number) => (
            <div key={`${item?.link + key}`} className={styles.itemWrapper}>
              {item?.link ? (
                <CustomLink
                  variant={'anchor'}
                  href={item?.link}
                  target={item?.target}
                  onClick={() => {
                    GTMHelper({
                      ...item?.gtmData,
                    });
                  }}
                >
                  {sliderCard(item)}
                </CustomLink>
              ) : (
                sliderCard(item)
              )}
            </div>
          ))}
        </React.Fragment>
      </BaseSlider>
    </div>
  );
};

export default Slider;
