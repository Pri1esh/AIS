import { PublicationsSideNav } from '@components';
import { IAcademicDetails } from '@interfaces';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './academicDetails.module.scss';
import Details from './Details';

const AcademicDetails = (props: IAcademicDetails) => {
  const { compData, isHeading } = props;

  return (
    <div className={styles.wrapper}>
      <Container>
        <Row>
          <Col className={styles.sideNavWrapper}>
            <PublicationsSideNav compData={compData?.sideNav} />
          </Col>
          <Col>
            <Details compData={compData?.details} isHeading={isHeading} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AcademicDetails;
