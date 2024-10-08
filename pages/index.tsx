import { ENDPOINT, getAPI } from '@api-manager';
import {
  AppCookie,
  CardSlider,
  Conditions,
  ErrorFallback,
  Faqs,
  Layout,
  Learning,
  MainBanner,
  ScaleSlider,
  TwoColumnCard,
} from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter, buildVersioinWarning } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import styles from './index.module.scss';
declare const __VERSION__: string, __GIT_VERSION__: string, __BUILD_TIME__: number;
buildVersioinWarning(__VERSION__, __GIT_VERSION__, __BUILD_TIME__);

const HomePage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;
  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { header, main, footer } = data;
  const {
    admissionCards = null,
    conditions = null,
    faqs = null,
    learning = null,
    lifeAtSchool = null,
    mainBanner = null,
    seoData = null,
    ourApproachCard = null,
    ourInfrastructure = null,
    stories = null,
    welcomeCard = null,
    cookies = null,
  } = main;

  return (
    <Layout
      footerData={footer?.footer?.fields}
      headerData={header?.header?.fields}
      seoData={seoData?.fields}
      className={styles.homePage}
      isHomePage={true}
      mainBannerData={mainBanner?.fields?.data[0]?.imageSource}
    >
      {mainBanner?.fields && <MainBanner compData={mainBanner?.fields} />}
      {welcomeCard?.fields && <TwoColumnCard compData={welcomeCard?.fields} />}
      {ourApproachCard?.fields && <TwoColumnCard compData={ourApproachCard?.fields} />}
      {learning?.fields && <Learning compData={learning?.fields} />}
      {lifeAtSchool?.fields && <CardSlider compData={lifeAtSchool?.fields} />}
      {ourInfrastructure?.fields && <ScaleSlider compData={ourInfrastructure?.fields} />}
      {stories?.fields && <CardSlider compData={stories?.fields} />}
      {admissionCards?.fields && <TwoColumnCard compData={admissionCards?.fields} />}
      {faqs?.fields && <Faqs compData={faqs?.fields} />}
      {conditions?.fields && <Conditions compData={conditions?.fields} />}
      {cookies?.fields && <AppCookie compData={cookies?.fields} />}
    </Layout>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.homePage);
    const data = apiDataFilter(res);
    // const device = getDeviceTypeServerSide(Context?.req?.headers['user-agent']);
    return {
      props: {
        data,
        // device,
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
