import { CustomIcon, CustomImage, SocialLinks } from '@components';
import {
  IFooter,
  IFooterContact,
  IFooterCopyRightList,
  IFooterlink,
  IFooterLinkList,
  IFooterQuicklinksList,
} from '@interfaces';
import { GTMHelper, useDeviceType } from '@utils';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './footer.module.scss';

const Footer = (props: IFooter) => {
  const { footerData } = props;
  const [isActive, setActive] = useState(-1);
  const { deviceType } = useDeviceType();
  const toggleClass = (key: number) => {
    if (key === isActive) {
      setActive(-1);
    } else {
      setActive(key);
    }
  };
  return (
    <>
      {footerData ? (
        <footer className={styles.footerWrapper}>
          <Container>
            <ul className={styles.footerNav}>
              <li className={styles.quickLinks}>
                <p
                  className={isActive === 0 && deviceType !== 'desktop' ? styles.active : ''}
                  onClick={() => {
                    deviceType !== 'desktop' && toggleClass(0);
                  }}
                >
                  {footerData?.quicklinks?.title}
                  <CustomIcon iconName={'up'} />
                </p>
                <div
                  className={`${styles.footerLinkList} ${
                    deviceType !== 'desktop' && isActive === 0 ? styles.active : ''
                  }`}
                >
                  {footerData?.quicklinks?.list.map((item: IFooterQuicklinksList, key: number) => (
                    <a
                      href={item?.url}
                      target={item?.target}
                      key={`${item?.url + key}`}
                      onClick={() => {
                        GTMHelper({
                          ...item?.gtmData,
                        });
                      }}
                    >
                      {item?.label}
                    </a>
                  ))}
                </div>
              </li>
              <li className={styles.schoolInfo}>
                <span className={styles.footerLogo}>
                  {footerData?.schoolInfo?.schoolLogo && (
                    <CustomImage
                      alt={footerData?.schoolInfo?.alt}
                      src={{ defaultSource: footerData?.schoolInfo?.schoolLogo }}
                      width={177}
                      height={82}
                      loader="false"
                    />
                  )}
                </span>
                <ul>
                  {footerData?.schoolInfo?.contact?.map((item: IFooterContact, key: number) => (
                    <li className={styles.iconWrapper} key={`${item?.url + key}`}>
                      {item?.url ? (
                        <a
                          href={item?.url}
                          onClick={() => {
                            GTMHelper({
                              ...item?.gtmData,
                            });
                          }}
                        >
                          <div className={styles.iconWrapper}>
                            <CustomIcon iconName={item?.label} />
                          </div>
                          {item?.detail}
                        </a>
                      ) : (
                        <React.Fragment key=".0">
                          <div className={styles.iconWrapper}>
                            <CustomIcon iconName={item?.label} />
                          </div>
                          {item?.detail}
                        </React.Fragment>
                      )}
                    </li>
                  ))}
                  <li className={styles.socialBlock}>
                    <SocialLinks socialData={footerData?.schoolInfo?.social} />
                  </li>
                </ul>
              </li>
              {footerData?.footerlinks?.map((item: IFooterlink, key: number) => (
                <li key={`${item?.url + key}`}>
                  <p
                    className={isActive == key + 1 && deviceType !== 'desktop' ? styles.active : ''}
                    onClick={() => {
                      deviceType !== 'desktop' && toggleClass(key + 1);
                    }}
                  >
                    {item?.title}
                    <CustomIcon iconName={'up'} />
                  </p>
                  <div
                    className={`${styles.footerLinkList} ${
                      deviceType !== 'desktop' && isActive === key + 1 ? styles.active : ''
                    }`}
                  >
                    {item?.list?.map((item: IFooterLinkList, key: number) => (
                      <a
                        href={item?.url}
                        target={item?.target}
                        key={`${item?.url + key}`}
                        onClick={() => {
                          GTMHelper({
                            ...item?.gtmData,
                          });
                        }}
                      >
                        {item?.label}
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </Container>
          <div className={styles.footerDivider}></div>
          <Container>
            <div className={styles.copyRight}>
              <div>{footerData?.copyRight?.copyRightText}</div>
              <div>
                <ul>
                  {footerData?.copyRight?.list?.map((item: IFooterCopyRightList, key: number) => (
                    <li key={`${item?.url + key}`}>
                      <a
                        href={item?.url}
                        target={item?.target}
                        onClick={() => {
                          GTMHelper({
                            ...item?.gtmData,
                          });
                        }}
                      >
                        {item?.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </footer>
      ) : (
        <></>
      )}
    </>
  );
};

export default Footer;
