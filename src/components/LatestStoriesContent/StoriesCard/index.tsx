import { CustomImage, CustomLink } from '@components';
import { IStoriesCard } from '@interfaces';
import { GTMHelper } from '@utils';
import styles from './storiesCard.module.scss';

const StoriesCard = (props: IStoriesCard) => {
  const { compData } = props;

  const storyCardBody = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.cardImage}>
          {compData?.imageSource && (
            <CustomImage
              className={styles.image}
              src={{
                mobileSource: compData?.imageSourceMobile,
                tabletSource: compData?.imageSourceTablet,
                defaultSource: compData?.imageSource,
              }}
              alt={compData?.imageAlt}
            />
          )}
        </div>
        <div className={styles.cardText}>
          {compData?.cardDate && <p className={styles.cardDate}>{compData?.cardDate}</p>}
          {compData?.cardHeading && <p className={styles.cardHeading}>{compData?.cardHeading}</p>}
          {compData?.cardDescription && (
            <div className={styles.cardDescription} dangerouslySetInnerHTML={{ __html: compData?.cardDescription }} />
          )}
          {compData?.cardLink && <span className={styles.readMore}>{compData?.readMore}</span>}
        </div>
      </div>
    );
  };

  return compData?.cardLink ? (
    <CustomLink
      className={styles.cardLink}
      variant={'anchor'}
      href={compData?.cardLink}
      target={compData?.target}
      onClick={() => {
        GTMHelper({
          ...compData?.gtmData,
        });
      }}
    >
      {storyCardBody()}
    </CustomLink>
  ) : (
    storyCardBody()
  );
};

export default StoriesCard;
