import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getHeader, type HeaderItem } from "@/lib/contentful/api";

const Press = ({
  headerData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const header = headerData[0];

  return (
    <>
      <Head>
        <title>Press | Next.js + Contentful</title>
      </Head>
      <div className="container">
        <p>{header?.title}</p>
        <p>{header?.description}</p>
        <div className="flex flex-wrap gap-4">
          {header?.allnewsCollection?.items?.map((item, index) => (
            <Link href={`/press/${item.postslug}`} key={index}>
              <div>
                <p>{item.postslug}</p>
                {item.postimg?.url && (
                  <Image
                    src={item.postimg.url}
                    alt={item.postimg.title ?? item.posttitle}
                    width={item.postimg.width ?? 400}
                    height={item.postimg.height ?? 300}
                  />
                )}
                <p className="paragraph">{item.posttitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticProps = (async () => {
  const headerData: HeaderItem[] = await getHeader(false);

  return {
    props: {
      headerData,
    },
    revalidate: 60,
  };
}) satisfies GetStaticProps<{ headerData: HeaderItem[] }>;

export default Press;
