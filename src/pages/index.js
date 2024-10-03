import React from "react";
import { getAwards } from "../lib/contentful/api";

export default function Index({ awards }) {

  return (
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
