import { CustomIcon, CustomImage, NavBar, Notification, SocialLinks,HomePopUp } from '@components';
import { IHeader, IHeaderContact } from '@interfaces';
import { GTMHelper, useDeviceType } from '@utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './header.module.scss';

const Header = (props: IHeader) => {
  const { headerData, notificationData } = props;
  const [showHeader, setShowHeader] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const { deviceType } = useDeviceType();
  const [showNotification, setShowNotification] = useState<boolean>(true);
  const [notificationDelay, setNotificationDelay] = useState<boolean>(false);
  const [transition, setTransition] = useState<boolean>(false);

  const headerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 150 && !transition) {
      if (showHeader && window.scrollY >= scrollPos) {
        setTimeout(() => setTransition(true), 1);
        setTimeout(() => setTransition(false), 650);
      }

      setShowHeader(window.scrollY < scrollPos);
    }
    setScrollPos(window.scrollY);
  }, [scrollPos, showHeader, transition]);

  useEffect(() => {
    setTimeout(() => setNotificationDelay(true), 100);
    setScrollPos(window.scrollY);
    typeof window !== 'undefined' && window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const checkOnScroll = () => {
    if (typeof window !== 'undefined' && window.scrollY > 250) {
      if (showHeader) {
        return styles.isVisible;
      } else {
        return styles.isHidden;
      }
    }
    if (typeof window !== 'undefined' && window.scrollY > 150) {
      return '';
    } else if (showNotification && notificationData && notificationDelay) {
      return styles.addTop;
    } else {
      return '';
    }
  };

  return (
    <>
      {showNotification && notificationDelay && (
        <Notification notificationData={notificationData} setShowNotification={setShowNotification} />
      )}
      {headerData && (
        <header className={styles.header}>
          <div
            ref={headerRef}
            className={`${styles.headerWrapper} ${transition ? styles.wrapper : ''} ${styles.fixedHeader}  
            ${checkOnScroll()}`}
          >
            {deviceType === 'desktop' && headerData?.contact ? (
              <div className={styles.subHeader}>
                <ul className={styles.contactWrapper}>
                  {headerData?.contact?.map((item: IHeaderContact, key: number) => (
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
                  <SocialLinks socialData={headerData?.social} />
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className={styles.wrapper}>
              <div className={styles.logoWrapper}>
                {headerData?.url !== '' ? (
                  <a
                    href={headerData?.url}
                    onClick={() => {
                      GTMHelper({
                        ...headerData?.gtmData,
                      });
                    }}
                  >
                    {headerData?.logoSrc && (
                      <>
                        {deviceType === 'mobile' ? (
                          <CustomImage
                            src={{
                              defaultSource: headerData?.logoSrc,
                            }}
                            alt={headerData?.logoAlt}
                            lazy="false"
                            loader="false"
                            width={146}
                            height={67}
                          />
                        ) : (
                          <CustomImage
                            src={{
                              defaultSource: headerData?.logoSrc,
                            }}
                            alt={headerData?.logoAlt}
                            lazy="false"
                            width={166}
                            height={77}
                            loader="false"
                          />
                        )}
                      </>
                    )}
                  </a>
                ) : (
                  headerData?.logoSrc && (
                    <>
                      {deviceType === 'mobile' ? (
                        <CustomImage
                          src={{
                            defaultSource: headerData?.logoSrc,
                          }}
                          alt={headerData?.logoAlt}
                          lazy="false"
                          loader="false"
                          width={146}
                          height={67}
                        />
                      ) : (
                        <CustomImage
                          src={{
                            defaultSource: headerData?.logoSrc,
                          }}
                          alt={headerData?.logoAlt}
                          width={166}
                          height={77}
                          lazy="false"
                          loader="false"
                        />
                      )}
                    </>
                  )
                )}
              </div>
              <NavBar
                contactData={headerData?.contact}
                socialData={headerData?.social}
                showHeader={showHeader}
                navBarData={headerData?.navigation}
                logoSrcHamburger={headerData?.logoSrcHamburger}
                hamburgerBG={headerData?.hamburgerBG}
                logoAlt={headerData?.logoAlt}
              />
            </div>

            {headerData?.img && <HomePopUp compData={headerData?.img}/>}

          </div>
        </header>
      )}
    </>
  );
};

export default Header;
