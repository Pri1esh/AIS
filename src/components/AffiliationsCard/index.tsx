import { CustomImage, Overview } from '@components';
import { IAffiliationsCards, IImageComp } from '@interfaces';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './affiliationsCards.module.scss';

const ImageComp = (props: IImageComp) => {
  const { item } = props;
  return (
    <CustomImage
      src={{
        mobileSource: item?.imageSourceMobile,
        tabletSource: item?.imageSourceTablet,
        defaultSource: item?.imageSource,
      }}
      alt={item?.imageAlt}
    />
  );
};

const AffiliationsCards = (props: { compData: IAffiliationsCards; isHeading?: boolean }) => {
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
          className={styles.details}
        />
        <Row>
          {compData?.data?.map((item, index) =>
            item?.url && item?.imageSource ? (
              <Col key={`${(item?.url || '') + index}`} lg={4} md={4} className={styles.cardColumn}>
                <div className={styles.wrapper}>
                  <Link href={item?.url ? item?.url : ''} target={item?.target ? item?.target : '_blank'}>
                    <ImageComp item={item} />
                  </Link>
                </div>
              </Col>
            ) : (
              item?.imageSource && (
                <Col key={`${(item?.url || '') + index}`} lg={4} md={4} className={styles.cardColumn}>
                  <div className={styles.wrapper}>
                    <ImageComp item={item} />
                  </div>
                </Col>
              )
            ),
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AffiliationsCards;
