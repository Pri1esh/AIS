import { CustomLink } from '@components';
import { IDetails } from '@interfaces';
import { GTMHelper } from '@utils';
import styles from './details.module.scss';

const Details = (props: IDetails) => {
  const { heading, subHeading, description, btnText, btnLink, target } = props;
  return (
    <div className={styles.wrapper}>
      {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {description && <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }}></p>}
      <div>
        {btnLink && (
          <CustomLink
            href={btnLink}
            variant={'underline'}
            target={target}
            onClick={() => {
              GTMHelper({ ...props?.gtmData });
            }}
          >
            {btnText}
          </CustomLink>
        )}
      </div>
    </div>
  );
};

export default Details;
