import { ENDPOINT, getAPI } from '@api-manager';
import {
  ErrorFallback,
  FindOutMore,
  HeroBanner,
  Layout,
  Overview,
  SteamCard,
  Stories,
  SubNav,
  TwoColumnCard,
} from '@components';
import { IPage } from '@interfaces';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';
import apiDataFilter from 'src/lib/utils/apiDataFilter';

const LearningPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { main, header, footer } = data;
  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {main?.mainBanner && <HeroBanner compData={main?.mainBanner?.fields} />}
      {main?.subNav && <SubNav compData={main?.subNav?.fields?.subNavItems} />}
      {main?.overview && (
        <Container>
          <Overview compData={main?.overview?.fields} />
        </Container>
      )}
      {main?.academicsCard && <TwoColumnCard compData={main?.academicsCard?.fields} />}
      {main?.technologyInnovationCarousel && <TwoColumnCard compData={main?.technologyInnovationCarousel?.fields} />}
      {main?.communicationCard && <TwoColumnCard compData={main?.communicationCard?.fields} />}
      {main?.steamCard && <SteamCard compData={main?.steamCard?.fields} />}
      {main?.findOutMore && <FindOutMore compData={main?.findOutMore?.fields} />}
      {main?.stories && <Stories compData={main?.stories?.fields} />}
    </Layout>
  );
};

export default LearningPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.learningPage);
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
