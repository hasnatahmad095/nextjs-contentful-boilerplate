import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { getAwards, type Banner } from "@/lib/contentful/api";

export default function Index({
  awards,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Home | Next.js + Contentful</title>
      </Head>
      <div className="container">
        {awards.map((award, index) => (
          <div key={index}>
            <h5>{award.bannertitle}</h5>
            <p>{award.bannerdesc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export const getStaticProps = (async () => {
  const awards: Banner[] = await getAwards(false);

  return {
    props: {
      awards,
    },
    revalidate: 60,
  };
}) satisfies GetStaticProps<{ awards: Banner[] }>;
