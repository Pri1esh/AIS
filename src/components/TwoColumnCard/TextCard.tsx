import { CustomIcon, CustomImage, CustomLink, FormDatePicker } from '@components';
import { ICardData, ICardLocationList } from '@interfaces';
import { GTMHelper } from '@utils';
import { useRef } from 'react';
import { Accordion } from 'react-bootstrap';
import styles from './TwoColumnCard.module.scss';

const TextCard = (props: { cardData: ICardData }) => {
  const { cardData } = props;
  const myref = useRef<HTMLDivElement>(null);

  const getCardTheme = (theme: string) => {
    switch (theme) {
      case 'dark':
        return styles.darkTheme;
      case 'snow':
        return styles.snowTheme;
      case 'blue':
        return styles.blueTheme;
      case 'purple':
        return styles.purpleTheme;
      case 'darkBlue':
        return styles.darkBlueTheme;
      default:
        return '';
    }
  };
  return (
    <div className={`${styles.textSection} ${getCardTheme(cardData?.theme)} `} ref={myref}>
      {cardData?.backgroundImage && (
        <CustomImage
          className={styles.backgroundImage}
          src={{
            mobileSource: cardData?.backgroundImage,
            tabletSource: cardData?.backgroundImage,
            defaultSource: cardData?.backgroundImage,
          }}
          alt={cardData?.imageAlt}
        />
      )}
      <div className={`${styles.textWrapper}`}>
        {cardData?.subHeading && <p className={styles.subHeading}>{cardData?.subHeading}</p>}
        {cardData?.heading && <h2 className={styles.heading}>{cardData?.heading}</h2>}
        {cardData?.description && (
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: cardData?.description }}></div>
        )}
        {cardData?.mainDescription && (
          <div className={styles.mainDescription} dangerouslySetInnerHTML={{ __html: cardData?.mainDescription }}></div>
        )}
        {cardData?.cardType?.includes('dob') && <FormDatePicker label={cardData?.label} />}
        {cardData?.subDescription && (
          <div className={styles.subDescription} dangerouslySetInnerHTML={{ __html: cardData?.subDescription }}></div>
        )}
        {cardData?.itemList &&
          cardData?.itemList?.map((item, index) => (
            <div className={styles.itemList} key={`${(item?.itemHeading || '') + index}`}>
              {item?.itemHeading && (
                <div className={styles.itemHeading} dangerouslySetInnerHTML={{ __html: item?.itemHeading }}></div>
              )}
              <div className={styles.itemDescription}>
                {item?.itemDescription && <div dangerouslySetInnerHTML={{ __html: item?.itemDescription }}></div>}
                {item?.itemSubDescription && <div dangerouslySetInnerHTML={{ __html: item?.itemSubDescription }}></div>}
              </div>
            </div>
          ))}

        {cardData?.listItem &&
          cardData?.listItem?.map((row, index) => (
            <div key={`${(row?.heading || '') + index}`} className={styles.listItemWrapper}>
              {row?.heading && (
                <div className={styles.listHeading} dangerouslySetInnerHTML={{ __html: row?.heading }}></div>
              )}
              {row?.subHeading && <div dangerouslySetInnerHTML={{ __html: row?.subHeading }}></div>}
              <ul className={styles.listItem}>
                {row?.item?.map((item, index: number) => (
                  <li key={`${(item?.timing || '') + index}`}>
                    {item?.description} {item?.timing && <span>{item?.timing}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        {cardData?.cardHeading && (
          <div className={styles.cardHeading} dangerouslySetInnerHTML={{ __html: cardData?.cardHeading }}></div>
        )}
        {cardData?.cardDescription && (
          <div className={styles.cardDescription} dangerouslySetInnerHTML={{ __html: cardData?.cardDescription }}></div>
        )}
        {cardData?.locationData && (
          <div className={styles.locationWrapper}>
            <ul>
              {cardData?.locationData.map((item: ICardLocationList, key: number) => (
                <li key={`${(item?.timing || '') + key}`}>
                  {item?.link !== '' ? (
                    <a
                      href={item?.link}
                      target={item?.target}
                      onClick={() => {
                        GTMHelper({
                          ...item?.gtmData,
                        });
                      }}
                      rel="noreferrer"
                    >
                      <CustomIcon iconName={item?.label} />
                      <div dangerouslySetInnerHTML={{ __html: item?.detail }}></div>
                    </a>
                  ) : (
                    <>
                      <CustomIcon iconName={item?.label} />
                      <div dangerouslySetInnerHTML={{ __html: item?.detail }}></div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {cardData?.link && cardData?.linkText && (
          <div className={styles.buttonWrapper}>
            <CustomLink
              href={cardData?.link}
              variant={'underline'}
              onClick={() => {
                GTMHelper({ ...cardData?.gtmData });
              }}
            >
              {cardData?.linkText}
            </CustomLink>
          </div>
        )}
        {cardData?.subLink && (
          <div className={` ${styles.buttonWrapper} ${styles.subLink} `}>
            <CustomLink
              href={cardData?.subLink}
              variant={'underline'}
              target={cardData?.target}
              onClick={() => {
                GTMHelper({ ...cardData?.gtmData });
              }}
            >
              {cardData?.subLinkText}
            </CustomLink>
          </div>
        )}
        {cardData?.isAccordion && (
          <div className={styles.accordionWrapper}>
            <Accordion defaultActiveKey={cardData?.accordionItem?.[0]?.eventKey}>
              {cardData?.accordionItem?.map((item, key: number) => (
                <Accordion.Item
                  className={styles.item}
                  eventKey={`${item?.eventKey}`}
                  key={`${(item?.title || '') + key}`}
                >
                  <Accordion.Header className={styles.itemHeading}>{item?.title}</Accordion.Header>
                  <Accordion.Body className={styles.itemBody}>
                    <ul>
                      {item?.accordionItem?.map((item, key: number) => (
                        <li key={`${(item?.description || '') + key}`}>{item.description}</li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextCard;
