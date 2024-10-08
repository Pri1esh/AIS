import { ENDPOINT, getAPI } from '@api-manager';
import { ErrorFallback, HeroBanner, LatestStoriesContent, Layout, SubNav } from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';

const LatestStoriesPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { header, footer, main } = data;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {main?.mainBanner?.fields && <HeroBanner compData={main?.mainBanner?.fields} isHeading={false} />}
      {main?.subNav?.fields && <SubNav compData={main?.subNav?.fields?.subNavItems} />}
      {main?.latestStories?.fields && (
        <Container>
          <LatestStoriesContent compData={main?.latestStories?.fields} isHeading={true} />
        </Container>
      )}
    </Layout>
  );
};

export default LatestStoriesPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.latestStoryPage);
    const data = apiDataFilter(res);
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        error: 'Uh oh! Looks like there is some network issue.',
        errorMessage: JSON.stringify(error),
      },
    };
  }
};
