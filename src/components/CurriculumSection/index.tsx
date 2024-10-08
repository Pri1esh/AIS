import { CustomImage } from '@components';
import { ICurriculumSection, ICurriculumSectionImage, IGuideSectionFeature } from '@interfaces';
import styles from './curriculumSection.module.scss';

const CurriculumSection = (props: ICurriculumSection) => {
  const { compData } = props;

  const getHeadingStyles = () => {
    switch (compData?.variant) {
      case 'blue':
        return styles.blueHeading;
      case 'purple':
        return styles.purpleHeading;
      default:
        return '';
    }
  };

  return (
    <div className={styles.wrapper}>
      {compData?.heading && <h2 className={`${styles.heading} ${getHeadingStyles()}`}>{compData?.heading}</h2>}
      {compData?.description && (
        <p className={styles.description} dangerouslySetInnerHTML={{ __html: compData?.description }}></p>
      )}
      <div className={styles.images}>
        {compData?.images?.map((item: ICurriculumSectionImage, index: number) => (
          <div className={styles.cardImage} key={`${(item?.imageAlt || '') + index}`}>
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
        ))}
      </div>
      <div className={styles.features}>
        {compData?.features?.map((item: IGuideSectionFeature, index: number) => (
          <div className={styles.feature} key={`${(item?.featureTitle || '') + index}`}>
            {item?.imageSource && (
              <div className={styles.imageWrapper}>
                <CustomImage
                  key={`${(item?.featureTitle || '') + index}`}
                  className={styles.image}
                  src={{
                    mobileSource: item?.imageSourceMobile,
                    tabletSource: item?.imageSourceTablet,
                    defaultSource: item?.imageSource,
                  }}
                  alt={item?.imageAlt}
                />
              </div>
            )}
            {item?.featureTitle && <div className={styles.featureTitle}>{item?.featureTitle}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurriculumSection;
