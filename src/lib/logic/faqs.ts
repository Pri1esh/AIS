import { IFaqCategory, IFaqItemData, ISearchSuggestion } from '@interfaces';
import React from 'react';

const getCategories = (
  categoryData?: IFaqItemData[],
  setCategories?: React.Dispatch<React.SetStateAction<IFaqCategory[] | undefined>>,
  setActiveCategory?: React.Dispatch<React.SetStateAction<IFaqCategory>>,
) => {
  const foundCategories: IFaqCategory[] = [];
  categoryData?.map((item: { categoryID: string; categoryHeading: string }) => {
    if (foundCategories?.some((i: { sectionLink?: string }) => i?.sectionLink === item?.categoryID)) {
      return;
    }
    foundCategories.push({ sectionHeading: item?.categoryHeading, sectionLink: item?.categoryID });
  });
  setCategories && setCategories(foundCategories);
  setActiveCategory && setActiveCategory(foundCategories[0]);
};

const handleSuggestions = (
  item: ISearchSuggestion,
  activeRef: React.RefObject<HTMLDivElement>,
  setDefaultActiveCategory: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  setDefaultActiveCategory(item?.categoryID);

  setTimeout(() => {
    if (item?.questionID && item?.questionID !== '#') {
      const activeQuestion = document.querySelector(`#${item?.questionID}`);
      activeRef?.current &&
        activeQuestion &&
        window.scrollBy({
          top: activeQuestion?.getBoundingClientRect().top - activeRef?.current?.clientHeight - 10,
          behavior: 'smooth',
        });
    } else {
      activeRef?.current &&
        window.scrollBy({ top: activeRef?.current?.getBoundingClientRect().top - 10, behavior: 'smooth' });
    }
  }, 100);
};

const handleSearch = (
  searchValue: string,
  setSearchSuggestions: React.Dispatch<React.SetStateAction<ISearchSuggestion[] | undefined>>,
  faqData?: IFaqItemData[],
) => {
  const data: ISearchSuggestion[] = [];
  faqData?.map((item: IFaqItemData) => {
    if (data.some((i: { itemHeading?: string }) => i?.itemHeading === item?.categoryHeading)) {
      return;
    }

    if (item?.categoryHeading?.toLowerCase()?.includes(searchValue?.toLowerCase())) {
      data.push({
        itemHeading: item?.categoryHeading,
        questionID: '#',
        categoryID: item?.categoryID,
      });
    }
    if (
      item?.title?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
      item?.body?.toLowerCase()?.includes(searchValue?.toLowerCase())
    ) {
      data.push({
        itemHeading: item?.title,
        questionID: item?.questionID,
        categoryID: item?.categoryID,
      });
    }
  });

  setSearchSuggestions(data);
};

const highLightSearchTxt = (value: string, suggestionListRef: React.RefObject<HTMLUListElement>) => {
  const suggestionList = suggestionListRef?.current?.childNodes as any;
  const regex = RegExp(value, 'gi');
  if (suggestionList && suggestionList.length > 0) {
    for (const item of suggestionList) {
      const element = item?.lastChild;
      const textToBeHighlighted = element?.textContent?.match(regex);
      const replacement = `<span>${textToBeHighlighted?.[0]}</span>`;
      const replacedHTML = element?.textContent?.replace(regex, replacement);
      element.innerHTML = replacedHTML;
    }
  }
};

export { handleSuggestions, handleSearch, getCategories, highLightSearchTxt };
