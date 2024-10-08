import { CustomImage } from '@components';
import { IFullWidthImage } from '@interfaces';
import styles from './fullWidthImage.module.scss';

const FullWidthImage = (props: { compData: IFullWidthImage }) => {
  const { compData } = props;
  return (
    <section className={styles.fullImg}>
      {compData?.imageSource && (
        <CustomImage
          src={{
            mobileSource: compData?.imageSourceMobile,
            tabletSource: compData?.imageSourceTablet,
            defaultSource: compData?.imageSource,
          }}
          alt={compData?.imageAlt}
        />
      )}
    </section>
  );
};

export default FullWidthImage;
