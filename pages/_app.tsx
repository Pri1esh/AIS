import { AppInsightsContextProvider } from '@context';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import useGTM from 'src/lib/utils/useGTM';
import '../styles/styles.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const { loadScript } = useGTM();

  useEffect(() => {
    loadScript(process.env.NEXT_PUBLIC_GTM_ID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const app = () => (
    <AppInsightsContextProvider>
      <Component {...pageProps} />
    </AppInsightsContextProvider>
  );
  return (
    <>
      <SSRProvider>{app()}</SSRProvider>
    </>
  );
}

export default MyApp;
