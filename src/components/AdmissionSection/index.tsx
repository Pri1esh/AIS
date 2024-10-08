import {
  IAdmissionSection,
  IAdmissionSectionData,
  IAdmissionSectionDataDescription,
  IAdmissionSectionDataSubDescription,
} from '@interfaces';
import { Container } from 'react-bootstrap';
import styles from './admissionSection.module.scss';

const AdmissionSection = (props: IAdmissionSection) => {
  const { compData } = props;
  return (
    <section className={styles.wrapper}>
      <Container>
        <h2 className={styles.sectionHeading}>{compData?.heading}</h2>
        {compData?.data?.map((item: IAdmissionSectionData, index: number) => (
          <div className={styles.listItemWrapper} key={`${(item?.heading || '') + index}`}>
            <p className={styles.subHeading}>{item?.subHeading}</p>
            <ul className={styles.listWrapper}>
              {item?.description?.map((item: IAdmissionSectionDataDescription, index: number) => (
                <li className={styles.label} key={`${(item?.heading || '') + index}`}>
                  <div dangerouslySetInnerHTML={{ __html: item?.label }}></div>
                  {item?.subDescription && (
                    <ul className={styles.subListWrapper}>
                      {item.subDescription?.map((item: IAdmissionSectionDataSubDescription, index: number) => (
                        <li className={styles.label} key={`${(item?.heading || '') + index}`}>
                          <div dangerouslySetInnerHTML={{ __html: item?.label }}></div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </section>
  );
};

export default AdmissionSection;
