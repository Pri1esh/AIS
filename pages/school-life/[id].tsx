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
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { Container } from 'react-bootstrap';

const LifeAtSchoolActivitiesPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { header, footer, main } = data;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {main?.mainBanner?.fields && <HeroBanner compData={main?.mainBanner?.fields} isHeading={false} />}
      {main?.subNav?.fields && <SubNav compData={main?.subNav?.fields?.subNavItems} />}
      {main?.overview?.fields && (
        <Container>
          <Overview compData={main?.overview?.fields} isHeading={true} />
        </Container>
      )}
      {main?.mainCard?.fields && <TwoColumnCard compData={main?.mainCard?.fields} />}
      {main?.cardList?.fields && <TwoColumnCardSmall compData={main?.cardList?.fields} />}
      {main?.facilities?.fields && <CardSlider compData={main?.facilities?.fields} />}
      {main?.stories?.fields && <Stories compData={main?.stories?.fields} />}
    </Layout>
  );
};

export default LifeAtSchoolActivitiesPage;

export const getServerSideProps: GetServerSideProps = async (Context: GetServerSidePropsContext) => {
  try {
    const id: any = Context.query.id || '';
    const res = await getAPI(ENDPOINT.SSR.lifeAtSchoolActivitiesPage.replace('{page}', id));
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
