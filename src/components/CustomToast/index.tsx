import { CustomIcon } from '@components';
import { ICustomToast } from '@interfaces';
import { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import styles from './customToast.module.scss';

const CustomToast = (props: ICustomToast) => {
  const { setShow, show = '', compData, icon = '', classname = '', onClose = null } = props;
  const [iconName, setIconName] = useState<string>(icon);

  const showIcon = (show: string) => {
    switch (show) {
      case 'progress':
        setIconName('error');
        break;
      case 'error':
        setIconName('close');
        break;
      case 'success':
        setIconName('tick');
        break;
      default:
        setIconName('');
    }
  };

  useEffect(() => {
    showIcon(show);
  }, [show]);

  const getStyles = (show: string) => {
    switch (show) {
      case 'progress':
        return styles.progress;
      case 'error':
        return styles.error;
      default:
        return '';
    }
  };

  return (
    <div className={`${styles.wrapper} ${classname ? classname : ''} ${getStyles(show)}`}>
      <Toast
        onClose={() => {
          setShow('');
          onClose && onClose();
        }}
        show={show !== ''}
      >
        <div className={styles.toastWrapper}>
          <Toast.Header>
            <div className={styles.toastHeading}>
              {(iconName || compData?.heading) && (
                <h2>
                  {iconName && <CustomIcon iconName={iconName} />}
                  {compData?.heading}
                </h2>
              )}
            </div>
          </Toast.Header>
          <Toast.Body>
            <div className={styles.toastbody}>
              <p>{compData?.description}</p>
            </div>
          </Toast.Body>
        </div>
      </Toast>
    </div>
  );
};

export default CustomToast;
