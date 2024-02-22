
import { createClient } from "next-sanity";



import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";
import getAllPaginatedPost, {
  postquery,
  configQuery,
  singlequery,
  pathquery,
  allauthorsquery,
  
  catpathquery,
  
  getAll,
  searchquery,
  categoryDetz,
  paginatedPostByCategoryQuery
} from "@/sanity/lib/groq";
import { CategoryDetz, Post, Settings, SinglePost } from "@/sanity/types";

if (!projectId) {
  console.error(
    "The Sanity Project ID is not set. Check your environment variables."
  );
}

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null;

export const fetcher = async ([query, params]: any) => {
  return client ? client.fetch(query, params, {
    next: {
      revalidate:3600
    }
  }) : [];
};

(async () => {
  if (client) {
    const data = await client.fetch(getAll);
    if (!data || !data.length) {
      console.error(
        "Sanity returns empty array. Are you sure the dataset is public?"
      );
    }
  }
})();
export async function searchPost(query:string):Promise<Post[]> {
  if (client) {
    return (await client.fetch(searchquery,{queryz:query})) || [];
  }
  return [];
}
export async function getAllPosts(): Promise<Post[]> {
  if (client) {
    return (
      (await client.fetch(
        postquery
      )) || []
    );
  }
  return [];
}

export async function getSettings():Promise<Settings> {
  if (client) {
    return (await client.fetch(configQuery, {}, {
      next: {
        tags:['settings']
      }
    })) || [];
  }
  return {} as Settings;
}

export async function getPostBySlug(slug: string): Promise<SinglePost> {
  if (client) {
    return (
      (await client.fetch(
        singlequery,
        { slug }
      )) || {}
    );
  }
  return {} as SinglePost;
}

export async function getAllPostsSlugs() {
  if (client) {
    const slugs = (await client.fetch(pathquery)) || [];
    return slugs.map((slug: string) => ({ slug }));
  }
  return [];
}



export async function getAllAuthors() {
  if (client) {
    return (
      (await client.fetch(
        allauthorsquery,
      )) || []
    );
  }
  return [];
}
export async function getAllCatSlugs(){
  if (client) {
   const slugs = (await client.fetch(catpathquery)) || [];
    return slugs.map((slug: string) => ({ slug }));
  }
}
// Category
export async function getAllCategories(): Promise<CategoryDetz[]> {
  if (client) {
    const category =
      (await client.fetch(
        categoryDetz
      )) || [];
    return category;
  }
  return [];
}
export async function StaticParamsCategory() {
  if (client) {
    const slugs =
      (await client.fetch(
        catpathquery
      )) || [];
    return slugs;
  }
  return [];
}

export async function getPaginatedPosts({
  limit,
  prevId,
  nextId,
}: {
  limit: number;
  prevId: string | null;
  nextId: string | null;
}): Promise<Post[]> {
  if (client) {
    let symbol = ">";
    let lastId: string;
    let sort = "asc";
    if (prevId) {
      symbol = "<";
      lastId = prevId;
      sort = "desc";
    } else if (nextId) {
      lastId = nextId;
    } else {
      //we're at start
      lastId = "";
    }
    const result =
      (await client.fetch(
        getAllPaginatedPost(symbol, sort),
        {
          limit,
          lastId,
        }
      )) || [];
    return result;
  }
  return [];
}
export async function getPaginatedPostsByCategory({
  keyword,
  limit,
  prevId,
  nextId,
}: {
  keyword: string;
  limit: number;
  prevId: string | null;
  nextId: string | null;
}): Promise<Post[]> {
  if (client) {
    let symbol = ">";
    let lastId: string;
    let sort = "asc";
    if (prevId) {
      symbol = "<";
      lastId = prevId;
      sort = "desc";
    } else if (nextId) {
      lastId = nextId;
    } else {
      //we're at start
      lastId = "";
    }
    const query = `*[_type == "post" && $keyword in categories[]->slug.current && _id ${symbol} $lastId]| order(_id ${sort}) [0...$limit] {
       ..., mainImage {
     ...,
     "blurDataURL":asset->metadata.lqip,
     "ImageColor": asset->metadata.palette.dominant.background,
   },
   author->,
   categories[]->
     }`;
   
    const result =
      (await client.fetch(
        query,
        {
          keyword,
          limit,
          lastId,
        }
      )) || [];
    return result;
  }
  return [];
}
