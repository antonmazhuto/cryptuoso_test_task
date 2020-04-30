import React, {useState} from 'react';
import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../lib/withApollo';
import Layout from "../components/layout";
import ROBOTS_QUERY from "../graphql/robots.query";
import {Robots} from "../components/Robots";

const Index = () => {
    const [isVisible, setVisible] = useState(true);
    const { data , loading, fetchMore, error } = useQuery(
        ROBOTS_QUERY,
        {
            variables: {
                offset: 0,
                limit: 10
            },
        }
    );
    if (error) {
        return <p>Error: {JSON.stringify(error)}</p>;
    }

    return <Layout home>
        <Head>
            <title>Home</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {
            loading ? <p>loading...</p> : (
                <Robots
                    entries={data.robots || []}
                    visibleBtn={isVisible}
                    onLoadMore={() =>
                        fetchMore({
                            variables: {
                                offset: data.robots.length
                            },
                            updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult)return prev;
                                if (fetchMoreResult.robots.length === 0) setVisible(false);
                                return Object.assign({}, prev, {
                                    robots: [...prev.robots, ...fetchMoreResult.robots]
                                });
                            }
                        })
                    }
                />
            )
        }
    </Layout>
};

export default withApollo(Index);
