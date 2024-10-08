import { Container } from 'react-bootstrap';
import styles from './conditions.module.scss';

interface IConditions {
  compData: {
    text: string;
  };
}

const Conditions = (props: IConditions) => {
  const { compData } = props;
  return (
    <>
      {compData?.text && (
        <Container>
          <div className={styles.conditions}>{compData?.text}</div>
        </Container>
      )}
    </>
  );
};

export default Conditions;
