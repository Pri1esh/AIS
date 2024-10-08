import { Overview } from '@components';
import { IFounderCard } from '@interfaces';
import { Col, Container, Row } from 'react-bootstrap';
import MediaCard from './MediaCard';
import styles from './TwoColumnCard.module.scss';

const FounderCard = (props: IFounderCard) => {
  const { cardData, overview = null } = props;

  return (
    <div className={styles.founderCard}>
      <Container>
        {overview && <Overview compData={overview} className={styles.founderOverview} />}
        <div className={styles.cardContainer}>
          <Row className="g-0">
            <Col lg={7}>
              <div className={styles.mediaBox}>
                <MediaCard cardData={cardData} />
              </div>
            </Col>
            <Col lg={5}>
              <div className={styles.textBox}>
                {cardData?.heading && <h2>{cardData?.heading}</h2>}
                {cardData?.description && (
                  <div className={styles.summary} dangerouslySetInnerHTML={{ __html: cardData?.description }} />
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default FounderCard;
