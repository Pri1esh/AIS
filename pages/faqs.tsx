import { ENDPOINT, getAPI } from '@api-manager';
import { ErrorFallback, FaqsPageContent, Layout } from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const FaqsPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage, category = '' } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { header, footer, main } = data;

  const { seoData = null } = main;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={seoData?.fields}>
      <FaqsPageContent compData={main} activeCategory={category} />
    </Layout>
  );
};

export default FaqsPage;

export const getServerSideProps: GetServerSideProps = async (Context: GetServerSidePropsContext) => {
  try {
    const category = Context?.query?.category || '';
    const res = await getAPI(ENDPOINT.SSR.faqsPage);
    const data = apiDataFilter(res);
    return {
      props: {
        data,
        category,
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
