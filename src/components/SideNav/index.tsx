import { CustomIcon } from '@components';
import { ISideNav, ISideNavData } from '@interfaces';
import { GTMHelper, useDeviceType } from '@utils';
import { useEffect, useRef, useState } from 'react';
import styles from './sideNav.module.scss';

const SideNav = (props: ISideNav) => {
  const { compData } = props;
  const { deviceType } = useDeviceType();
  const [activeNav, setActiveNav] = useState<ISideNavData | undefined>(undefined);
  const [showNav, setShowNav] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveNav(compData?.find((i: ISideNavData) => i?.active === true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('click', checkifClickedOutsideDropdown);
    return () => {
      document.removeEventListener('click', checkifClickedOutsideDropdown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showNav]);

  const checkifClickedOutsideDropdown = (e: any) => {
    if (showNav && dropdownRef.current && !dropdownRef?.current?.contains(e.target)) {
      setShowNav(false);
    }
  };

  const handleClick = () => {
    setShowNav(!showNav);
  };

  const navBody = () => {
    return (
      <div className={styles.sideNavWrapper}>
        <ul className={styles.sideNavList}>
          {compData?.map((item: ISideNavData, index: number) => (
            <li
              className={`${styles.sideNavItem} ${item?.active ? styles.activeItem : ''}`}
              key={`${item?.title + index}`}
            >
              <a
                className={styles.sideNavItemLink}
                href={item?.link}
                onClick={() => {
                  GTMHelper({ ...item?.gtmData });
                }}
              >
                {item?.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return deviceType === 'desktop' ? (
    navBody()
  ) : (
    <div className={styles.mobileWrapper}>
      <div className={styles.sideNavHeading} onClick={handleClick} ref={dropdownRef}>
        {activeNav?.title}
        <span className={`${styles.downArrow} ${showNav ? styles.active : ''}`}>
          <CustomIcon iconName="up" />
        </span>
      </div>
      {showNav && <div className={styles.dropdown}>{navBody()}</div>}
    </div>
  );
};

export default SideNav;
