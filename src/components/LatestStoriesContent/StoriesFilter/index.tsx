import { IStoriesFilter, IStoryCardFilterData } from '@interfaces';
import { SelectDropdown } from '../../Forms/Fields';
import styles from './storiesFilter.module.scss';

const StoriesFilter = (props: IStoriesFilter) => {
  const { compData, filterStories } = props;
  return (
    <div className={styles.wrapper}>
      {compData?.map((item: IStoryCardFilterData, index: number) => (
        <div className={styles.filter} key={`${item?.placeholder + index}`}>
          <SelectDropdown
            classname={styles.dropdown}
            placeholder={item?.placeholder}
            options={item?.fieldOptions}
            setSelected={(e: any) => {
              filterStories(e, item?.placeholder);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default StoriesFilter;
