import { ENDPOINT, getAPI } from '@api-manager';
import { CustomTable, ErrorFallback, HeroBanner, Layout, Overview, SubNav, TwoColumnCard } from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';
import AdmissionSection from 'src/components/AdmissionSection';

const EnrolNowPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { header, footer, main } = data;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {main?.mainBanner?.fields && <HeroBanner compData={main?.mainBanner?.fields} />}
      {main?.subNav?.fields?.subNavItems && <SubNav compData={main?.subNav?.fields?.subNavItems} />}
      {main?.Overview?.fields && (
        <Container>
          <Overview compData={main?.Overview?.fields} />
        </Container>
      )}
      {main?.AdmissionDocuments?.fields && <AdmissionSection compData={main?.AdmissionDocuments?.fields} />}
      {main?.SubmissionDetail?.fields && <TwoColumnCard compData={main?.SubmissionDetail?.fields} />}
      {main?.AgeCriteria?.fields && <CustomTable compData={main?.AgeCriteria?.fields} />}
    </Layout>
  );
};

export default EnrolNowPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.enrolNowPage);
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
