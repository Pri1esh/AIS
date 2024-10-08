import { ILatestStoriesContent, ISelectDropdownOption, IStoryCardData, IStoryCardFilterData } from '@interfaces';
import { filterStoriesData, getFilterTabs } from '@logic/latestStories';
import { useDeviceType } from '@utils';
import { useEffect, useState } from 'react';
import StoriesFilter from './StoriesFilter';
import StoriesPagination from './StoriesPagination';
import styles from './latestStoriesContent.module.scss';

const LatestStoriesContent = (props: ILatestStoriesContent) => {
  const { compData, isHeading } = props;
  const [filterData, setFilterData] = useState<IStoryCardFilterData[]>([]);
  const [activeFilters, setActiveFilters] = useState<ISelectDropdownOption[]>([]);
  const [stories, setStories] = useState<IStoryCardData[]>(compData?.storiesData);
  const [storiesFiltered, setStoriesFiltered] = useState(false);
  const { deviceType } = useDeviceType();

  useEffect(() => {
    getFilterTabs(compData?.storiesData, setFilterData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterStories = (selectedFilter: ISelectDropdownOption, id: string) => {
    filterStoriesData(selectedFilter, id, activeFilters, setActiveFilters, compData?.storiesData, setStories);
    setStoriesFiltered(!storiesFiltered);
  };

  const getDataShow = () => {
    if (deviceType === 'desktop' || compData?.showDataMobile === 0) {
      return compData?.showDataDesktop;
    } else if (deviceType === 'tablet') {
      return compData?.showDataIpad;
    } else {
      return compData?.showDataMobile;
    }
  };

  return (
    <div className={styles.wrapper}>
      {compData?.heading &&
        (isHeading ? (
          <h1 className={styles.heading}>{compData?.heading}</h1>
        ) : (
          <h2 className={styles.heading}>{compData?.heading}</h2>
        ))}
      {filterData?.length > 0 && <StoriesFilter compData={filterData} filterStories={filterStories} />}
      {stories?.length ? (
        <div key={deviceType}>
          <StoriesPagination
            key={stories && storiesFiltered?.toString()}
            compData={stories}
            dataToShow={getDataShow()}
            loadMore={compData?.loadMore}
          />
        </div>
      ) : (
        <p>{compData?.noData || 'No story available'}</p>
      )}
    </div>
  );
};

export default LatestStoriesContent;
