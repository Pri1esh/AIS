import { ISelectDropdownOption, IStoryCardData, IStoryCardFilterData } from '@interfaces';
import React from 'react';

const getFilterTabs = (
  data: IStoryCardData[],
  setFilterData: React.Dispatch<React.SetStateAction<IStoryCardFilterData[]>>,
) => {
  const foundFilters: IStoryCardFilterData[] = [];
  data?.map((item: IStoryCardData) => {
    item?.filter?.map((currFilter: ISelectDropdownOption) => {
      const foundFilterIdx = foundFilters?.findIndex((foundItem) => foundItem?.placeholder === currFilter?.placeholder);
      if (foundFilterIdx !== -1) {
        const foundOption = foundFilters?.[foundFilterIdx]?.fieldOptions?.find(
          (option) => option?.id === currFilter?.id,
        );
        if (!foundOption) {
          foundFilters[foundFilterIdx].fieldOptions = [
            ...foundFilters[foundFilterIdx].fieldOptions,
            {
              id: currFilter?.id,
              label: currFilter?.label,
              placeholder: currFilter?.placeholder,
              priority: currFilter?.priority,
            },
          ];
        }
      } else {
        const newFilter: IStoryCardFilterData = {
          placeholder: currFilter?.placeholder || '',
          fieldOptions: [
            {
              label: currFilter?.label,
              id: currFilter?.id,
              placeholder: currFilter?.placeholder,
              priority: currFilter?.priority,
            },
          ],
        };
        foundFilters?.push(newFilter);
      }
      foundFilters?.[foundFilterIdx]?.fieldOptions?.sort((a: any, b: any) => a?.priority - b?.priority);
    });
  });
  setFilterData(foundFilters);
};

const filterStoriesHelper = (data: IStoryCardData, filters: ISelectDropdownOption[]) => {
  for (let i = 0; i < data?.filter?.length; i++) {
    for (let j = 0; j < filters?.length; j++) {
      if (data?.filter?.[i]?.placeholder === filters?.[j]?.type && data?.filter?.[i]?.id !== filters?.[j]?.id) {
        return false;
      }
    }
  }
  return true;
};

const filterStoriesData = (
  selectedFilter: ISelectDropdownOption,
  id: string,
  activeFilters: ISelectDropdownOption[],
  setActiveFilters: React.Dispatch<ISelectDropdownOption[]>,
  storiesData: IStoryCardData[],
  setStories: React.Dispatch<IStoryCardData[]>,
) => {
  let updatedFilters: ISelectDropdownOption[] = [];
  if (activeFilters?.length <= 0) {
    updatedFilters?.push({ ...selectedFilter, type: id });
  } else if (activeFilters?.some((filter: ISelectDropdownOption) => filter?.type === id)) {
    activeFilters?.map((item: ISelectDropdownOption) => {
      if (selectedFilter !== null && item?.type === id) {
        updatedFilters?.push({ ...selectedFilter, type: id });
      } else if (selectedFilter === null && id === item?.type) {
        //empty if else block
      } else if (item !== null && id !== item?.type) {
        updatedFilters?.push(item);
      }
    });
  } else {
    updatedFilters = [...activeFilters, { ...selectedFilter, type: id }];
  }
  setActiveFilters(updatedFilters);

  let filteredStories: IStoryCardData[] = [];
  if (updatedFilters?.length <= 0) {
    filteredStories = storiesData;
  } else {
    filteredStories = storiesData?.filter((data: IStoryCardData) => {
      return filterStoriesHelper(data, updatedFilters);
    });
  }
  setStories([...filteredStories]);
};

const getStoriesData = (
  page: number,
  dataToShow: number,
  storiesData: IStoryCardData[],
  storiesToShow: IStoryCardData[],
  setStoriesToShow: React.Dispatch<IStoryCardData[]>,
  setPageNo: React.Dispatch<number>,
) => {
  const newStories = [];
  for (let i = (page - 1) * dataToShow; i < storiesData?.length && i < page * dataToShow; i++) {
    newStories?.push(storiesData?.[i]);
  }
  page === 1 ? setStoriesToShow([...newStories]) : setStoriesToShow([...storiesToShow, ...newStories]);
  setPageNo(page + 1);
};

const checkIfRefOnScreen = (ref: React.RefObject<HTMLDivElement>, setUpdateStories: React.Dispatch<boolean>) => {
  const refDimesions = ref && ref?.current?.getBoundingClientRect();
  const isVisible =
    refDimesions && refDimesions?.bottom <= (window.innerHeight || document.documentElement.clientHeight);

  if (isVisible && ref?.current) {
    setUpdateStories(true);
  } else {
    return;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
};

export { getFilterTabs, filterStoriesHelper, filterStoriesData, getStoriesData, checkIfRefOnScreen };
