import { Faqs, HeroBanner } from '@components';
import { IFaqsPageContent, ISearchSuggestion } from '@interfaces';
import { handleSearch, handleSuggestions } from '@logic/faqs';
import { useRef, useState } from 'react';

const FaqsPageContent = (props: IFaqsPageContent) => {
  const { compData, activeCategory = '' } = props;
  const { searchData = null, faqs = null, mainBanner = null } = compData;

  const [searchSuggestions, setSearchSuggestions] = useState<ISearchSuggestion[] | undefined>(
    searchData?.fields?.popularSuggestions,
  );
  const [defaultActiveCategory, setDefaultActiveCategory] = useState<string | undefined>(activeCategory);
  const activeRef = useRef<HTMLDivElement>(null);

  const handleSearchInput = (searchValue: string) => {
    if (searchValue?.length < 1) {
      clearSearch();
    } else {
      handleSearch(searchValue, setSearchSuggestions, faqs?.fields?.data);
    }
  };

  const clearSearch = () => {
    setSearchSuggestions(searchData?.fields?.popularSuggestions);
  };

  const handleSuggestionClick = (item: ISearchSuggestion) => {
    handleSuggestions(item, activeRef, setDefaultActiveCategory);
  };

  return (
    <>
      {mainBanner?.fields && searchData?.fields && (
        <HeroBanner
          compData={mainBanner?.fields}
          searchData={{
            data: searchData?.fields,
            searchSuggestions: searchSuggestions,
            handleSearch: handleSearchInput,
            clearSearch: clearSearch,
            handleSuggestionClick: handleSuggestionClick,
          }}
        />
      )}
      {faqs?.fields?.data && faqs?.fields?.data?.length > 0 && (
        <Faqs
          compData={faqs?.fields}
          noTransition={true}
          activeRef={activeRef}
          defaultActiveCategory={defaultActiveCategory}
        />
      )}
    </>
  );
};

export default FaqsPageContent;
