import { CustomImage } from '@components';
import { ICoreValuesCard } from '@interfaces';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './coreValuesCard.module.scss';

const CoreValuesCard = (props: { compData: ICoreValuesCard }) => {
  const { compData } = props;
  return (
    <div className={styles.wrapper}>
      <Container>
        <h2 className={styles.heading}>{compData?.heading}</h2>
        <Row>
          {compData?.data?.map((item, index) => (
            <Col lg={4} md={6} key={`${(item?.heading || '') + index}`}>
              <div className={styles.cardWrapper}>
                <div className={styles.thumb}>
                  {item?.url && item?.imageSource ? (
                    <Link href={item?.url ? item?.url : ''} target={item?.target ? item?.target : ''}>
                      <CustomImage
                        src={{
                          mobileSource: item?.imageSourceMobile,
                          tabletSource: item?.imageSourceTablet,
                          defaultSource: item?.imageSource || '',
                        }}
                        alt={item?.imageAlt}
                      />
                    </Link>
                  ) : (
                    item?.imageSource && (
                      <CustomImage
                        src={{
                          mobileSource: item?.imageSourceMobile,
                          tabletSource: item?.imageSourceTablet,
                          defaultSource: item?.imageSource || '',
                        }}
                        alt={item?.imageAlt}
                      />
                    )
                  )}
                </div>
                <div className={styles.description}>
                  <p className={styles.cardHeading}>{item?.heading}</p>
                  <p className={styles.cardDescription}>{item?.description}</p>
                  <p className={styles.cardSubHeading}>{item?.subHeading}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CoreValuesCard;
