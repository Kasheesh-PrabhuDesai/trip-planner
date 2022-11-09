import "../styles/globals.css";
import { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { easyTripPlannerTheme } from "../src/theme";
import Head from "next/head";
import { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";

function EasyTripApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement)
      jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <ThemeProvider theme={easyTripPlannerTheme}>
      <Head>
        <title>Easy Trip Planner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <CssBaseline />
      <SnackbarProvider
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Component {...pageProps} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default EasyTripApp;
