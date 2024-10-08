import { ENDPOINT, getAPI } from '@api-manager';
import {
  CardSlider,
  ErrorFallback,
  HeroBanner,
  Layout,
  Overview,
  Stories,
  SubNav,
  TwoColumnCard,
  TwoColumnCardSmall,
} from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';

const TechnologyInnovationPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { header, footer, main } = data;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {main?.mainBanner && <HeroBanner compData={main?.mainBanner?.fields} isHeading={false} />}
      <SubNav compData={main?.subNav?.fields?.subNavItems} />
      {main?.overview && (
        <Container>
          <Overview compData={main?.overview?.fields} isHeading={true} />
        </Container>
      )}
      {main?.mainCard && <TwoColumnCard compData={main?.mainCard?.fields} />}
      {main?.cardList && <TwoColumnCardSmall compData={main?.cardList?.fields} />}
      {main?.facilities && <CardSlider compData={main?.facilities?.fields} />}
      {main?.stories && <Stories compData={main?.stories?.fields} />}
    </Layout>
  );
};

export default TechnologyInnovationPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.techInnovationPage);
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
