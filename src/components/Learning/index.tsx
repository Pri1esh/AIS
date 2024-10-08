import { BaseSlider, CustomImage, CustomLink } from '@components';
import { ILearning, ILearningData } from '@interfaces';
import { GTMHelper, useDeviceType } from '@utils';
import React from 'react';
import { Container } from 'react-bootstrap';
import Features from './Features';
import styles from './learning.module.scss';

const Learning = (props: ILearning) => {
  const { compData } = props;
  const { deviceType } = useDeviceType();

  const { academicDetails, description, features, heading, gallery, btnLink, btnText, subHeading, target } = compData;

  const cardItem = (item: ILearningData, variant: string) => {
    return (
      <>
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
        <div className={`${variant === 'primary' ? styles.textWrapper : styles.cardInnerDescription}`}>
          {item?.heading && variant === 'primary' ? <h3>{item?.heading}</h3> : <h4>{item?.heading}</h4>}
          {item?.description && <p>{item?.description}</p>}
          {item?.highlights && <p className={styles.highlight}>{item?.highlights}</p>}
        </div>
      </>
    );
  };

  return (
    <section>
      <div className={styles.wrapper}>
        <Container>
          {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
          {heading && <h2 className={styles.heading}>{heading}</h2>}
          {description && <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />}
          {btnLink && (
            <div className={styles.button}>
              <CustomLink
                href={btnLink}
                variant={'secondary'}
                target={target}
                onClick={() => {
                  GTMHelper({ ...compData?.gtmData });
                }}
              >
                {btnText}
              </CustomLink>
            </div>
          )}

          {deviceType !== 'desktop' ? (
            <div className={styles.sliderWrapper}>
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
                  {gallery?.map((item: ILearningData, key: number) => (
                    <div key={`${item?.link + key}`} className={styles.item}>
                      {item?.link ? (
                        <a
                          href={item?.link}
                          onClick={() => {
                            GTMHelper({ ...item?.gtmData });
                          }}
                        >
                          {cardItem(item, 'primary')}
                        </a>
                      ) : (
                        cardItem(item, 'primary')
                      )}
                    </div>
                  ))}
                  <div className={styles.blockCardWrapper}>
                    <div className={styles.cardWrapper}>
                      {academicDetails?.map((item: ILearningData, key: number) => (
                        <div className={styles.cards} key={`${item?.link + key}`}>
                          <div className={`${key === 0 ? styles.card : styles.cardsInner}`}>
                            {item?.link ? (
                              <a
                                href={item?.link}
                                onClick={() => {
                                  GTMHelper({ ...item?.gtmData });
                                }}
                              >
                                {cardItem(item, 'secondary')}
                              </a>
                            ) : (
                              cardItem(item, 'secondary')
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              </BaseSlider>
            </div>
          ) : (
            <React.Fragment key=".0">
              <div className={styles.blockWrapper}>
                <div className={styles.itemWrapper}>
                  {gallery?.map((item: ILearningData, key: number) => (
                    <div key={`${item?.link + key}`} className={styles.item}>
                      {item?.link ? (
                        <a
                          href={item?.link}
                          onClick={() => {
                            GTMHelper({ ...item?.gtmData });
                          }}
                        >
                          {cardItem(item, 'primary')}
                        </a>
                      ) : (
                        cardItem(item, 'primary')
                      )}
                    </div>
                  ))}
                </div>

                <div className={styles.blockCardWrapper}>
                  <div className={styles.cardWrapper}>
                    {academicDetails?.map((item: ILearningData, key: number) => (
                      <div className={styles.cards} key={`${item?.link + key}`}>
                        <div className={`${key === 0 ? styles.card : styles.cardsInner}`}>
                          {item?.link ? (
                            <a
                              href={item?.link}
                              onClick={() => {
                                GTMHelper({ ...item?.gtmData });
                              }}
                            >
                              {cardItem(item, 'secondary')}
                            </a>
                          ) : (
                            cardItem(item, 'secondary')
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </Container>
      </div>
      <Container>
        <Features compData={features} />
      </Container>
    </section>
  );
};

export default Learning;
