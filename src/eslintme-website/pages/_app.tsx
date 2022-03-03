import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from '@components/Header';

/**
 * Components for the Next.js App
 */
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <div className='content'>
                <Component {...pageProps} />
            </div>
        </>
    );
}
export default MyApp;
