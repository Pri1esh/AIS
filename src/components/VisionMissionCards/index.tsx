import { CustomImage, Overview } from '@components';
import { IVisionMission } from '@interfaces';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './visionMissionCards.module.scss';

const VisionMissionCards = (props: IVisionMission) => {
  const { compData, isHeading } = props;
  return (
    <div className={styles.cardContainer}>
      <Container>
        <Overview
          compData={{
            heading: compData?.heading,
            description: compData?.description,
          }}
          isHeading={isHeading}
          className={styles.overview}
        />
        <div className={styles.rowWrapper}>
          <Row>
            {compData?.data?.map((item, index) => (
              <Col key={`${(item?.url || '') + index}`} lg={6} md={6} className="mb-md-0 mb-4 pb-md-0 pb-2">
                <div className={`${styles.wrapper} ${item?.theme === 'purple' ? styles.bgPurple : ''}`}>
                  <div className={styles.thumb}>
                    {item?.url && item?.imageSource ? (
                      <Link href={item?.url ? item?.url : ''} target={item?.target ? item?.target : ''} rel="preload">
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
                  <div className={`${styles.description}`}>
                    <p className={styles.heading}>{item?.heading}</p>
                    <p className={styles.subHeading}>{item?.description}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default VisionMissionCards;
