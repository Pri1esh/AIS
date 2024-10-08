import { IHorizontalTabs } from '@interfaces';
import { scrollTabIntoView } from '@utils';
import React, { useEffect, useRef } from 'react';
import styles from './horizontalTabs.module.scss';

const HorizontalTabs = (props: IHorizontalTabs) => {
  const { classname, compData, defaultActiveTab = '', handleTabClick, activeTab } = props;

  const parentRef = useRef<HTMLUListElement>(null);
  const activeTabRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (defaultActiveTab) {
      setTimeout(() => scrollTabIntoView(parentRef?.current, activeTabRef?.current), 100);
      handleTabClick && handleTabClick(defaultActiveTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultActiveTab]);

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    navItem: {
      sectionLink?: string;
      sectionHeading?: string;
    },
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => scrollTabIntoView(parentRef?.current, activeTabRef?.current), 100);
    handleTabClick && handleTabClick(navItem?.sectionLink);
  };

  return (
    <div className={`${styles.wrapper} ${classname ? classname : ''}`}>
      <ul className={styles.navWrapper} ref={parentRef}>
        {compData &&
          compData?.map((navItem, index: number) => (
            <li
              className={`${styles.navItem} ${navItem?.sectionLink === activeTab ? styles.activeNavItem : ''}`}
              key={`${(navItem?.sectionLink || '') + index}`}
              ref={navItem?.sectionLink === activeTab ? activeTabRef : null}
              onClick={(e) => handleClick(e, navItem)}
            >
              <a className={styles.navLink} href={navItem?.sectionLink}>
                {navItem?.sectionHeading}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HorizontalTabs;
