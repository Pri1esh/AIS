import { IScaleSlider } from '@interfaces';
import { addClassOnScrollIntoView } from '@utils';
import { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Details from './Details';
import styles from './scaleSlider.module.scss';
import Slider from './Slider';

const ScaleSlider = (props: IScaleSlider) => {
  const { compData } = props;
  const myref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    addClassOnScrollIntoView(0.1, 'slideInUp', myref);
  }, []);

  return (
    <section className={styles.wrapper} ref={myref} id={compData?.sectionID}>
      <Container>
        <Details
          heading={compData?.heading}
          subHeading={compData?.subHeading}
          description={compData?.description}
          btnText={compData?.btnText}
          btnLink={compData?.btnLink}
          gtmData={compData?.gtmData}
        />
      </Container>
      <Slider gallery={compData?.gallery} />
    </section>
  );
};

export default ScaleSlider;
