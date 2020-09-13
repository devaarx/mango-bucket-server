import Head from 'next/head';
import { Fragment } from 'react';

import { Layout } from '../components/Layout';

const IndexPage = () => (
  <Fragment>
    <Head>
      <title>SoundQ</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo autem odio dolorem voluptatibus distinctio minima,
        voluptatum ipsum quos ex nulla rerum ducimus iusto facilis id assumenda quo, tenetur dolorum earum, officiis est
        et nobis? Vel eos ipsum similique quae, inventore, possimus voluptatem rem quo tenetur voluptatum illum, laborum
        aut labore?
      </p>
    </Layout>
  </Fragment>
);

export default IndexPage;
