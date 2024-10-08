import { ICardSlider } from '@interfaces';
import { Container } from 'react-bootstrap';
import styles from './cardSlider.module.scss';
import Details from './Details';
import Slider from './Slider';

const CardSlider = (props: ICardSlider) => {
  const { compData } = props;

  const getTheme = (theme: string) => {
    switch (theme) {
      case 'dark':
        return styles.darkTheme;
      case 'snow':
        return styles.snowTheme;
      case 'lightBlue':
        return styles.lightBlueTheme;
      default:
        return '';
    }
  };

  return (
    <section className={`${getTheme(compData?.theme)} ${styles.wrapper} `} id={compData?.sectionID}>
      <Container>
        <Details compData={compData} />
      </Container>
      <div className={styles.sliderContainer}>
        <Slider cardDetails={compData} />
      </div>
    </section>
  );
};

export default CardSlider;
