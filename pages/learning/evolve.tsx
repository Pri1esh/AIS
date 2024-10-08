import {
  CardSlider,
  HeroBanner,
  Layout,
  Overview,
  Stories,
  SubNav,
  TwoColumnCard,
  TwoColumnCardSmall,
} from '@components';
import type { NextPage } from 'next';
import { Container } from 'react-bootstrap';
import readingWritingProgrammePageData from 'src/assets/data/readingWritingProgrammePage.json';

const ReadingWritingProgrammePage: NextPage = () => {
  const {
    cardList,
    stories,
    // footer, header, seoData,
    overview,
    mainCard,
    facilities,
    mainBanner,
    subNav,
  } = readingWritingProgrammePageData;
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
      <TwoColumnCard compData={mainCard} />
      <TwoColumnCardSmall compData={cardList} />
      <CardSlider compData={facilities} />
      <Stories compData={stories} />
    </Layout>
  );
};

export default ReadingWritingProgrammePage;
