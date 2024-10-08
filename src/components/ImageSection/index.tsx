import { CustomImage, Overview } from '@components';
import { IImageSection, IImageSectionData } from '@interfaces';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import styles from './imageSection.module.scss';

const ImageSection = (props: IImageSection) => {
  const { compData, overviewData, isHeading } = props;
  return (
    <div className={styles.imageSectionWrapper}>
      <Container>
        <Overview compData={overviewData} className={styles.overview} isHeading={isHeading} />
        <div className={styles.wrapper}>
          {compData?.map((item: IImageSectionData, index: number) => (
            <div className={styles.imageSection} key={`${item?.url + index}`}>
              {item?.url ? (
                <>
                  <div className={styles.image}>
                    {item?.url && item?.imageSource && (
                      <Link target={item?.target} href={item?.url}>
                        <CustomImage
                          className={styles.featureImage}
                          src={{
                            mobileSource: item?.imageSourceMobile,
                            tabletSource: item?.imageSourceTablet,
                            defaultSource: item?.imageSource,
                          }}
                          alt={item?.imageAlt}
                        />
                      </Link>
                    )}
                  </div>
                  <div className={styles.imgTitle}>
                    <Link target={item?.target} href={item?.url}>
                      {item?.imgTitle}
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.image}>
                    {item?.imageSource && (
                      <CustomImage
                        className={styles.featureImage}
                        src={{
                          mobileSource: item?.imageSourceMobile,
                          tabletSource: item?.imageSourceTablet,
                          defaultSource: item?.imageSource,
                        }}
                        alt={item?.imageAlt}
                      />
                    )}
                  </div>
                  <div className={styles.imgTitle}>{item?.imgTitle}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
export default ImageSection;
