import { CustomImage } from '@components';
import { ISingleCard } from '@interfaces';
import { Col } from 'react-bootstrap';
import styles from './stories.module.scss';

const SingleCard = (props: ISingleCard) => {
  const { compData } = props;

  return (
    <Col lg={12}>
      {compData?.link ? (
        <a href={compData?.link} target={compData?.target} className={styles.storyLink}>
          <div className={styles.storyCard}>
            <div className={styles.imageBox}>
              {compData?.imageSource && (
                <CustomImage
                  src={{
                    mobileSource: compData?.imageSourceMobile,
                    tabletSource: compData?.imageSourceTablet,
                    defaultSource: compData?.imageSource || '',
                  }}
                  alt={compData?.imageAlt}
                />
              )}
            </div>
            <div className={styles.textArea}>
              {compData?.upcomingEvent ? (
                <span className={styles.upcomingEvent}>{compData?.eventTxt}</span>
              ) : (
                <span>{compData?.eventTxt}</span>
              )}
              <h3>{compData?.storyHeading}</h3>
              <span>{compData?.eventDate}</span>
            </div>
          </div>
        </a>
      ) : (
        <div className={styles.storyCard}>
          <div className={styles.imageBox}>
            {compData?.imageSource && (
              <CustomImage
                src={{
                  mobileSource: compData?.imageSourceMobile,
                  tabletSource: compData?.imageSourceTablet,
                  defaultSource: compData?.imageSource || '',
                }}
                alt={compData?.imageAlt}
              />
            )}
          </div>
          <div className={styles.textArea}>
            {compData?.upcomingEvent ? (
              <span className={styles.upcomingEvent}>{compData?.eventTxt}</span>
            ) : (
              <span>{compData?.eventTxt}</span>
            )}
            <h3>{compData?.storyHeading}</h3>
            <span>{compData?.eventDate}</span>
          </div>
        </div>
      )}
    </Col>
  );
};

export default SingleCard;
