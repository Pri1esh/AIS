import { ENDPOINT, getAPI } from '@api-manager';
import { ErrorFallback, HeroBanner, Layout, PageDescription, SubNav } from '@components';
import { IPage } from '@interfaces';
import type { GetServerSideProps, NextPage } from 'next';
import apiDataFilter from 'src/lib/utils/apiDataFilter';

const TermsPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { main, header, footer } = data;
  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {main?.mainBanner && <HeroBanner compData={main?.mainBanner?.fields} />}
      {main?.subNav && <SubNav compData={main?.subNav?.fields?.subNavItems} />}
      {main?.pageDescription && <PageDescription compData={main?.pageDescription?.fields} />}
    </Layout>
  );
};

export default TermsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.termsPage);
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
