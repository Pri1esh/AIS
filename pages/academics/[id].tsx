import { ENDPOINT, getAPI } from '@api-manager';
import { AcademicDetails, ErrorFallback, HeroBanner, ImageGallery, Layout, SubNav } from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const AcademicsPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { header, footer, main } = data;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {main?.mainBanner?.fields && <HeroBanner compData={main?.mainBanner?.fields} isHeading={false} />}
      {main?.subNav?.fields && <SubNav compData={main?.subNav?.fields?.subNavItems} />}
      {main?.academicsDetails?.fields && <AcademicDetails compData={main?.academicsDetails?.fields} isHeading={true} />}
      {main?.imageGallery?.fields?.length > 0 ? (
        <ImageGallery compData={{ carouselData: main?.imageGallery?.fields }} />
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default AcademicsPage;

export const getServerSideProps: GetServerSideProps = async (Context: GetServerSidePropsContext) => {
  try {
    const id = Context.query.id;
    const res = await getAPI(ENDPOINT.SSR.academicsPage + id);
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
