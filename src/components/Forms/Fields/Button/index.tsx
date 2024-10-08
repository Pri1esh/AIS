import { IButton } from '@interfaces';
import { useEffect, useState } from 'react';
import { Button as BSButton } from 'react-bootstrap';
import styles from './button.module.scss';

const Button = (props: IButton) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { children, className, variant, type = 'button', onClick = () => {}, loading = false } = props;
  const [loader, setLoader] = useState(loading);

  useEffect(() => {
    setLoader(loading);
  }, [loading]);

  return (
    <BSButton
      type={type}
      className={`${className} ${styles.button} ${loader ? styles.loading : ''}`}
      variant={variant}
      onClick={onClick}
      disabled={loading}
    >
      {!loader ? (
        children
      ) : (
        <>
          <span></span>
          <span></span>
          <span></span>
        </>
      )}
    </BSButton>
  );
};

export default Button;
