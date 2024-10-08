import { ENDPOINT, getAPI } from '@api-manager';
import {
  CardSlider,
  ErrorFallback,
  FindOutMore,
  HeroBanner,
  Layout,
  Overview,
  Stories,
  SubNav,
  TwoColumnCard,
} from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';

const LifeAtSchoolPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { header, footer, main } = data;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {main?.mainBanner?.fields && <HeroBanner compData={main?.mainBanner?.fields} />}
      {main?.subNav?.fields && <SubNav compData={main?.subNav?.fields?.subNavItems} />}
      {main?.overview?.fields && (
        <Container>
          <Overview compData={main?.overview?.fields} />
        </Container>
      )}
      {main?.arts?.fields && <TwoColumnCard compData={main?.arts?.fields} />}
      {main?.sports?.fields && <TwoColumnCard compData={main?.sports?.fields} />}
      {main?.complementingTheAcademics?.fields && <CardSlider compData={main?.complementingTheAcademics?.fields} />}
      {main?.coCurricular?.fields && <CardSlider compData={main?.coCurricular?.fields} />}
      {main?.pastoralCare?.fields && <TwoColumnCard compData={main?.pastoralCare?.fields} />}
      {main?.safeguarding?.fields && <TwoColumnCard compData={main?.safeguarding?.fields} />}
      {main?.findOutMore?.fields && <FindOutMore compData={main?.findOutMore?.fields} />}
      {main?.stories?.fields && <Stories compData={main?.stories?.fields} />}
    </Layout>
  );
};

export default LifeAtSchoolPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.lifeAtSchoolPage);
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
