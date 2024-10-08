import { SideNav } from '@components';
import { IRoutes } from '@interfaces';
import { Col, Container, Row } from 'react-bootstrap';
import RouteDetails from './RouteDetails';
import styles from './routes.module.scss';

const Routes = (props: IRoutes) => {
  const { compData } = props;

  return (
    <section className={styles.wrapper}>
      <Container>
        <Row>
          <Col className={styles.sideNavWrapper}>
            <SideNav compData={compData?.sideNav} />
          </Col>
          <Col>
            <RouteDetails compData={compData?.routeDetails} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Routes;
