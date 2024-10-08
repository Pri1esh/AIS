import { IPedagogySection } from '@interfaces';
import styles from './pedagogySection.module.scss';

const PedagogySection = (props: IPedagogySection) => {
  const { compData } = props;
  const { heading = '', description = '' } = compData;

  return (
    <div className={styles.wrapper}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {description && <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }}></p>}
    </div>
  );
};

export default PedagogySection;
