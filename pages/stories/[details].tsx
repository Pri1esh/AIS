import { HeroBanner, Layout, StoryDetails, SubNav } from '@components';
import { NextPage } from 'next';
import { Container } from 'react-bootstrap';
import storiesDetailData from 'src/assets/data/storiesDetails.json';

const Details: NextPage = () => {
  return (
    <Layout
    // footerData={storiesDetailData?.footer}
    // headerData={storiesDetailData?.header}
    // seoData={storiesDetailData?.seoData}
    >
      <HeroBanner compData={storiesDetailData?.mainBanner} />
      <SubNav compData={storiesDetailData?.subNav} />
      <h1 className="text-center mt-5 pt-5">BACKEND API MISSING FOR THIS PAGE</h1>
      <Container>
        <StoryDetails compData={storiesDetailData?.storyDetails} />
      </Container>
    </Layout>
  );
};

export default Details;
