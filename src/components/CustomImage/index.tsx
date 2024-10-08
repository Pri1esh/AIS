import { ICustomImage } from '@interfaces';
import { useDeviceType } from '@utils';
import Image from 'next/image';

const CustomImage = (props: ICustomImage) => {
  const {
    lazy = 'true',
    src = { mobileSource: '', tabletSource: '', defaultSource: '' },
    alt = '',
    priority = false,
    width = 1,
    height = 1,
    className = '',
    type = 'img',
    loader = 'true',
  } = props;

  const { deviceType } = useDeviceType();
  const customLoader = (src: string) => src;
  const getImageSource = () => {
    let imageSource = '';
    if (deviceType === 'mobile') {
      imageSource = src?.mobileSource || src?.defaultSource;
    } else if (deviceType === 'tablet') {
      imageSource = src?.tabletSource || src?.defaultSource;
    } else {
      imageSource = src?.defaultSource;
    }
    return imageSource || src?.defaultSource;
  };

  return type === 'img' ? (
    <img
      {...props}
      src={`http://uat-s.adaniinternationalschool.org${getImageSource() || src?.defaultSource}`}
      alt={alt}
      loading={Boolean(lazy) && !priority ? 'lazy' : 'eager'}
      key={deviceType}
      className={`${className}${loader === 'true' ? ' bgLoader' : ''}`}
    />
  ) : (
    <Image
      {...props}
      src={`http://uat-s.adaniinternationalschool.org${getImageSource() || src?.defaultSource}`}
      loader={() => customLoader(getImageSource() || src?.defaultSource)}
      alt={alt}
      loading={Boolean(lazy) && !priority ? 'lazy' : 'eager'}
      width={width}
      height={height}
      key={deviceType}
      className={`${className}${loader === 'true' ? ' bgLoader' : ''}`}
    />
  );
};
export default CustomImage;
