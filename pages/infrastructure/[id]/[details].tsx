import { ENDPOINT, getAPI } from '@api-manager';
import { ErrorFallback, HeroBanner, Layout, StoryDetails, SubNav } from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { Container } from 'react-bootstrap';

const Details: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { main, footer, header } = data;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {main?.mainBanner?.fields && <HeroBanner compData={main?.mainBanner?.fields} isHeading={false} />}
      {main?.subNav?.fields?.subNavItems?.length > 0 && <SubNav compData={main?.subNav?.fields?.subNavItems} />}
      {main?.StoryDetails?.fields && (
        <Container>
          <StoryDetails compData={main?.StoryDetails?.fields} />
        </Container>
      )}
    </Layout>
  );
};

export default Details;

export const getServerSideProps: GetServerSideProps = async (Context: GetServerSidePropsContext) => {
  const { id, details } = Context?.query;
  try {
    const res = await getAPI(ENDPOINT.SSR.storiesDetailsPage + `/Our-Infrastructure/${id}/${details}`);
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
