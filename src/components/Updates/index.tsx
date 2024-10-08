import { IUpdates } from '@interfaces';
import { Container } from 'react-bootstrap';
import styles from './updates.module.scss';

const Updates = (props: { compData: IUpdates }) => {
  const { compData } = props;
  return (
    <div className={`${styles.wrapper} ${compData?.theme === 'snow' ? styles.snowTheme : ''}`}>
      <Container>
        <div className={styles.heading}>
          <div className={styles.icon}>!</div>
          <h2>{compData?.heading}</h2>
        </div>
      </Container>

      <Container>
        <div className={styles.singleMarquee}>
          <ul className={compData?.data?.length > 1 ? styles.marqueeInner : styles.singleMarquee}>
            {compData?.data?.map((item, index) => (
              <li key={`${item?.description + index}`}>{item?.description}</li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Updates;
