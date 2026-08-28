import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { getHeader, getPostBySlug, type Post } from "@/lib/contentful/api";

const PressDetail = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!post) {
    return (
      <div className="container">
        <h1>Error: Post not found</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.posttitle}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="container border-b border-black py-8">
        <h1 className="mb-[20px]">{post.posttitle}</h1>
        {post.postimg?.url && (
          <Image
            src={post.postimg.url}
            alt={post.postimg.title ?? post.posttitle}
            width={post.postimg.width ?? 1200}
            height={post.postimg.height ?? 800}
          />
        )}
      </div>
    </>
  );
};

export const getStaticPaths = (async () => {
  const headerData = await getHeader(false);
  const paths =
    headerData[0]?.allnewsCollection?.items?.map((item) => ({
      params: { slug: item.postslug },
    })) ?? [];

  return {
    paths,
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { notFound: true, revalidate: 60 };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
}) satisfies GetStaticProps<{ post: Post }>;

export default PressDetail;
