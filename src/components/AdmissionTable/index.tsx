import { ICustomTable, ITableLabel } from '@interfaces';
import { Container } from 'react-bootstrap';
import styles from './admissionTable.module.scss';

const CustomTable = (props: ICustomTable) => {
  const { compData } = props;
  return (
    <section className={styles.wrapper}>
      <Container>
        <h2 className={styles.sectionHeading}>{compData?.heading}</h2>
        <div className={styles.tableWrapper}>
          <table>
            <thead>
              <tr>
                {compData?.data?.th?.map((item: ITableLabel, index: number) => (
                  <th key={`${item?.label + index}`}>
                    <div>{item?.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compData?.data?.td?.map((item: ITableLabel[], index: number) => (
                <tr key={`${item?.[index]?.label + index}`}>
                  {item?.map((item: ITableLabel, index: number) => (
                    <td key={`${item?.label + index}`}>{item?.label}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
};

export default CustomTable;
