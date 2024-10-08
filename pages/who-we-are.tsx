import { ENDPOINT, getAPI } from '@api-manager';
import { CustomVideo, ErrorFallback, HeroBanner, Layout, Overview, SubNav, TwoColumnCard } from '@components';
import { IPage } from '@interfaces';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';
import apiDataFilter from 'src/lib/utils/apiDataFilter';

const WelcomePage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { main, header, footer } = data;
  const {
    mainBanner = null,
    subNav = null,
    visionMissionCard = null,
    overview = null,
    founderCard = null,
    videoBanner = null,
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
      {visionMissionCard?.fields && <TwoColumnCard compData={visionMissionCard?.fields} />}
      {founderCard?.fields && <TwoColumnCard compData={founderCard?.fields} />}
      {videoBanner?.fields && <CustomVideo compData={videoBanner?.fields} />}
    </Layout>
  );
};

export default WelcomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.whoWeArePage);
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
