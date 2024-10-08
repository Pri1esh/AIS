import { CustomIcon } from '@components';
import { ICustomVideo } from '@interfaces';
import { GTMHelper, useDeviceType } from '@utils';
import cx from 'classnames';
import { useState } from 'react';
import styles from './customVideo.module.scss';

const CustomVideo = (props: ICustomVideo) => {
  const { compData, classname = '' } = props;
  const { isOverlayRequired = true, autoplay = true } = compData;
  const { deviceType } = useDeviceType();

  const [playVideo, setPlayVideo] = useState<boolean>(isOverlayRequired ? false : true);

  const handleClick = () => {
    setPlayVideo(true);
    GTMHelper({ ...compData?.gtmVideoStart });
  };

  const fallbackVideoSource = {
    mobileSource: compData?.videoSourceMobile || compData?.defaultVideoSourceMobile || '',
    tabletSource: compData?.videoSourceTablet || compData?.defaultVideoSourceTablet || '',
    defaultSource: compData.videoSource || compData?.defaultVideoSource || '',
    mobileSourceOgg: compData?.videoSourceMobileOgg || compData?.defaultVideoSourceMobileOgg || '',
    tabletSourceOgg: compData?.videoSourceTabletOgg || compData?.defaultVideoSourceTabletOgg || '',
    defaultSourceOgg: compData.videoSourceOgg || compData?.defaultVideoSourceOgg || '',
  };

  const getVideoSource = () => {
    switch (true) {
      case playVideo && deviceType === 'mobile' && compData?.videoSource !== '':
        return {
          mp4Source: compData?.videoSourceMobile || compData?.videoSource,
          oggSource: compData?.videoSourceMobileOgg || compData?.videoSourceOgg,
        };
      case playVideo && deviceType === 'tablet' && compData?.videoSource !== '':
        return {
          mp4Source: compData?.videoSourceTablet || compData?.videoSource,
          oggSource: compData?.videoSourceTabletOgg || compData?.videoSourceOgg,
        };
      case playVideo && compData?.videoSource !== '':
        return { mp4Source: compData?.videoSource, oggSource: compData?.videoSourceOgg };
      case deviceType === 'mobile' && compData?.defaultVideoSource:
        return {
          mp4Source: compData?.defaultVideoSourceMobile || compData?.defaultVideoSource,
          oggSource: compData?.defaultVideoSourceMobileOgg || compData?.defaultVideoSourceOgg,
        };
      case deviceType === 'tablet' && compData?.defaultVideoSource !== '':
        return {
          mp4Source: compData?.defaultVideoSourceTablet || compData?.defaultVideoSource,
          oggSource: compData?.defaultVideoSourceTabletOgg || compData?.defaultVideoSourceOgg,
        };
      case compData?.defaultVideoSource !== '' || compData?.defaultVideoSource !== undefined:
        return { mp4Source: compData?.defaultVideoSource, oggSource: compData?.defaultVideoSourceOgg };
      case deviceType === 'mobile':
        return { mp4Source: fallbackVideoSource?.mobileSource, oggSource: fallbackVideoSource?.mobileSourceOgg };
      case deviceType === 'tablet':
        return { mp4Source: fallbackVideoSource?.tabletSource, oggSource: fallbackVideoSource?.tabletSourceOgg };
      default:
        return { mp4Source: fallbackVideoSource?.defaultSource, oggSource: fallbackVideoSource?.defaultSourceOgg };
    }
  };

  const getVideoType = () => {
    switch (true) {
      case compData?.mediaType?.includes('video') &&
        compData?.videoSource !== '' &&
        compData?.defaultVideoSource !== '' &&
        autoplay:
        return (
          <video
            autoPlay={autoplay || playVideo}
            muted
            loop={true}
            playsInline
            controls={isOverlayRequired && playVideo}
            itemProp="video"
          >
            <source src={getVideoSource()?.mp4Source} type="video/mp4" />
            <source src={getVideoSource()?.oggSource} type="video/ogg" />
          </video>
        );
      case compData?.mediaType?.includes('video') &&
        (compData?.videoSource !== '' || compData?.defaultVideoSource !== '') &&
        compData?.posterImage !== '':
        return (
          <video
            autoPlay={autoplay || playVideo}
            muted
            loop={true}
            poster={compData?.posterImage}
            playsInline
            controls={isOverlayRequired && playVideo}
            itemProp="video"
          >
            <source src={getVideoSource()?.mp4Source} type="video/mp4" />
            <source src={getVideoSource()?.oggSource} type="video/ogg" />
          </video>
        );
      case fallbackVideoSource?.defaultSource !== '':
        return (
          <video autoPlay={autoplay} muted loop={true} playsInline controls={isOverlayRequired} itemProp="video">
            <source src={getVideoSource()?.mp4Source} type="video/mp4" />
            <source src={getVideoSource()?.oggSource} type="video/ogg" />
          </video>
        );
      case compData?.mediaType?.includes('youtube'):
        return (
          <div className={styles.iframeContainer} itemProp="video">
            <iframe src={playVideo ? compData?.videoSource : compData?.defaultVideoSource} />
          </div>
        );
      default:
        return <></>;
    }
  };
  return (
    <section
      className={cx(styles.mediaSection, classname)}
      id={compData?.sectionID}
      itemScope
      itemType="https://schema.org/VideoObject"
    >
      <div className={styles.defaultSection} key={playVideo?.toString()}>
        {getVideoType()}
      </div>
      {isOverlayRequired && (
        <div className={`${styles.overlay} ${playVideo ? 'd-none' : ''}`}>
          {compData?.welcomeText && <h2 dangerouslySetInnerHTML={{ __html: compData?.welcomeText }} />}
          <div className={styles.playButton}>
            <button onClick={handleClick}>
              <CustomIcon iconName={'triangle'} />
              {compData?.playText}
            </button>
          </div>
        </div>
      )}
      <meta itemProp="uploadDate" content={compData?.uploadDate} />
      <meta itemProp="thumbnailUrl" content={compData?.posterImage || compData?.videoSource} />
      <meta itemProp="description" content={compData?.seoDescription} />
      <meta itemProp="name" content={compData?.seoName} />
      <meta itemProp="contentUrl" content={compData?.videoSource || compData?.defaultVideoSource} />
      <meta itemProp="duration" content={compData?.gtmVideoStart?.video_duration || ''} />
    </section>
  );
};

export default CustomVideo;
