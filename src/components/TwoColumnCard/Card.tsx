import { ICardData } from '@interfaces';
import MediaCard from './MediaCard';
import TextCard from './TextCard';
import styles from './TwoColumnCard.module.scss';

const Card = (props: { cardData: ICardData }) => {
  const { cardData } = props;

  return (
    <div className={`${styles.twoColumnCardWrapper} ${cardData?.textFirst !== true ? styles.reverseColumn : ''}`}>
      <TextCard cardData={cardData} />
      <MediaCard cardData={cardData} />
    </div>
  );
};

export default Card;
