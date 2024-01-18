import Head from "next/head";

import Layout from "@/components/ui/layout";
import { FavoriteContextProvider } from "@/store/favorite-context";

import "@/styles/globals.css";
import { Russo_One } from "next/font/google";
const russo_one = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-russo-one",
  display: "swap",
});
import "@fortawesome/fontawesome-svg-core/styles.css"; // Font Awesome
import { config } from "@fortawesome/fontawesome-svg-core";
import { CookiesProvider } from "react-cookie";
config.autoAddCss = false; // Font Awesome core SVG library will not try and insert <style> elements into the <head> of the page.

export default function App({ Component, pageProps }) {
  return (
    <div className={russo_one.className}>
      <CookiesProvider>
        <FavoriteContextProvider>
          <Head>
            <title>MLB Match Tracker</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link rel="icon" href="/favicon.svg" sizes="any" />
          </Head>
          <Layout>
            <main>
              <Component {...pageProps} />
            </main>
          </Layout>
        </FavoriteContextProvider>
      </CookiesProvider>
    </div>
  );
}
