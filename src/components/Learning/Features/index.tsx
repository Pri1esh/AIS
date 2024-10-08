import { CustomImage } from '@components';
import { IFeatures, IFeaturesData } from '@interfaces';
import styles from './features.module.scss';

const Features = (props: IFeatures) => {
  const { compData } = props;

  const getTheme = (theme: string) => {
    switch (true) {
      case theme?.includes('darkBlue'):
        return styles.darkBlueTheme;
      case theme?.includes('purple'):
        return styles.purpleTheme;
      default:
        return '';
    }
  };

  return (
    <div className={styles.mainDiv}>
      {compData?.map((item: IFeaturesData, key: number) => (
        <div
          key={`${item?.heading + key}`}
          className={`${styles.academicInner} 
          ${getTheme(item?.theme)}`}
        >
          {item?.imageSource && (
            <CustomImage
              src={{
                mobileSource: item?.imageSourceMobile,
                tabletSource: item?.imageSourceTablet,
                defaultSource: item?.imageSource,
              }}
              alt={item.imageAlt}
            />
          )}
          <div className={styles.academicDescription}>
            <div className={styles.academicDescriptionData}>
              <h4>{item?.heading}</h4>
              <p>{item?.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Features;
