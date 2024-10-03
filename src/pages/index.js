import React from "react";
import { getAwards } from "../lib/contentful/api";
import Head from "next/head";

export default function Index({ awards }) {
  return (
    <>
      <Head>
        <title>Home | Next-js Contentful</title>
      </Head>
      <div>
        {awards.map((i, idx) => {
          return (
            <div key={idx}>
              <h5>{i.bannertitle}</h5>
              <p>{i.bannerdesc}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const awards = await getAwards(false);

  return {
    props: {
      awards,
    },
    revalidate: 60,
  };
}
