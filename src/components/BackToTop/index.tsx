import { CustomIcon } from '@components';
import { useEffect, useState } from 'react';
import styles from './backtoTop.module.scss';

const BackToTop = () => {
  const [visible, setVisible] = useState<boolean>(false);
  let oldScrollY = 0;
  const debounce = (func: any, timeout = 100) => {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const toggleVisible = () => {
    if (typeof document === 'undefined') {
      return;
    }
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 500 && scrolled < oldScrollY) {
      setVisible(true);
    } else if (scrolled <= 500 || scrolled > oldScrollY) {
      setVisible(false);
    }
    oldScrollY = scrolled <= 0 ? 0 : scrolled;
  };

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    const scrollFunctionName = 'scroll';
    const scrollFunction = debounce(() => toggleVisible());
    document.addEventListener(scrollFunctionName, scrollFunction);
    return () => {
      document.removeEventListener(scrollFunctionName, scrollFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div
      className={`${styles.backToTop} ${!visible && 'd-none'}`}
      onClick={() => {
        setTimeout(() => {
          scrollToTop();
        }, 500);
      }}
    >
      <div className={styles.inner}>
        <div className={styles.icon}>
          <CustomIcon iconName={'up'} />
        </div>
      </div>
    </div>
  );
};
export default BackToTop;
