import { CustomImage } from '@components';
import { ITwoColumnCardSmall } from '@interfaces';
import { useDeviceType } from '@utils';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './twoColumnCardSmall.module.scss';

const TwoColumnCardSmall = (props: ITwoColumnCardSmall) => {
  const { compData } = props;
  const { deviceType } = useDeviceType();

  const getClassName = (reverseColumn: boolean) => {
    switch (true) {
      case reverseColumn && deviceType !== 'mobile':
        return 'flex-row-reverse';
      case deviceType === 'mobile':
        return 'flex-column-reverse';
      default:
        return '';
    }
  };

  const getTheme = (theme: string) => {
    switch (true) {
      case theme?.includes('aliceBlue'):
        return styles.aliceBlue;
      case theme?.includes('snow'):
        return styles.snowTheme;
      default:
        return '';
    }
  };

  return (
    <>
      <section className={styles.cardSection}>
        <Container>
          {compData?.map((card, index) => (
            <Row
              key={`${card?.heading + index}`}
              className={`${styles.card} ${getClassName(card?.reverseColumn)} gx-0
              ${index !== compData?.length - 1 && styles.cardMargin}  ${getTheme(card?.theme)}`}
            >
              {card?.imageSource ? (
                <>
                  <Col lg="7" md="7" className={styles.textCard}>
                    <h2 className={styles.heading}>{card?.heading}</h2>
                    <div className={styles.description} dangerouslySetInnerHTML={{ __html: card?.description }}></div>
                  </Col>
                  <Col lg="5" md="5" className={styles.imageArea}>
                    <CustomImage
                      src={{
                        mobileSource: card?.imageSourceMobile,
                        tabletSource: card?.imageSourceTablet,
                        defaultSource: card?.imageSource || '',
                      }}
                      alt={card?.imageAlt}
                    />
                  </Col>
                </>
              ) : (
                <div className={styles.textCard}>
                  <h2 className={styles.heading}>{card?.heading}</h2>
                  <div className={styles.description} dangerouslySetInnerHTML={{ __html: card?.description }}></div>
                </div>
              )}
            </Row>
          ))}
        </Container>
      </section>
    </>
  );
};

export default TwoColumnCardSmall;
