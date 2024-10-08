import { ENDPOINT, getAPI } from '@api-manager';
import { ErrorFallback, HeroBanner, HolisticDevelopment, Layout, Overview, ProgramCard, SubNav } from '@components';
import { IPage } from '@interfaces';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';
import apiDataFilter from 'src/lib/utils/apiDataFilter';

const OurApproach: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { main, header, footer } = data;
  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {main?.mainBanner?.fields && <HeroBanner compData={main?.mainBanner?.fields} isHeading={false} />}
      {main?.subNav?.fields?.subNavItems && <SubNav compData={main?.subNav?.fields?.subNavItems} />}
      <Container>
        {main?.overview?.fields && <Overview compData={main?.overview?.fields} isHeading={true} />}
        {main?.holistic?.fields && <HolisticDevelopment compData={main?.holistic?.fields} />}
      </Container>
      {main?.program?.fields && <ProgramCard compData={main?.program?.fields} />}
    </Layout>
  );
};

export default OurApproach;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.ourApproachPage);
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
