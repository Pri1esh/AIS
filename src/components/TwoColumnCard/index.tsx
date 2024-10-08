import { ITwoColumnCard } from '@interfaces';
import Card from './Card';
import CarouselCard from './CarouselCard';
import FounderCard from './FounderCard';
import TechnologyCard from './TechnologyCard';
import styles from './TwoColumnCard.module.scss';
import TwoColumnTextCard from './TwoColumTextCard';

const TwoColumnCard = (props: ITwoColumnCard) => {
  const { compData, overview } = props;
  const { data, variant } = compData;

  const getCardType = (variant: string) => {
    switch (variant) {
      case 'card':
        return <Card cardData={data[0]} />;
      case 'carousel':
        return <CarouselCard cardData={data} />;
      case 'text':
        return <TwoColumnTextCard cardData={data} />;
      case 'technologyCard':
        return <TechnologyCard cardData={data[0]} />;
      case 'founderCard':
        return <FounderCard cardData={data[0]} overview={overview} />;
      default:
        return <></>;
    }
  };

  return (
    <section className={`${variant === 'text' ? styles.alignTextCenter : ''}`} id={compData?.sectionID}>
      {getCardType(variant)}
    </section>
  );
};

export default TwoColumnCard;
