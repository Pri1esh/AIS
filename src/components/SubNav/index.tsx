import { CustomLink } from '@components';
import { ISubNav } from '@interfaces';
import { GTMHelper, scrollTabIntoView } from '@utils';
import { useEffect, useRef } from 'react';
import styles from './subNav.module.scss';

const SubNav = (props: ISubNav) => {
  const { compData } = props;
  const parentRef = useRef<HTMLUListElement>(null);
  const activeTabRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setTimeout(() => scrollTabIntoView(parentRef?.current, activeTabRef?.current), 100);
  }, []);

  return (
    <div className={styles.navWrapper}>
      <div className={styles.pageNavWrapper}>
        <ul className={styles.pageNav} ref={parentRef}>
          {compData?.map((item, index) => (
            <li key={`${item?.url + index}`} className={styles.pageNavItem} ref={item?.active ? activeTabRef : null}>
              <CustomLink
                href={item?.url}
                target={item?.target}
                className={item?.active ? styles.activeNavItem : ''}
                onClick={() => {
                  GTMHelper({ ...item?.gtmData });
                }}
              >
                {item?.label}
              </CustomLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubNav;
