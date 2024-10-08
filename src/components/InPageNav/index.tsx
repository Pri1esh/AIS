import { IInPageNav, IInPageNavData } from '@interfaces';
import { handleNavClick, handleNavPositionFixed, handleNavScroll } from '@logic/inPageNav';
import { useEffect, useRef, useState } from 'react';
import styles from './InPageNav.module.scss';

const InPageNav = (props: IInPageNav) => {
  const { inPageNavData, activeNavId = '', firstActive = false, componentRef, classname = '', setActiveTab } = props;
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const activeNavRef = useRef<HTMLLIElement>(null);
  const [activeNavItem, setActiveNavItem] = useState<string>('');
  const [isFixed, setIsFixed] = useState<boolean>(false);

  useEffect(() => {
    activeNavId &&
      parentContainerRef?.current &&
      document.getElementById(activeNavId) &&
      window.scrollBy({
        top:
          (document?.getElementById(activeNavId) as any)?.getBoundingClientRect()?.top -
          parentContainerRef?.current?.clientHeight +
          25,
        behavior: 'smooth',
      });

    firstActive && inPageNavData?.length && inPageNavData[0]?.title && handleScroll();

    let timer: any = null;
    window.addEventListener('scroll', function () {
      handleNavPositionFixed(parentContainerRef, componentRef, setIsFixed);

      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        handleScroll();
      }, 50);
    });

    return () => {
      window.removeEventListener('scroll', function () {
        handleNavPositionFixed(parentContainerRef, componentRef, setIsFixed);

        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          handleScroll();
        }, 50);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    handleNavScroll(inPageNavData, parentContainerRef, activeNavRef, setActiveNavItem, setActiveTab, firstActive);
  };

  const handleClick = (e: any, item: IInPageNavData) => {
    handleNavClick(e, item, parentContainerRef);
  };

  return (
    <div className={`${styles.navWrapper} ${classname} ${isFixed ? styles.fixedNav : ''} `}>
      <div className={styles.inPageNavWrapper} ref={parentContainerRef}>
        <ul className={styles.inPageNav}>
          {inPageNavData?.map((navItem: IInPageNavData, index: number) => (
            <li
              className={`${styles.inPageNavItem} ${navItem?.title === activeNavItem ? styles.activeNavItem : ''}`}
              key={`${navItem?.title + index}`}
              ref={navItem?.title === activeNavItem ? activeNavRef : null}
            >
              <a href={navItem?.url} onClick={(e) => handleClick(e, navItem)}>
                {navItem?.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InPageNav;
