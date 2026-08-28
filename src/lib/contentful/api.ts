export interface ContentfulAsset {
  title: string | null;
  description: string | null;
  fileName: string | null;
  url: string;
  width: number | null;
  height: number | null;
}

export interface Post {
  posttitle: string;
  postslug: string;
  postimg: ContentfulAsset | null;
}

export interface HeaderItem {
  title: string;
  description: string;
  allnewsCollection: {
    items: Post[];
  };
}

export interface Banner {
  bannertitle: string;
  bannerdesc: string;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

const IMAGE_OR_VIDEO_FIELDS = `
  title
  description
  fileName
  url
  width
  height
`;

const OUR_AWARDS_FIELDS = `
  bannertitle
  bannerdesc
`;

const HEADER_FIELDS = `
  title
  description
  allnewsCollection(limit: 5) {
    items {
      ... on Post {
        posttitle
        postslug
        postimg {
          ${IMAGE_OR_VIDEO_FIELDS}
        }
      }
    }
  }
`;

async function fetchGraphQL<T>(
  query: string,
  preview = false,
): Promise<GraphQLResponse<T>> {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const token = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;

  // Fail soft when credentials are missing so the app still builds/renders.
  if (!spaceId || !token) {
    return {};
  }

  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
      },
    );

    if (!response.ok) {
      console.error(
        `Contentful GraphQL request failed: ${response.status} ${response.statusText}`,
      );
      return {};
    }

    return (await response.json()) as GraphQLResponse<T>;
  } catch (error) {
    console.error("Contentful GraphQL request errored:", error);
    return {};
  }
}

export const getHeader = async (
  isDraftMode: boolean,
): Promise<HeaderItem[]> => {
  const response = await fetchGraphQL<{
    headerCollection: { items: HeaderItem[] };
  }>(
    `query {
      headerCollection(preview: ${isDraftMode ? "true" : "false"}) {
        items {
          ${HEADER_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );

  return response.data?.headerCollection?.items ?? [];
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const response = await fetchGraphQL<{
    postCollection: { items: Post[] };
  }>(
    `query {
      postCollection(where: { postslug: "${slug}" }, limit: 1) {
        items {
          posttitle
          postslug
          postimg {
            ${IMAGE_OR_VIDEO_FIELDS}
          }
        }
      }
    }`,
  );

  return response.data?.postCollection?.items?.[0] ?? null;
};

export const getAwards = async (isDraftMode: boolean): Promise<Banner[]> => {
  const response = await fetchGraphQL<{
    bannerCollection: { items: Banner[] };
  }>(
    `query {
      bannerCollection(preview: ${isDraftMode ? "true" : "false"}) {
        items {
          ${OUR_AWARDS_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );

  return response.data?.bannerCollection?.items ?? [];
};
