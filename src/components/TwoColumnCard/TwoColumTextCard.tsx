import { ICardData } from '@interfaces';
import TextCard from './TextCard';
import styles from './TwoColumnCard.module.scss';

const TwoColumnTextCard = (props: { cardData: ICardData[] }) => {
  const { cardData } = props;

  return (
    <div className={`${styles.twoColumnCardWrapper} ${styles.twoColumnTextCardWrapper}`}>
      <TextCard cardData={cardData[0]} />
      <TextCard cardData={cardData[1]} />
    </div>
  );
};

export default TwoColumnTextCard;
