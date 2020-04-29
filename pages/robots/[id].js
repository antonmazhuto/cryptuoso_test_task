import Layout from '../../components/layout'
import React from "react";
import { withRouter} from "next/router";
import Head from "next/head";

function Robot({router: {query: robot}}) {
    return <Layout>
        <Head>
            <title>Robot Details</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div style={{padding: 60, marginTop: 60}}>
            <span>code: {robot.code}</span>
            <span>status: {robot.status}</span>
        </div>
    </Layout>
}

export default withRouter(Robot)
