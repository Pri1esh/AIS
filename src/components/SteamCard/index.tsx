import { BaseSlider, CustomImage } from '@components';
import { ISteamCard } from '@interfaces';
import { useDeviceType } from '@utils';
import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './steamCard.module.scss';

const SteamCard = (props: ISteamCard) => {
  const { compData } = props;
  const { deviceType } = useDeviceType();

  const getTheme = (theme: string) => {
    switch (true) {
      case theme?.includes('blue'):
        return styles.blueWrapper;
      case theme?.includes('purple'):
        return styles.purpleWrapper;
      default:
        return '';
    }
  };

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.textWrapper}>
          {compData?.subHeading && <p className={styles.subHeading}>{compData?.subHeading}</p>}
          {compData?.heading && <h2 className={styles.heading}>{compData?.heading}</h2>}
          {compData?.description && <p className={styles.description}>{compData?.description}</p>}
        </div>
        <div className={styles.cardWrapper}>
          {deviceType !== 'desktop' ? (
            <BaseSlider
              isMobSlider={true}
              isTabSlider={true}
              settings={{
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
                autoplay: false,
                draggable: true,
                autoplaySpeed: 0,
                cssEase: 'linear',
                pauseOnHover: false,
                responsive: [
                  {
                    breakpoint: 991,
                    settings: {
                      slidesToShow: 1.5,
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
                {compData?.learningStoryListData?.map((item, index) => (
                  <div key={`${item?.label + index}`} className={`${styles.contentWrapper} ${getTheme(item?.theme)}`}>
                    {item?.imageSource && (
                      <CustomImage
                        src={{
                          mobileSource: item?.imageSourceMobile,
                          tabletSource: item?.imageSourceTablet,
                          defaultSource: item?.imageSource,
                        }}
                        alt={item?.imageAlt}
                      />
                    )}
                    <span>{item?.label}</span>
                  </div>
                ))}
              </React.Fragment>
            </BaseSlider>
          ) : (
            compData?.learningStoryListData?.map((item, index) => (
              <div
                key={`${index + (item?.imageAlt || '')}`}
                className={`${styles.contentWrapper} ${getTheme(item?.theme)}`}
              >
                {item?.imageSource && (
                  <CustomImage
                    src={{
                      mobileSource: item?.imageSourceMobile,
                      tabletSource: item?.imageSourceTablet,
                      defaultSource: item?.imageSource,
                    }}
                    alt={item?.imageAlt}
                  />
                )}
                <span>{item?.label}</span>
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default SteamCard;
