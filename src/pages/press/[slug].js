import React from "react";
import { getPostBySlug } from "@/src/lib/contentful/api";
import { getHeader } from "@/src/lib/contentful/api";
import Head from "next/head";

const pressdetail = ({ post }) => {
  // console.log(post, "slug");
  if (!post) {
    return (
      <div>
        <h1>Error: Post not found</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.posttitle} - Zoya</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="w-full flex-col flex border-b-[1px] border-black banner xl:flex-row h-auto lg:h-screen">
        <h1 className="bold mb-[20px]">{post.posttitle}</h1>
        <p className="bold mb-[20px]">{post.description}</p>
        {post.postimg && (
          <img src={post.postimg.url} alt={post.postimg.title} />
        )}
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const headerData = await getHeader(false);
  const paths =
    headerData[0]?.allnewsCollection?.items?.map((item) => ({
      params: { slug: item.postslug },
    })) || [];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // console.log(params, "params");
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
}

export default pressdetail;
