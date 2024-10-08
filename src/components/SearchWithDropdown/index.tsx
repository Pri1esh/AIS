import { ISearchSuggestion, ISearchWithDropdown } from '@interfaces';
import { highLightSearchTxt } from '@logic/faqs';
import { useRef, useState } from 'react';
import styles from './searchWithDropdown.module.scss';

const SearchWithDropdown = (props: ISearchWithDropdown) => {
  const { compData } = props;
  const { data, clearSearch, handleSearch, handleSuggestionClick, searchSuggestions } = compData;

  const [searchValue, setSearchValue] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const suggestionListRef = useRef<HTMLUListElement>(null);

  const handleClearClick = () => {
    setTimeout(() => {
      setSearchValue('');
      clearSearch && clearSearch();
    }, 200);
  };

  const handleSearchInput = (e: any) => {
    setSearchValue(e.target.value);
    handleSearch && handleSearch(e.target.value);
    setTimeout(() => highLightSearchTxt(e.target.value, suggestionListRef), 200);
  };

  const handleClick = (item: ISearchSuggestion) => {
    handleSuggestionClick && handleSuggestionClick(item);
    handleClearClick();
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={`${styles.searchInputWrapper} ${isInputFocused ? styles.isActive : ''}`}>
        <span className={styles.searchIcon}></span>
        {searchValue && <span className={styles.crossIcon} onClick={() => handleClearClick()}></span>}
        <input
          className={styles.searchInput}
          placeholder={data?.searchPlaceholder}
          type="text"
          autoComplete={'off'}
          value={searchValue}
          onChange={(e) => handleSearchInput(e)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setTimeout(() => setIsInputFocused(false), 150)}
        />
      </div>
      {searchSuggestions && searchSuggestions?.length > 0 && (
        <div
          className={`${styles.suggestionsWrapper} ${isInputFocused ? styles.showSuggestions : ''}`}
          ref={suggestionsRef}
        >
          {data?.popularSearchKeyword && data?.suggestionKeyword && (
            <p className={styles.suggestionHeading}>
              {!searchValue ? data?.popularSearchKeyword : data?.suggestionKeyword}
            </p>
          )}
          <ul className={styles.suggestionList} ref={suggestionListRef}>
            {searchSuggestions?.map((item: ISearchSuggestion, index: number) => (
              <li
                className={styles.suggestionItem}
                key={`${item?.itemHeading + index}`}
                onClick={() => handleClick(item)}
              >
                <span className={styles.suggestionIcon}></span>
                <span className={styles.suggestion}>{item?.itemHeading}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchWithDropdown;
