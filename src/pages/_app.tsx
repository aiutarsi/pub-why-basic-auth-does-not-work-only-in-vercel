import { AppProps } from "next/app";
import Head from "next/head";

import { env } from "../modules/utils/env";

function CustomApp(props: AppProps) {
  const { Component, pageProps } = props;

  console.log("_app");
  console.log(env.clientEnv);

  return (
    <>
      <Head>
        {env.clientEnv !== "prod" && <meta name="robots" content="noindex" />}
      </Head>
      {env.isMaintenance ? (
        <div>maintenance</div>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default CustomApp;
