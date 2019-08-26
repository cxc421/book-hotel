import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import loading from '../loading';

const theme = {
  colors: {
    primary: '#0070f3'
  }
};

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    padding: 0;
    margin: 0;
    font-family: 'Noto Sans TC', sans-serif;
  }

  h1, h2, h3 {
    margin: 0;
  }
`;

Router.events.on('routeChangeStart', url => {
  // console.log('start transition page');
  loading.start();
});
// Router.events.on('routeChangeComplete', () => {
//   // loading.done();
//   // console.log('done');
// })
// Router.events.on('routeChangeError', () => {
//   // loading.done();
//   // console.log('route error');
// })

// function cancelAnimate() {
//   console.log('cancel animate');
//   loading.done();
// }

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <>
          <Head>
            <link
              href="https://fonts.googleapis.com/css?family=Noto+Sans+TC:100,300,400|Open+Sans:300,400,600,700&display=swap"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            <link rel="stylesheet" type="text/css" href="/static/loader.css" />
            <title>好室旅店。HOUSE HOTEL</title>
          </Head>
          <GlobalStyle />
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    );
  }
}
