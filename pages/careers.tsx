import { ENDPOINT, getAPI } from '@api-manager';
import { CareersForm, ErrorFallback, HeroBanner, Layout, Overview, Stories, SubNav, WhyUsCards } from '@components';
import { IPage } from '@interfaces';
import { scrollToSmoothly, useDeviceType } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';
import apiDataFilter from 'src/lib/utils/apiDataFilter';

const CareersPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;
  const { deviceType } = useDeviceType();

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }
  const { header, footer, main } = data;
  const { seoData, WhyUsCard, mainBanner, overview, subNav, stories, careerForm } = main;

  const handleScrollCareerForm = (e: any) => {
    e.preventDefault();
    const careerFormRef = document.querySelector(`#${careerForm?.fields?.sectionID}`);
    careerFormRef &&
      scrollToSmoothly(
        deviceType === 'desktop'
          ? careerFormRef?.getBoundingClientRect()?.top || 0
          : (careerFormRef?.getBoundingClientRect()?.top || 0) - 80,
        100,
      );
  };

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={seoData?.fields}>
      {mainBanner?.fields && <HeroBanner compData={mainBanner?.fields} clickHandler={handleScrollCareerForm} />}
      {subNav?.fields && <SubNav compData={subNav?.fields?.subNavItems} />}
      {overview?.fields && (
        <Container>
          <Overview compData={overview?.fields} />
        </Container>
      )}
      {WhyUsCard?.fields && <WhyUsCards compData={WhyUsCard?.fields} />}
      {careerForm && <CareersForm compData={careerForm?.fields} />}
      {stories?.fields && <Stories compData={stories?.fields} />}
    </Layout>
  );
};

export default CareersPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.careersPage);
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
