import { ENDPOINT, getAPI } from '@api-manager';
import { ErrorFallback, HeroBanner, Layout, Routes, SubNav } from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const TransportationInfoPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { main, header, footer } = data;
  const { mainBanner = null, seoData = null, subNav = null, transports = null } = main;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={seoData?.fields}>
      {mainBanner?.fields && <HeroBanner compData={mainBanner?.fields} />}
      {subNav?.fields && <SubNav compData={subNav?.fields?.subNavItems} />}
      {transports?.fields && <Routes compData={transports?.fields} />}
    </Layout>
  );
};

export default TransportationInfoPage;

export const getServerSideProps: GetServerSideProps = async (Context: GetServerSidePropsContext) => {
  try {
    const id = Context.query.id || '';
    const res = await getAPI(ENDPOINT.SSR.transportationInfoPage + id);
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
