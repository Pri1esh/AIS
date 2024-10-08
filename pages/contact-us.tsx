import { ENDPOINT, getAPI } from '@api-manager';
import { ErrorFallback, Faqs, HeroBanner, Layout, Overview, TwoColumnCard } from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';

const ContactPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { header, footer, main } = data;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {main?.mainBanner?.fields && <HeroBanner compData={main?.mainBanner?.fields} />}
      {main?.overview && (
        <Container>
          <Overview compData={main?.overview?.fields} />
        </Container>
      )}
      {main?.InquireNowCard && <TwoColumnCard compData={main?.InquireNowCard?.fields} />}
      {main?.VisitOurSchool && <TwoColumnCard compData={main?.VisitOurSchool?.fields} />}
      {main?.faqs && <Faqs compData={main?.faqs?.fields} />}
    </Layout>
  );
};

export default ContactPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.contactUsPage);
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
