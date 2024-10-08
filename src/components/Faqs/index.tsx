import { CustomLink, HorizontalTabs } from '@components';
import { ICustomToggle, IFaqCategory, IFaqItemData, IFaqs } from '@interfaces';
import { getCategories } from '@logic/faqs';
import { GTMHelper } from '@utils';
import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import styles from './faqs.module.scss';

const CustomToggle = (props: ICustomToggle) => {
  const { children, eventKey } = props;
  const decoratedOnClick = useAccordionButton(eventKey);
  return (
    <div className={styles.itemHeading} onClick={decoratedOnClick}>
      {children}
    </div>
  );
};

const Faqs = (props: IFaqs) => {
  const { compData, noTransition = false, activeRef, defaultActiveCategory = '' } = props;
  const myref = useRef<HTMLDivElement>(null);
  const refwrapper = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<IFaqCategory[] | undefined>(undefined);
  const [faqData, setFaqData] = useState<IFaqItemData[] | undefined>(compData?.data);
  const [toggleCategoryChange, setToggleCategoryChange] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<IFaqCategory>({
    sectionHeading: compData?.data?.[0]?.categoryHeading || '',
    sectionLink: compData?.data?.[0]?.categoryID || '',
  });
  const [isActive, setActive] = useState(-1);
  const [activeTab, setActiveTab] = useState<string>(defaultActiveCategory || compData?.data?.[0]?.categoryID || '');

  useEffect(() => {
    getCategories(compData?.data, setCategories, setActiveCategory);
    // addClassOnScrollIntoView(0.1, 'slideInUp', myref);
    // addClassOnScrollIntoView(0.1, 'bgTransition', refwrapper);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (selectedCategory: string | undefined) => {
    const data = compData?.data?.filter((item: { categoryID: string }) => item?.categoryID === selectedCategory);
    if (data && data?.length > 0) {
      setFaqData(data);
      setToggleCategoryChange(!toggleCategoryChange);
      setActiveCategory(
        categories?.find((item) => item?.sectionLink === selectedCategory) || { sectionHeading: '', sectionLink: '' },
      );
      selectedCategory && setActiveTab(selectedCategory);
    } else {
      handleCategoryChange(categories?.[0]?.sectionLink || '');
    }
    setActive(-1);
  };

  const toggleClass = (key: number) => {
    if (key === isActive) {
      setActive(-1);
    } else {
      setActive(key);
    }
  };

  return (
    <section
      className={cx(styles.wrapper, { [styles.noTransition]: noTransition })}
      ref={refwrapper}
      id={compData?.sectionID}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div ref={myref}>
        {categories && categories?.length > 1 && (
          <div className={styles.tabWrapper} ref={activeRef} key={defaultActiveCategory}>
            <HorizontalTabs
              handleTabClick={handleCategoryChange}
              defaultActiveTab={defaultActiveCategory || compData?.data?.[0]?.categoryID || ''}
              compData={categories}
              activeTab={activeTab}
            />
          </div>
        )}
        <Container>
          {categories && categories?.length > 1
            ? activeCategory?.sectionHeading && (
                <h2 className={styles.sectionHeading}>
                  {activeCategory?.sectionHeading || compData?.data?.[0]?.categoryHeading}
                </h2>
              )
            : compData?.data?.[0]?.categoryHeading && (
                <h2 className={styles.sectionHeading}>{compData?.data?.[0]?.categoryHeading}</h2>
              )}
          <div className={styles.faqDataWrapper} key={toggleCategoryChange?.toString()}>
            <Accordion>
              <Card>
                {faqData?.map((item, index: number) => {
                  return (
                    item?.title && (
                      // item?.body &&
                      <Card.Header
                        itemScope
                        itemType="https://schema.org/Question"
                        itemProp="mainEntity"
                        className={` ${styles.item} ${isActive == index ? styles.active : ''}`}
                        id={item?.questionID}
                        key={`${item?.questionID + index}`}
                      >
                        <CustomToggle eventKey={`faq${index}`}>
                          <p
                            itemProp="name"
                            onClick={() => {
                              toggleClass(index);
                            }}
                          >
                            {item?.title}
                          </p>
                        </CustomToggle>
                        <Accordion.Collapse
                          itemScope
                          itemType="https://schema.org/Answer"
                          itemProp="acceptedAnswer"
                          eventKey={`faq${index}`}
                        >
                          <div
                            itemProp="text"
                            className={styles.itemBody}
                            dangerouslySetInnerHTML={{ __html: item?.body }}
                          />
                        </Accordion.Collapse>
                      </Card.Header>
                    )
                  );
                })}
              </Card>
            </Accordion>
            {categories && categories?.length < 2 && compData?.viewAllLink && (
              <div className={styles.viewAll}>
                {/* <div className={styles.viewAll} onClick={(e) => handleViewAllClick && handleViewAllClick(e)}> */}
                <CustomLink
                  href={compData?.viewAllLink}
                  variant={'underline'}
                  target={compData?.target}
                  onClick={() => {
                    GTMHelper({
                      ...compData?.gtmData,
                    });
                  }}
                >
                  {compData?.viewAllLabel}
                </CustomLink>
              </div>
            )}
            {compData?.note && <p className={styles.note}>{compData?.note}</p>}
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Faqs;
