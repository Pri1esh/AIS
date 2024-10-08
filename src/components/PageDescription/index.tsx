import { IPageDescription } from '@interfaces';
import { Container } from 'react-bootstrap';
import Banners from './banners';
import styles from './pageDescription.module.scss';

const PageDescription = (props: IPageDescription) => {
  const { compData, isHeading = false } = props;
  const { heading, description, banners } = compData;
  return (
    <Container>
      <div className={styles.wrapper}>
        {heading &&
          (isHeading ? <h1 className={styles.heading}>{heading}</h1> : <h2 className={styles.heading}>{heading}</h2>)}
        <div dangerouslySetInnerHTML={{ __html: description }} className={styles.description} />
        {banners?.length > 0 && <Banners compData={banners} />}
      </div>
    </Container>
  );
};

export default PageDescription;
