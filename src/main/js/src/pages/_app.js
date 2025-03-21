import "../styles/globals.css";
//Components
import Layout from "@components/Common/Layout/Layout";
import Head from "@components/Common/Head/Head";
//Contexts
import { GlobalDataProvider } from "@contexts/GlobalData";
function MyApp({ Component, pageProps }) {
    return (
        <GlobalDataProvider>
            <Head />
            <Layout pageProps={pageProps}>
                <Component {...pageProps} />
            </Layout>
        </GlobalDataProvider>
    );
}

export default MyApp;
