import { groq } from "next-sanity";
export const paginatedPostByCategoryQuery = ( sort: string,symbol:string)=>{
  return  `*[_type == "post" && $keyword in categories[]->slug.current && _id ${symbol} $lastId]| order(_id ${sort}) [0...$limit] {
       ..., mainImage {
     ...,
     "blurDataURL":asset->metadata.lqip,
     "ImageColor": asset->metadata.palette.dominant.background,
   },
   author->,
   categories[]->
     }`
}

export default function getAllPaginatedPost(symbol: string, sort: string) {
  return `*[_type == "post" && _id ${symbol} $lastId]| order(_id ${sort}) [0...$limit] {
       ..., mainImage {
     ...,
     "blurDataURL":asset->metadata.lqip,
     "ImageColor": asset->metadata.palette.dominant.background,
   },"estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
   author->{
    image,
    slug,
    name
  }
     }`;
}
// Get all posts
export const postquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
  _id,
  _createdAt,
  publishedAt,
  _updatedAt,
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  featured,
  excerpt,
  slug,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  "estimatedWordCount": round(length(pt::text(body)) / 5),
  title,
  author-> {
    image,
    slug,
    name
  },
}
`;
//Get all categories for sidebar
export const categoryDetz = groq`*[_type == "category"]{
  title,
  slug,
    mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  }
}`;





// Get Site Config
export const configQuery = groq`
*[_type == "settings"][1] {
   ...
}
`;

// Single Post
export const singlequery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
     mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
    
  },
  body[]{
    ...,
     _type=="image"=>{
        "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
      },
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    },
    "headings": body[length(style) == 2 && string::startsWith(style, "h")]
  },
  author->{
    occupation,bio,slug,name,image {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  },
  categories[]->{
    slug,title
  },
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  "estimatedWordCount": round(length(pt::text(body)) / 5),
  "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedAt desc, _createdAt desc) [0...3] {
    title,
    slug,
    author-> {
    slug,
    name
  },
     mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
    
  }
  },
}
`;
// Paths for generateStaticParams
export const pathquery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;
export const catpathquery = groq`
*[_type == "category" && defined(slug.current)][].slug.current
`;



export const searchquery = groq`*[_type == "post" && _score > 0]
| score(title match $queryz || excerpt match $queryz || pt::text(body) match $queryz)
| order(_score desc)
{
  ..., mainImage {
     ...,
     "blurDataURL":asset->metadata.lqip,
     "ImageColor": asset->metadata.palette.dominant.background,
   },
   author->
}`;

// Get all Authors
export const allauthorsquery = groq`
*[_type == "author"] {
 ...,
 'slug': slug.current,
}
`;

// get everything from sanity
// to test connection
export const getAll = groq`*[]`;
