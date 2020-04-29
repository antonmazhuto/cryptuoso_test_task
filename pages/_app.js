import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import React from "react";
import Router from "next/router";
import '../styles/global.css'

const App = ({ Component, pageProps, apollo }) => (
    <ApolloProvider client={apollo}>
        <Component {...pageProps} />
    </ApolloProvider>
);

export default withApollo(({ initialState }) => {
    return new ApolloClient({
        uri: 'https://hasura.dev.cryptuoso.com/v1/graphql',
        cache: new InMemoryCache().restore(initialState || {})
    });
})(App);

initRouterListeners();

function initRouterListeners() {
    const routes = [];

    Router.events.on('routeChangeStart', (url) => {
        pushCurrentRouteInfo();
    });

    Router.events.on('routeChangeComplete', (url) => {
        fixScrollPosition();
    });

    function pushCurrentRouteInfo() {
        routes.push({pathname: Router.pathname, scrollY: window.scrollY});
    }

    function isBack() {
        return routes.length >= 2 && Router.pathname === routes[routes.length - 2].pathname;
    }

    function fixScrollPosition () {

        let scrollY = 0;

        if (isBack()) {
            routes.pop(); // route where we come from
            const targetRoute = routes.pop(); // route where we return
            scrollY = targetRoute.scrollY; // scrollY we had before
        }

        console.log("Scrolling to", scrollY);
        window.requestAnimationFrame(() => window.scrollTo(0, scrollY));
        console.log("routes now:", routes);
    }
}
