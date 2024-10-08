import { IProgramCard, IProgramCardData } from '@interfaces';
import { Container } from 'react-bootstrap';
import CustomImage from '../CustomImage';
import styles from './program.module.scss';

const ProgramCard = (props: IProgramCard) => {
  const { compData } = props;

  const getTheme = (theme: string) => {
    switch (true) {
      case theme?.includes('blue'):
        return styles.blueWrapper;
      case theme?.includes('purple'):
        return styles.purpleWrapper;
      default:
        return '';
    }
  };

  return (
    <div className={styles.wrapper}>
      {compData?.heading && (
        <Container>
          <h2 className={styles.heading}>{compData?.heading}</h2>
        </Container>
      )}
      <ul>
        {compData?.data?.map((item: IProgramCardData, index: number) => (
          <li key={`${item?.heading + index}`} className={getTheme(item?.theme)}>
            {item?.type?.includes('image') && item?.imageSource && (
              <CustomImage
                src={{
                  mobileSource: item?.imageSourceMobile,
                  tabletSource: item?.imageSourceTablet,
                  defaultSource: item?.imageSource,
                }}
                alt={item?.imageAlt}
              />
            )}
            {item?.type.includes('text') && (
              <div className={styles.textWrapper}>
                <h3>{item?.heading}</h3>
                {item.detail && <p className={styles.description} dangerouslySetInnerHTML={{ __html: item?.detail }} />}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramCard;
