import { ICardSliderDetails } from '@interfaces';
import { GTMHelper } from '@utils';
import styles from './details.module.scss';
const Details = (props: ICardSliderDetails) => {
  const { compData } = props;
  const { heading, subHeading, description, theme, link, linkText, gtmData = null } = compData;

  const getTheme = (theme: string) => {
    switch (theme) {
      case 'dark':
        return styles.darkTheme;
      case 'snow':
        return styles.snowTheme;
      default:
        return '';
    }
  };

  return (
    <div className={`${getTheme(theme)} ${styles.wrapper} `}>
      {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {description && <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />}
      {link && (
        <a
          href={link}
          className={styles.description}
          onClick={() => {
            GTMHelper({
              ...gtmData,
            });
          }}
        >
          {linkText}
        </a>
      )}
    </div>
  );
};

export default Details;
