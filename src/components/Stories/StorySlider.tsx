import { BaseSlider } from '@components';
import { IStoryCard } from '@interfaces';
import React from 'react';
import StoryCard from './StoryCard';

const StorySlider = (props: IStoryCard) => {
  const { compData } = props;
  return (
    <BaseSlider
      isMobSlider={true}
      settings={{
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 2200,
        cssEase: 'linear',
        pauseOnHover: false,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1.8,
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
        {compData?.storyList?.map((card, index) => (
          <StoryCard key={`${card?.eventTxt + index}`} compData={card} />
        ))}
      </React.Fragment>
    </BaseSlider>
  );
};

export default StorySlider;
