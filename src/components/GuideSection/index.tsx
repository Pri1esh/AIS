import { CustomImage } from '@components';
import { IGuideSection, IGuideSectionFeature } from '@interfaces';
import styles from './guideSection.module.scss';

const GuideSection = (props: IGuideSection) => {
  const { compData } = props;

  return (
    <div className={styles.wrapper}>
      {compData?.heading && <h2 className={styles.heading}>{compData?.heading}</h2>}
      {compData?.description && (
        <p className={styles.description} dangerouslySetInnerHTML={{ __html: compData?.description }}></p>
      )}
      {compData?.features && compData?.features?.length > 0 ? (
        <div className={`${styles.features} ${compData?.features?.length <= 2 ? styles.featureImageVariant : ''}`}>
          {compData?.features?.map((item: IGuideSectionFeature, index: number) => (
            <div className={styles.feature} key={`${(item?.imageAlt || '') + index}`}>
              {item?.imageSource && (
                <div className={styles.image}>
                  <CustomImage
                    className={styles.featureImage}
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default GuideSection;
