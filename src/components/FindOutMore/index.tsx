import { CustomImage, CustomLink } from '@components';
import { IFindOutMore } from '@interfaces';
import { GTMHelper } from '@utils';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './findOutMore.module.scss';

const FindOutMore = (props: { compData: IFindOutMore }) => {
  const { compData } = props;
  return (
    <div className={styles.wrapper}>
      <Container>
        <h2 className={styles.heading}>{compData?.heading}</h2>
        <p className={styles.description}>{compData?.description}</p>
        <Row>
          {compData?.data?.map((item, index: number) => (
            <Col md={6} key={`${(item?.heading || '') + index}`} className={styles.ColWrapper}>
              <div className={`${styles.card} ${item?.theme === 'purple' ? styles.bgPurple : styles.bgblue}`}>
                <div className={styles.cardThumb}>
                  {item?.imageSource && (
                    <CustomImage
                      src={{
                        mobileSource: item?.imageSourceMobile,
                        tabletSource: item?.imageSourceTablet,
                        defaultSource: item?.imageSource,
                      }}
                      alt={item?.imageAlt}
                    />
                  )}
                </div>
                <div className={styles.cardDescriptionWrapper}>
                  <p className={styles.cardHeading}>{item?.heading}</p>
                  <p className={styles.cardDescription}>{item?.description}</p>
                  <p className={styles.cardLink}>
                    <CustomLink
                      href={item?.url}
                      variant={'underline'}
                      target={item?.target}
                      onClick={() => {
                        GTMHelper({
                          ...item?.gtmData,
                        });
                      }}
                    >
                      {item?.label}
                    </CustomLink>
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FindOutMore;
