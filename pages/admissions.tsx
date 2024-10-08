import { ENDPOINT, getAPI } from '@api-manager';
import { ErrorFallback, Faqs, HeroBanner, Layout, Overview, SubNav, TwoColumnCard, Updates } from '@components';
import { ICardData, IPage } from '@interfaces';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';
import apiDataFilter from 'src/lib/utils/apiDataFilter';

const AdmissionsPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { header, footer, main } = data;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {main?.mainBanner && <HeroBanner compData={main?.mainBanner?.fields} />}
      {main?.subNav && <SubNav compData={main?.subNav?.fields?.subNavItems} />}
      {main?.updates && <Updates compData={main?.updates?.fields} />}
      {main?.overview && (
        <Container>
          <Overview compData={main?.overview?.fields} />
        </Container>
      )}
      {main?.Cards?.fields?.cards?.map(
        (card: { data: ICardData[]; variant: string; sectionID?: string }, index: number) => (
          <TwoColumnCard key={`${card?.variant + index}`} compData={card} />
        ),
      )}
      {main?.admissionCards && <TwoColumnCard compData={main?.admissionCards?.fields} />}
      {main?.faqs && <Faqs compData={main?.faqs?.fields} />}
    </Layout>
  );
};

export default AdmissionsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.admissionsPage);
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
