import { CustomImage, CustomVideo } from '@components';
import { ICardData } from '@interfaces';
import styles from './TwoColumnCard.module.scss';

const MediaCard = (props: { cardData: ICardData }) => {
  const { cardData } = props;

  const getComponent = () => {
    switch (true) {
      case cardData?.mediaType?.includes('video'):
        return (
          <CustomVideo
            classname={styles.media}
            compData={{
              mediaType: 'video',
              videoSource: cardData?.videoSource,
              videoSourceMobile: cardData?.videoSourceMobile,
              videoSourceTablet: cardData?.videoSourceTablet,
              videoSourceOgg: cardData?.videoSourceOgg,
              videoSourceMobileOgg: cardData?.videoSourceMobileOgg,
              videoSourceTabletOgg: cardData?.videoSourceTabletOgg,
              defaultVideoSource: cardData?.defaultVideoSource,
              defaultVideoSourceMobile: cardData?.defaultVideoSourceMobile,
              defaultVideoSourceTablet: cardData?.defaultVideoSourceTablet,
              defaultVideoSourceOgg: cardData?.defaultVideoSourceOgg,
              defaultVideoSourceMobileOgg: cardData?.defaultVideoSourceMobileOgg,
              defaultVideoSourceTabletOgg: cardData?.defaultVideoSourceTabletOgg,
              autoplay: cardData?.autoplayVideo,
              playText: cardData?.playText,
              posterImage: cardData?.posterImage,
              uploadDate: cardData?.uploadDate,
              seoDescription: cardData?.seoDescription,
              seoName: cardData?.seoName,
            }}
          />
        );
      case cardData?.mediaType?.includes('map'):
        return <iframe className={styles.media} src={cardData?.mapSource} />;
      default:
        return (
          cardData?.imageSource && (
            <CustomImage
              className={styles.media}
              src={{
                mobileSource: cardData?.imageSourceMobile,
                tabletSource: cardData?.imageSourceTablet,
                defaultSource: cardData?.imageSource || '',
              }}
              alt={cardData?.imageAlt}
            />
          )
        );
    }
  };

  return <div className={styles.mediaSection}>{getComponent()}</div>;
};

export default MediaCard;
