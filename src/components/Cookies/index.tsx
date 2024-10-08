import { IAppCookie } from '@interfaces';
import { useEffect, useState } from 'react';
import CustomIcon from '../CustomIcon';
import Button from '../Forms/Fields/Button';
import styles from './cookies.module.scss';

const AppCookie = (props: { compData: IAppCookie }) => {
  const { compData } = props;

  const [showDecline, setshowDecline] = useState<boolean>(true);
  const [cookieDelay, setCookieDelay] = useState(false);
  const getCookie = (name: string) => {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  };
  const cookieHandler = () => {
    const setCookie = (name: string) => {
      document.cookie = name + '=accepted; path=/';
    };
    setCookie('aisPrivacyCookie');
    setshowDecline(false);
  };
  useEffect(() => {
    setTimeout(() => setCookieDelay(true), 2000);
    const hasCookie = getCookie('aisPrivacyCookie');
    if (hasCookie && hasCookie.length > 0) {
      setshowDecline(false);
    }
  }, []);
  return (
    <>
      {showDecline && cookieDelay && (
        <div className={styles.cookiesLayer}>
          <div className={styles.closeIcon}>
            <div className={styles.closeBtn} onClick={() => setshowDecline(false)}>
              <CustomIcon iconName={'close'} />
            </div>
          </div>
          <h3>{compData?.heading}</h3>
          <div className={styles.cookiesContent}>
            <p>{compData?.description}</p>
            <div>
              <Button variant="outline-dark" onClick={() => setshowDecline(false)}>
                {compData?.decline}
              </Button>
              <Button variant="primary" onClick={() => cookieHandler()}>
                {compData?.acceptCookies}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppCookie;
