import { ErrorFallback, Layout } from '@components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';

const PageNotFound: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.asPath !== '/404') {
      router.replace('/404');
    }
  }, [router]);
  return (
    <Layout>
      <Container>
        <ErrorFallback
          buttonTitle="Back"
          showButton={true}
          description="Sharpen your search to find a new route."
          title="Lost Page!"
          heading="404"
          imageAlt="Fail to load data"
          backToHome={true}
        />
      </Container>
    </Layout>
  );
};
export default PageNotFound;
