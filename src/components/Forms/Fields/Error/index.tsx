import { CustomIcon } from '@components';
import { IError } from '@interfaces';
import styles from './error.module.scss';

const Error = (props: IError) => {
  const { errorMessage } = props;
  return (
    <div className={styles.errorMsg}>
      <CustomIcon iconName={'error'} classname={styles.errorIcon} />
      {errorMessage}
    </div>
  );
};

export default Error;
