import { CustomIcon, CustomImage } from '@components';
import { ISocialLinks, ISocialLinksData } from '@interfaces';
import { GTMHelper } from '@utils';
import styles from './socialLinks.module.scss';

const SocialLinks = (props: ISocialLinks) => {
  const { socialData } = props;
  return (
    <div className={styles.socialBlock}>
      {socialData?.map((item: ISocialLinksData, key: number) => (
        <a
          href={item?.url}
          key={`${item?.label + key}`}
          target={item?.target}
          title={item?.label}
          onClick={() => {
            GTMHelper({ ...item?.gtmData });
          }}
        >
          {item?.imageSource ? (
            <CustomImage
              src={{
                defaultSource: item?.imageSource,
              }}
              loader="false"
              alt={''}
            />
          ) : (
            <CustomIcon iconName={item?.label} />
          )}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
