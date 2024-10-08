import { ICardData } from '@interfaces';
import { Col, Container, Row } from 'react-bootstrap';
import MediaCard from './MediaCard';
import TextCard from './TextCard';
import styles from './TwoColumnCard.module.scss';

const TechnologyCard = (props: { cardData: ICardData }) => {
  const { cardData } = props;

  return (
    <section className={styles.technologyCard}>
      <Container className={styles.paddingEnd}>
        <Row className="justify-content-lg-between align-items-lg-center">
          <Col lg={6} md={6}>
            <div className={styles.mediaWrapper}>
              <MediaCard cardData={cardData} />
            </div>
          </Col>
          <Col lg={5} md={6}>
            <div className={styles.textAreaWrapper}>
              <TextCard cardData={cardData} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TechnologyCard;
