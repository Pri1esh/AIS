import { BaseSlider, CustomImage } from '@components';
import { IUpcomingEvents, IUpcomingEventsData } from '@interfaces';
import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './upcomingEvents.module.scss';

const UpcomingEvents = (props: { compData: IUpcomingEvents }) => {
  const { compData } = props;
  return (
    <div className={styles.cardContainer}>
      <Container>
        <h2 className={styles.heading}>{compData?.heading}</h2>
        <div className={styles.wrapper}>
          <BaseSlider
            isMobSlider={true}
            settings={{
              dots: false,
              infinite: false,
              speed: 800,
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 0,
              autoplay: false,
              autoplaySpeed: 5000,
              arrows: true,
              pauseOnHover: false,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2.25,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    dots: false,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 2.25,
                    slidesToScroll: 1,
                    dots: false,
                  },
                },
              ],
            }}
          >
            <React.Fragment key=".0">
              {compData?.data?.map((item: IUpcomingEventsData, index: number) => (
                <div key={`${item?.heading + index}`} className={styles.card}>
                  <div className={styles.cardBG}>
                    {item?.imageSource && (
                      <CustomImage
                        src={{
                          mobileSource: item?.imageSourceMobile,
                          tabletSource: item?.imageSourceTablet,
                          defaultSource: item?.imageSource,
                        }}
                        alt={item.imageAlt}
                      />
                    )}
                  </div>
                  <div className={styles.cardDetails}>
                    <p className={styles.cardDate}>{item?.date}</p>
                    <h3 className={styles.cardHeading}>{item?.heading}</h3>
                    <p className={styles.cardDescription}>{item?.description}</p>
                  </div>
                </div>
              ))}
            </React.Fragment>
          </BaseSlider>
        </div>
      </Container>
    </div>
  );
};

export default UpcomingEvents;
