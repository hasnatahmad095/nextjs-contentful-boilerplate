import React from "react";
import { getHeader } from "../lib/contentful/api";
import Head from "next/head";
import Link from "next/link";

const press = ({ HeaderData }) => {
  console.log(HeaderData, "HeaderData");

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <div className="w-full h-max bg-red-300">
        <p className="">{HeaderData[0]?.title}</p>
        <p className="">{HeaderData[0]?.description}</p>
        <div className="flex">
        {HeaderData[0]?.allnewsCollection?.items?.map((item, i) => {
          return (
            <Link href={`/press/${item.postslug}`} key={i}>
              <div>
                <p>{item.postslug}</p>
                {item.postimg && <img src={item.postimg.url} alt="img" />}
                <p className="paragraph">{item.posttitle}</p>
              </div>
            </Link>
          );
        })}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const HeaderData = await getHeader(false);
  return {
    props: {
      HeaderData: HeaderData || [],
    },
    revalidate: 60,
  };
}

export default press;
