import { CustomIcon, CustomImage, SocialLinks } from '@components';
import {
  IHeaderContactData,
  IHeaderNavbarData,
  IHeaderNavbarDataList,
  IHeaderNavbarDataSubMenu,
  INavBar,
} from '@interfaces';
import { GTMHelper, useDeviceType } from '@utils';
import React, { useState } from 'react';
import styles from './NavBar.module.scss';

const NavBar = (props: INavBar) => {
  const { socialData, showHeader, navBarData, logoSrcHamburger, hamburgerBG, logoAlt, contactData } = props;
  const [showMenu, setShowmenu] = React.useState(false);
  const { deviceType } = useDeviceType();
  const [isActive, setActive] = useState(-1);
  const toggleClass = (key: number) => {
    if (key === isActive) {
      setActive(-1);
    } else {
      setActive(key);
    }
  };

  const onShowMenu = () => {
    if (showMenu) {
      document.body.classList.remove('menuOpen');
    } else {
      document.body.classList.add('menuOpen');
    }
    setShowmenu(!showMenu);
    setActive(-1);
  };

  const checkOnScroll = () => {
    if (typeof window !== 'undefined' && window.scrollY > 250 && showHeader) {
      return styles.active;
    } else {
      return '';
    }
  };

  return (
    <nav className={`${styles.navBar} ${showMenu ? styles.active : ''}`}>
      <button
        className={`${styles.navbarToggle} ${checkOnScroll()}`}
        type="button"
        onClick={onShowMenu}
        aria-label="MobileToggle"
      >
        <CustomIcon iconName="hamburger" />
      </button>
      <div className={`${styles.navItemWrapper} ${showMenu ? styles.active : ''}`}>
        <div className={styles.hamburgerLogoWrapper}>
          {logoSrcHamburger && (
            <CustomImage
              src={{ defaultSource: logoSrcHamburger }}
              alt={logoAlt}
              className={styles.hamburgerLogo}
              loader="false"
            />
          )}
        </div>
        <button
          className={`${styles.navbarToggle} ${checkOnScroll()}`}
          type="button"
          onClick={onShowMenu}
          aria-label="MobileToggle"
        >
          <span className={styles.navbarToggleIcon}></span>
        </button>
        <ul>
          {navBarData?.map((item: IHeaderNavbarData, key: number) => (
            <li className={styles.navItem} key={`${item?.url + key}`}>
              {item?.isHighLighted && <span className={styles.highlightLabel}>{item?.highlightLabel}</span>}
              {deviceType === 'desktop' ? (
                <>
                  {item?.url ? (
                    <a
                      href={item?.url}
                      className={`${styles.navLink} ${item?.isActive ? styles.active : ''}`}
                      onClick={() => {
                        GTMHelper({
                          ...item?.gtmData,
                        });
                      }}
                    >
                      {item?.label}
                    </a>
                  ) : (
                    <div
                      className={`${styles.navLink} ${item?.isActive ? styles.active : ''}`}
                      onClick={() => {
                        GTMHelper({
                          ...item?.gtmData,
                        });
                      }}
                    >
                      {item?.label}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {item?.subMenu?.length > 0 ? (
                    <div
                      onClick={() => {
                        toggleClass(key + 1);
                      }}
                      className={`${styles.navLink} ${isActive === key + 1 ? styles.active : ''}`}
                    >
                      {item.label}
                      <span className={styles.downArrow}>
                        <CustomIcon iconName="up" />
                      </span>
                    </div>
                  ) : (
                    <a
                      href={item.url}
                      className={styles.navLink}
                      onClick={() => {
                        GTMHelper({
                          ...item?.gtmData,
                        });
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                </>
              )}
              {item?.subMenu?.length > 0 && (
                <div className={`${styles.subMenu} ${isActive === key + 1 ? styles.active : ''}`}>
                  <ul>
                    {item?.subMenu?.map((item: IHeaderNavbarDataList, key: number) => (
                      <li className={styles.navItem} key={`${item?.url + key}`}>
                        <a
                          href={item?.url}
                          className={styles.navLink}
                          onClick={() => {
                            GTMHelper({
                              ...item?.gtmData,
                            });
                          }}
                        >
                          {item.label}
                        </a>
                        {deviceType === 'desktop' && item?.subMenu?.length > 0 ? (
                          <div className={`${styles.subMenu}`}>
                            <ul>
                              {item?.subMenu?.map((item: IHeaderNavbarDataSubMenu, key: number) => (
                                <li className={styles.navItem} key={`${item?.url + key}`}>
                                  <a
                                    href={item?.url}
                                    className={styles.navLink}
                                    onClick={() => {
                                      GTMHelper({
                                        ...item?.gtmData,
                                      });
                                    }}
                                  >
                                    {item.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <></>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
        {deviceType !== 'desktop' ? (
          <div className={styles.contactWrapper}>
            <div className={styles.wrapper}>
              <ul className={styles.contactWrapper}>
                {contactData?.map((item: IHeaderContactData, key: number) => (
                  <li key={`${item?.url + key}`}>
                    <a
                      href={item?.url}
                      onClick={() => {
                        GTMHelper({
                          ...item?.gtmData,
                        });
                      }}
                    >
                      <CustomIcon iconName={item?.type} />
                      {item?.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className={styles.socialWrapper}>
                <SocialLinks socialData={socialData} />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {hamburgerBG && (
          <CustomImage
            src={{ defaultSource: hamburgerBG }}
            alt=""
            className={styles.hamburgerWaterMark}
            loader="false"
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
