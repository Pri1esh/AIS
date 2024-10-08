import { ErrorFallback, Layout } from '@components';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'react-bootstrap';

const InternalServerError: NextPage = () => {
  return (
    <Layout>
      <Container>
        <Head>
          <title>{`Uh oh! Don't worry, it's not your fault!`}</title>
        </Head>
        <ErrorFallback
          buttonTitle="Back"
          showButton={true}
          description="Try again in some time"
          title="Uh oh! Don't worry, it's not your fault!"
          heading="500"
          imageAlt="Fail to load data"
          backToHome={true}
        />
      </Container>
    </Layout>
  );
};

export default InternalServerError;
