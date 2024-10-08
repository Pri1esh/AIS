import { CustomImage, CustomLink } from '@components';
import { IOverview } from '@interfaces';
import { GTMHelper } from '@utils';
import cx from 'classnames';
import styles from './overview.module.scss';

const Overview = (props: IOverview) => {
  const { compData, className = '', isHeading = false } = props;
  const {
    subHeading,
    heading,
    description,
    headOfSchool,
    designation,
    imageSource,
    imageSourceMobile,
    imageSourceTablet,
    link,
    imageAlt,
    linkText,
    backgroundImage,
    sectionID = '',
    target,
  } = compData;

  return (
    <div className={cx(styles.wrapper, className)} id={sectionID}>
      {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
      {heading &&
        (isHeading ? <h1 className={styles.heading}>{heading}</h1> : <h2 className={styles.heading}>{heading}</h2>)}

      {description && <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />}
      {headOfSchool && <h3 className={styles.headOfSchool}>{headOfSchool}</h3>}
      {designation && <p className={styles.designation}>{designation}</p>}
      {backgroundImage && (
        <CustomImage
          className={styles.backgroundImage}
          src={{
            mobileSource: backgroundImage,
            tabletSource: backgroundImage,
            defaultSource: backgroundImage,
          }}
          alt={imageAlt}
        />
      )}
      {imageSource && (
        <CustomImage
          className={styles.image}
          src={{
            mobileSource: imageSourceMobile,
            tabletSource: imageSourceTablet,
            defaultSource: imageSource,
          }}
          alt={imageAlt}
        />
      )}
      {compData?.button && (
        <div className={styles.buttonWrapper}>
          {compData?.button?.map((item, index: number) => (
            <CustomLink
              href={item?.url}
              key={`${(item?.label || '') + index}`}
              variant={item?.variant}
              target={item?.target}
              onClick={() => {
                GTMHelper({ ...item?.gtmData });
              }}
            >
              {item?.label}
            </CustomLink>
          ))}
        </div>
      )}
      {link && (
        <div className={styles.buttonWrapper}>
          <CustomLink
            href={link}
            variant={'underline'}
            target={target}
            onClick={() => {
              GTMHelper({ ...compData?.gtmData });
            }}
          >
            {linkText}
          </CustomLink>
        </div>
      )}
    </div>
  );
};

export default Overview;
