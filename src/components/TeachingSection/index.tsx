import { CustomImage } from '@components';
import { ITeachingSection } from '@interfaces';
import styles from './teachingSection.module.scss';

const TeachingSection = (props: ITeachingSection) => {
  const { compData } = props;

  return (
    <div className={styles.wrapper}>
      {compData?.heading && <h2 className={styles.heading}>{compData?.heading}</h2>}
      {compData?.description && (
        <p className={styles.description} dangerouslySetInnerHTML={{ __html: compData?.description }}></p>
      )}
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
  );
};

export default TeachingSection;
