import { CustomIcon, CustomImage, CustomLink } from '@components';
import { ILinkSection, ILinkSectionLink } from '@interfaces';
import { GTMHelper } from '@utils';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from './linkSection.module.scss';

const LinkSection = (props: ILinkSection) => {
  const { compData, isHeading } = props;
  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState<any>(null);

  const handleClose = () => {
    setShow(false);
    setSelectedImg(null);
  };

  return (
    <div className={styles.linkSectionWrapper}>
      {compData?.heading &&
        (isHeading ? (
          <h1 className={styles.heading}>{compData?.heading}</h1>
        ) : (
          <h2 className={styles.heading}>{compData?.heading}</h2>
        ))}
      {compData?.description && (
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: compData?.description }} />
      )}
      {compData?.subHeading && <p className={styles.subHeading}>{compData?.subHeading}</p>}
      <div className={styles.wrapper}>
        {compData?.links?.map((item: ILinkSectionLink, index: number) => (
          <div className={styles.link} key={`${item?.linktext + index}`}>
            <CustomLink
              href={item?.link}
              variant={'darkUnderline'}
              download={item?.target === 'pdf' ? true : false}
              target={item?.target}
              onClick={(e: any) => {
                if (item?.target === 'popup') {
                  e.preventDefault();
                  setSelectedImg({
                    imageSource: item?.imageSource,
                    imageSourceMobile: item?.imageSourceMobile,
                    imageSourceTablet: item?.imageSourceTablet,
                    imageAlt: item?.imageAlt,
                  });
                  setShow(true);
                }
                GTMHelper({ ...item?.gtmData });
              }}
            >
              {item?.linktext}
              {item?.viewText ? (
                <span className={styles.viewText}>{item?.viewText}</span>
              ) : (
                <CustomIcon iconName={'download'} />
              )}
            </CustomLink>
          </div>
        ))}
      </div>

      <Modal className={styles.modal} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className={styles.header} />
        <Modal.Body>
          {selectedImg?.imageSource || selectedImg?.imageSourceMobile || selectedImg?.imageSourceTablet ? (
            <div className={styles.content}>
              <CustomImage
                src={{
                  mobileSource: selectedImg?.imageSourceMobile,
                  tabletSource: selectedImg?.imageSourceTablet,
                  defaultSource: selectedImg?.imageSource,
                }}
                alt={selectedImg?.imageAlt}
              />
            </div>
          ) : (
            <p>No data found.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default LinkSection;
