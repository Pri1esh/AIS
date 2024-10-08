import { CustomIcon } from '@components';
import { IBaseSlider, IPrevNextArrow } from '@interfaces';
import { useDeviceType } from '@utils';
import cx from 'classnames';
import Slider from 'react-slick';
import styles from './baseSlider.module.scss';

const BaseSlider = (props: IBaseSlider) => {
  const {
    settings,
    isMobSlider = false,
    nextArrowClass,
    prevArrowClass,
    classname = '',
    asNavFor,
    sliderRef,
    isTabSlider = false,
  } = props;
  const { deviceType } = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

  const sliderSettings = {
    ...settings,
    nextArrow: <SlickCustomArrow className={nextArrowClass} />,
    prevArrow: <SlickCustomArrow className={prevArrowClass} />,
  };
  return (
    <div className={cx(styles.baseSlider, classname)}>
      {(isMobile && isMobSlider) || (isTablet && isTabSlider) ? (
        <div className={`${styles.mobSlider} ${isTabSlider ? styles.tabSlider : ''}`}>
          {props?.children?.props?.children}
        </div>
      ) : (
        <Slider
          {...sliderSettings}
          className={props?.settings?.classes}
          ref={props?.cardRef || sliderRef}
          asNavFor={asNavFor}
        >
          {props?.children?.props?.children}
        </Slider>
      )}
    </div>
  );
};

const SlickCustomArrow = (props: IPrevNextArrow) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <CustomIcon iconName={'up'} />
    </div>
  );
};

export default BaseSlider;
