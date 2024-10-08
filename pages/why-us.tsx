import { FullWidthImage, HeroBanner, Layout, Overview, SubNav, WhyUsCards } from '@components';
import { NextPage } from 'next';
import { Container } from 'react-bootstrap';
import whyUsPageData from '../src/assets/data/whyUsPage.json';

const WhyUsPage: NextPage = () => {
  const {
    //  footer, header, seoData,
    mainBanner,
    subNav,
    overview,
    whyUsCards,
    imageBanner,
  } = whyUsPageData;

  return (
    <Layout
    // footerData={footer} headerData={header} seoData={seoData}
    >
      <HeroBanner compData={mainBanner} />
      <SubNav compData={subNav} />
      <h1 className="text-center mt-5 pt-5">BACKEND API MISSING FOR THIS PAGE</h1>
      <Container>
        <Overview compData={overview} />
      </Container>
      <WhyUsCards compData={whyUsCards} />
      <FullWidthImage compData={imageBanner} />
    </Layout>
  );
};

export default WhyUsPage;
