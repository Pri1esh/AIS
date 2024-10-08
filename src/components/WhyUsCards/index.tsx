import { CustomImage } from '@components';
import { IWhyUsCard } from '@interfaces';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './whyUsCards.module.scss';

const WhyUsCards = (props: { compData: IWhyUsCard }) => {
  const { compData } = props;
  return (
    <section className={`${styles.wrapper} ${compData?.variant === 'snow' ? styles.snowTheme : ''}`}>
      <Container>
        <Row>
          <div className={styles.detailWrapper}>
            {compData?.heading && <h2 className={styles.heading}>{compData?.heading}</h2>}
            {compData?.description && <p className={styles.description}>{compData?.description}</p>}
          </div>
          {compData?.data?.map((card, index) => (
            <Col
              lg={4}
              md={6}
              key={`${card?.imageAlt + index}`}
              className={`${index !== compData?.data.length - 1 ? styles.cardColumn : ''}`}
            >
              <div className={`${styles.cardWrapper} ${card?.theme.includes('darkBlue') ? styles.dark : ''}`}>
                {card?.imageSource && (
                  <CustomImage
                    src={{
                      mobileSource: card?.imageSourceMobile,
                      tabletSource: card?.imageSourceTablet,
                      defaultSource: card?.imageSource,
                    }}
                    alt={card?.imageAlt}
                  />
                )}
                <p className={styles.description}>{card?.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default WhyUsCards;
