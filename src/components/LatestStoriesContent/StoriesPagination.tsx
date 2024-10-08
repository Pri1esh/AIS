import { Button, CustomLoader } from '@components';
import { IStoriesPagination, IStoryCardData } from '@interfaces';
import { getStoriesData } from '@logic/latestStories';
import { debounce } from '@utils';
import { useCallback, useEffect, useState } from 'react';
import styles from './latestStoriesContent.module.scss';
import StoriesCard from './StoriesCard';

const StoriesPagination = (props: IStoriesPagination) => {
  const { compData, dataToShow = 6, loadMore = '' } = props;

  const [storiesToShow, setStoriesToShow] = useState<IStoryCardData[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [updateStories, setUpdateStories] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    updateStoriesData(compData, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStoriesData = useCallback(
    (storiesData = compData, page = pageNo) => {
      getStoriesData(page, dataToShow, storiesData, storiesToShow, setStoriesToShow, setPageNo);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageNo],
  );

  const handleLoadMore = useCallback(
    () => storiesToShow?.length < compData?.length && debounce(() => setUpdateStories(true), 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const loadMoreStories = useCallback(() => {
    updateStoriesData();
    setUpdateStories(false);
  }, [updateStoriesData]);

  useEffect(() => {
    if (!updateStories) return;
    loadMoreStories();
    setLoader(false);
  }, [updateStories, loadMoreStories]);

  return (
    <>
      <div className={styles.storiesWrapper}>
        {storiesToShow?.length > 0 &&
          storiesToShow?.map((story: IStoryCardData, index: number) => (
            <div className={styles.storyWrapper} key={`${story?.imageSource + index}`}>
              <StoriesCard compData={story} />
            </div>
          ))}
      </div>
      {compData && compData?.length > storiesToShow?.length && (
        <div className={styles.loaderContainer}>
          {loader ? (
            <CustomLoader />
          ) : (
            <Button
              onClick={() => {
                setLoader(true);
                handleLoadMore();
              }}
            >
              {loadMore}
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default StoriesPagination;
