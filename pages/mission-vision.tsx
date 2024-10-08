import { ENDPOINT, getAPI } from '@api-manager';
import { CoreValuesCard, ErrorFallback, HeroBanner, Layout, SubNav, VisionMissionCards } from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';

const VisionMissionValuesPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { header, footer, main } = data;
  const { mainBanner = null, subNav = null, visionMissionCards = null, codeValues = null } = main;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {mainBanner?.fields && <HeroBanner compData={mainBanner?.fields} isHeading={false} />}
      {subNav?.fields?.subNavItems && <SubNav compData={subNav?.fields?.subNavItems} />}
      {visionMissionCards?.fields && <VisionMissionCards compData={visionMissionCards?.fields} isHeading={true} />}
      {codeValues?.fields && <CoreValuesCard compData={codeValues?.fields} />}
    </Layout>
  );
};

export default VisionMissionValuesPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.visionMissionValuesPage);
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
