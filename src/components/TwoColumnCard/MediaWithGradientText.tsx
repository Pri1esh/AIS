import { ICardData } from '@interfaces';
import MediaCard from './MediaCard';
import styles from './TwoColumnCard.module.scss';

const MediaWithGradientText = (props: { card: ICardData }) => {
  const { card } = props;

  return (
    <div className={styles.carouselMediaWrapper}>
      <div className={styles.carouselMedia}>
        <MediaCard cardData={card} />
        <div className={styles.gradient}></div>
        <span className={styles.imageText}>{card?.imageText}</span>
      </div>
    </div>
  );
};

export default MediaWithGradientText;
