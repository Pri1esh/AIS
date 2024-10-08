import { IDescription } from '@interfaces';
import { Container } from 'react-bootstrap';
import styles from './description.module.scss';

const description = (props: IDescription) => {
  const { compData } = props;
  return (
    <Container>
      <div className={styles.wrapper}>
        {compData?.heading && <h2>{compData?.heading}</h2>}
        <div dangerouslySetInnerHTML={{ __html: compData?.description }} />
      </div>
    </Container>
  );
};

export default description;
