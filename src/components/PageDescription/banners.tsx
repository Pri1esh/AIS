import { CustomImage } from '@components';
import { IPageDescriptionBanners, IPageDescriptionBannersData } from '@interfaces';
import { Col, Row } from 'react-bootstrap';
import styles from './pageDescription.module.scss';

const Banners = (props: IPageDescriptionBanners) => {
  const { compData } = props;
  return (
    <div className={styles.banners}>
      <Row>
        {compData?.map((item: IPageDescriptionBannersData, index: number) => (
          <Col md={4} className={styles.banner} key={`${index + item?.link}`}>
            {item?.link && item?.imageSource ? (
              <a href={item?.link}>
                <CustomImage
                  className={styles.image}
                  src={{
                    mobileSource: item?.imageSourceMobile,
                    tabletSource: item?.imageSourceTablet,
                    defaultSource: item?.imageSource,
                  }}
                  alt={item?.imageAlt}
                />
              </a>
            ) : (
              item?.imageSource && (
                <CustomImage
                  className={styles.image}
                  src={{
                    mobileSource: item?.imageSourceMobile,
                    tabletSource: item?.imageSourceTablet,
                    defaultSource: item?.imageSource,
                  }}
                  alt={item?.imageAlt}
                />
              )
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Banners;
