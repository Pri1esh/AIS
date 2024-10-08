import { ENDPOINT, getAPI } from '@api-manager';
import { ErrorFallback, HeroBanner, Layout, Overview, SubNav, TwoColumnCard } from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';
import UpcomingEvents from 'src/components/UpcomingEvents';

const StoriesPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { header, footer, main } = data;
  const {
    mainBanner = null,
    subNav = null,
    overview = null,
    upcomingEvents = null,
    latestStories = null,
    allActivities = null,
    admissionCards = null,
  } = main;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {mainBanner?.fields && <HeroBanner compData={mainBanner?.fields} />}
      {subNav?.fields?.subNavItems && <SubNav compData={subNav?.fields?.subNavItems} />}
      {overview?.fields && (
        <Container>
          <Overview compData={overview?.fields} />
        </Container>
      )}
      {upcomingEvents?.fields && <UpcomingEvents compData={upcomingEvents?.fields} />}
      {latestStories.fields && <TwoColumnCard compData={latestStories.fields} />}
      {allActivities.fields && <TwoColumnCard compData={allActivities.fields} />}
      {admissionCards.fields && <TwoColumnCard compData={admissionCards.fields} />}
    </Layout>
  );
};

export default StoriesPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.storiesPage);
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
