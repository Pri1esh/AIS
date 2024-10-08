import { IInPageNavData } from '@interfaces';
import { scrollTabIntoView } from '@utils';
import React from 'react';

export const setActiveNav = (
  navItem: IInPageNavData,
  parentRef: React.RefObject<HTMLDivElement>,
  activeRef: React.RefObject<HTMLLIElement>,
  setActiveNavItem: React.Dispatch<React.SetStateAction<string>>,
  setActiveTab?: React.Dispatch<React.SetStateAction<string>> | undefined,
) => {
  setActiveNavItem(navItem?.title);
  setActiveTab && setActiveTab(navItem?.url);
  setTimeout(() => {
    scrollTabIntoView(parentRef?.current, activeRef?.current);
  }, 100);
};

export const handleNavScroll = (
  navData: IInPageNavData[],
  parentRef: React.RefObject<HTMLDivElement>,
  activeRef: React.RefObject<HTMLLIElement>,
  setActiveNavItem: React.Dispatch<React.SetStateAction<string>>,
  setActiveTab?: React.Dispatch<React.SetStateAction<string>> | undefined,
  firstActive = false,
) => {
  for (let index = navData?.length - 1; index >= 0; index--) {
    if (
      parentRef?.current &&
      document?.querySelector(navData[index].url as any)?.getBoundingClientRect()?.top -
        parentRef?.current?.clientHeight <=
        0
    ) {
      setActiveNav(navData[index], parentRef, activeRef, setActiveNavItem, setActiveTab);
      break;
    }
  }
  if (firstActive) {
    if (
      parentRef?.current &&
      navData &&
      (document?.querySelector(navData[0].url) as any)?.getBoundingClientRect()?.top -
        parentRef?.current?.clientHeight >=
        0
    ) {
      setActiveNavItem(navData?.[0]?.title);
      setActiveTab && setActiveTab(navData?.[0]?.url);
    }
  }
};

export const handleNavClick = (e: any, item: IInPageNavData, parentRef: React.RefObject<HTMLDivElement>) => {
  e.preventDefault();
  parentRef?.current &&
    window.scrollBy({
      top:
        (document?.querySelector(item?.url) as any)?.getBoundingClientRect()?.top -
        parentRef?.current?.clientHeight +
        25,
      behavior: 'smooth',
    });
};

export const handleNavPositionFixed = (
  parentRef: React.RefObject<HTMLDivElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  setIsFixed: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (
    containerRef?.current &&
    parentRef.current &&
    typeof window !== 'undefined' &&
    parentRef?.current?.getBoundingClientRect().top - parentRef?.current?.clientHeight <= 0 &&
    containerRef?.current?.getBoundingClientRect().top +
      containerRef?.current?.clientHeight -
      parentRef?.current?.clientHeight <=
      0
  ) {
    setIsFixed(true);
  } else {
    setIsFixed(false);
  }
};
