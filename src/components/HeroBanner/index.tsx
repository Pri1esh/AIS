import { CustomImage, CustomLink } from '@components';
import { IHeroBanner } from '@interfaces';
import { GTMHelper } from '@utils';
import cx from 'classnames';
import { useRef } from 'react';
import styles from './heroBanner.module.scss';

const HeroBanner = (props: IHeroBanner) => {
  const { compData, clickHandler, isHeading = true } = props;
  const bannerWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.bannerWrapper} ref={bannerWrapperRef}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <div className={styles.imageWrapper}>
            {compData?.imageSource && (
              <CustomImage
                lazy="false"
                src={{
                  mobileSource: compData?.imageSourceMobile,
                  tabletSource: compData?.imageSourceTablet,
                  defaultSource: compData?.imageSource,
                }}
                className={
                  compData?.imageSource || compData?.imageSourceMobile || compData?.imageSourceTablet
                    ? styles.imageZoom
                    : ''
                }
                alt={compData?.imageAlt}
                {...(compData?.imageSource[0] ? { fetchpriority: 'high' } : '')}
              />
            )}
          </div>
          <div className={styles.contentWrapper}>
            {compData?.subHeading && <p className={cx(styles.subHeading, styles.slideUp)}>{compData?.subHeading}</p>}
            {compData?.heading &&
              (isHeading ? (
                <h1 className={cx(styles.heading, styles.slideUp)}>{compData?.heading}</h1>
              ) : (
                <p className={cx(styles.heading, styles.slideUp)}>{compData?.heading}</p>
              ))}
            {compData?.link && (
              <div className={cx(styles.btnWrapper, styles?.slideUp)}>
                <CustomLink
                  href={compData?.link}
                  variant={'button'}
                  target={compData?.target}
                  onClick={(e: any) => {
                    GTMHelper({
                      ...compData?.gtmData,
                    });
                    clickHandler && clickHandler(e);
                  }}
                >
                  {compData?.linkText}
                </CustomLink>
              </div>
            )}
            {/* {searchData?.data && <SearchWithDropdown compData={searchData} />} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
