import { BaseSlider } from '@components';
import { ICardData } from '@interfaces';
import React from 'react';
import MediaWithGradientText from './MediaWithGradientText';
import TextCard from './TextCard';
import styles from './TwoColumnCard.module.scss';

const CarouselCard = (props: { cardData: ICardData[] }) => {
  const { cardData } = props;

  const settings = {
    arrows: true,
    autoplay: false,
    autoplaySpeed: 2000,
    dots: false,
    infinite: false,
    pauseOnHover: false,
    slidesToScroll: 1,
    slidesToShow: 1.5,
    speed: 500,
    fade: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1025,
        settings: { arrows: false, slidesToShow: 1.25 },
      },
      {
        breakpoint: 767,
        settings: { arrows: false, slidesToShow: 1 },
      },
    ],
    swipe: true,
  };

  return (
    <div
      className={`${styles.carouselCard} ${styles.twoColumnCardWrapper} ${
        cardData?.[0]?.textFirst || cardData?.[0]?.textFirst == 'true' ? '' : styles.reverseColumn
      }`}
    >
      <TextCard cardData={cardData[0]} />
      <BaseSlider settings={{ ...settings }} isMobSlider={true} classname={styles.slider}>
        <React.Fragment key=".0">
          {cardData?.map((card, index) => (
            <MediaWithGradientText card={card} key={`${index + (card?.imageText || '')}`} />
          ))}
        </React.Fragment>
      </BaseSlider>
    </div>
  );
};

export default CarouselCard;
