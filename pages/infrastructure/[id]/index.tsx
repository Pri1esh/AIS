import { ENDPOINT, getAPI } from '@api-manager';
import { ErrorFallback, HeroBanner, ImageSection, Layout, SubNav } from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const InfrastructureInfoPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { main, footer, header } = data;
  const { mainBanner = null, subNav = null, features = null, overview = null } = main;
  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {mainBanner?.fields && <HeroBanner compData={mainBanner?.fields} isHeading={false} />}
      {subNav?.fields?.subNavItems && <SubNav compData={subNav?.fields?.subNavItems} />}
      {features?.fields?.features && (
        <ImageSection compData={features?.fields?.features} overviewData={overview?.fields} isHeading={true} />
      )}
    </Layout>
  );
};

export default InfrastructureInfoPage;

export const getServerSideProps: GetServerSideProps = async (Context: GetServerSidePropsContext) => {
  try {
    const id: any = Context.query.id || '';
    const res = await getAPI(ENDPOINT.SSR.infrastructureInfoPage.replace('{page}', id));
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
