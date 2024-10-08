import { CustomIcon } from '@components';
import { INotification } from '@interfaces';
import { useEffect } from 'react';
import styles from './notification.module.scss';

const Notification = (props: INotification) => {
  const { notificationData, setShowNotification } = props;

  const getNotification = (name: string) => {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  };

  const cookieHandler = () => {
    const setCookie = (name: string) => {
      document.cookie = name + '=accepted; path=/';
    };
    setCookie('notification');
    setShowNotification(false);
  };

  useEffect(() => {
    const hasCookie = getNotification('notification');
    if (hasCookie && hasCookie.length > 0) {
      setShowNotification(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {notificationData && (
        <div className={`${styles.wrapper}`}>
          <p>
            <a href={notificationData?.url} target={`${notificationData?.target ? notificationData?.target : ''}`}>
              <div className={styles.notificationLabel}>{notificationData?.label}</div>
              <span>{notificationData?.btnLabel}</span>
            </a>
            <button type="button" onClick={cookieHandler}>
              <CustomIcon iconName={'close'} />
            </button>
          </p>
        </div>
      )}
    </>
  );
};

export default Notification;
