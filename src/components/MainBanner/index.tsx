import { BaseSlider, CustomImage, CustomLink, CustomVideo } from '@components';
import { IMainBanner, IMainBannerMedia } from '@interfaces';
import { GTMHelper } from '@utils';
import React from 'react';
import styles from './mainBanner.module.scss';

const MainBanner = (props: IMainBanner) => {
  const { compData } = props;
  const { subHeading, link, linkText, data, heading, target = '' } = compData;

  return (
    <section className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        {subHeading && <p className={`${styles.subHeading} ${styles.slideUp}`}>{subHeading}</p>}
        {heading && <h1 className={`${styles.heading} ${styles.slideUp}`}>{heading}</h1>}
        {link && (
          <div className={`${styles.btnWrapper} ${styles?.slideUp}`}>
            <CustomLink
              href={link}
              variant={'button'}
              target={target}
              onClick={() => {
                GTMHelper({ ...compData?.gtmData });
              }}
            >
              {linkText}
            </CustomLink>
          </div>
        )}
      </div>
      <BaseSlider
        settings={{
          dots: true,
          infinite: true,
          speed: 800,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          autoplay: true,
          autoplaySpeed: 5000,
          arrows: false,
          pauseOnHover: false,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        }}
      >
        <React.Fragment key=".0">
          {data?.map((item: IMainBannerMedia, index: number) => (
            <div key={`${(item?.videoSourceMobile || item?.imageSource) + index}`}>
              <>
                {item?.mediaType === 'video' ? (
                  <div className={styles.videoWrapper}>
                    <CustomVideo
                      compData={{
                        defaultVideoSource: item?.videoSource,
                        defaultVideoSourceOgg: item?.videoSourceOGG,
                        isOverlayRequired: item?.isOverlayRequired,
                        autoplay: item?.autoplay,
                        defaultVideoSourceMobile: item?.videoSourceMobile,
                        defaultVideoSourceMobileOgg: item?.videoSourceMobileOGG,
                        defaultVideoSourceTablet: item?.videoSourceTablet,
                        defaultVideoSourceTabletOgg: item?.videoSourceTabletOGG,
                      }}
                    />
                  </div>
                ) : (
                  <div className={styles.item}>
                    {item?.imageSource && (
                      <CustomImage
                        lazy="false"
                        src={{
                          mobileSource: item?.imageSourceMobile,
                          tabletSource: item?.imageSourceTablet,
                          defaultSource: item?.imageSource,
                        }}
                        alt={item?.imageAlt}
                        {...(index === 0 ? { fetchpriority: 'high' } : '')}
                      />
                    )}
                  </div>
                )}
              </>
            </div>
          ))}
        </React.Fragment>
      </BaseSlider>
    </section>
  );
};

export default MainBanner;
