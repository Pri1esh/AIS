import { ENDPOINT, getAPI } from '@api-manager';
import { AffiliationsCards, Description, ErrorFallback, HeroBanner, Layout, LinkSection, SubNav } from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';

const AffiliationsAccreditations: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { header, footer, main } = data;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {main?.mainBanner && <HeroBanner compData={main?.mainBanner?.fields} isHeading={false} />}
      {main?.subNav && <SubNav compData={main?.subNav?.fields?.subNavItems} />}
      {main?.affiliationsCards && <AffiliationsCards compData={main?.affiliationsCards?.fields} isHeading={true} />}
      {main?.LinkSection?.fields && (
        <Container>
          <LinkSection compData={main?.LinkSection?.fields} isHeading={true} />
        </Container>
      )}
      {main?.AffiliationDescription?.fields && <Description compData={main?.AffiliationDescription?.fields} />}
    </Layout>
  );
};

export default AffiliationsAccreditations;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.affiliationsPage);
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
