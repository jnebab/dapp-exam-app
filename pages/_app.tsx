import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Neptune Mutual: Crypto Converter</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
