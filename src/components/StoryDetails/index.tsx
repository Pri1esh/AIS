import { IStoryDetails } from '@interfaces';
import { GTMHelper } from '@utils';
import CustomIcon from '../CustomIcon';
import CustomLink from '../CustomLink';
import ImageGallery from '../ImageGallery';
import Overview from '../Overview';
import styles from './storyDetails.module.scss';

const StoryDetails = (props: IStoryDetails) => {
  const { compData } = props;

  return (
    <div className={styles.wrapper}>
      {compData?.backLabel && (
        <div className={styles.backPress}>
          <CustomLink
            href={compData?.link}
            target={compData?.target}
            onClick={() => {
              GTMHelper({
                ...compData?.gtmData,
              });
            }}
          >
            <CustomIcon iconName="up" classname={styles.arrow} />
            {compData?.backLabel}
          </CustomLink>
        </div>
      )}
      <Overview className={styles.overview} compData={compData?.storyOverview} isHeading={true} />
      {compData?.storyCarousel?.carouselData?.length > 0 ? (
        <ImageGallery compData={compData?.storyCarousel} containerRequired={false} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default StoryDetails;
