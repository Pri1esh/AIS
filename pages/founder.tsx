import { ENDPOINT, getAPI } from '@api-manager';
import { ErrorFallback, HeroBanner, Layout, PageDescription, SubNav, TwoColumnCard } from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';

const FounderPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { header, footer, main } = data;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData}>
      {main?.mainBanner?.fields && <HeroBanner compData={main?.mainBanner?.fields} />}
      {main?.subNav?.fields && <SubNav compData={main?.subNav?.fields?.subNavItems} />}
      {main?.mainCard?.fields && <TwoColumnCard compData={main?.mainCard?.fields} overview={main?.overview?.fields} />}
      {main?.summary?.fields && <PageDescription compData={main?.summary?.fields} />}
    </Layout>
  );
};

export default FounderPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.founder);
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
