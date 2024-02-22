import { Image, ImageAsset } from "sanity";
export interface Asset {
  asset: {
    _type: "reference";
    _ref: string;
  };
}
export interface ImageAdd {
  ImageColor: string;
  alt: string;
  blurDataURL: string;
  _type: "image";
}
export interface CategoryDetz {
  title: string;
  slug: Slug;
  alt: string;
  mainImage: ImageAdd & Image | any;
}
export interface Post {
  mainImage: ImageAdd & Image;
  estReadingTime: number;
  estimatedWordCount: number;
  excerpt: string;
  title: string;
  author: {
    slug: Slug;
    name: string;
  } & Image;
  categories: Category[];
  _id: string;
  _createdAt: string;
  publishedAt: string | null;
  _updatedAt: string;
  featured: boolean;
  slug: Slug;
}
export interface Settings{
    email: string;
    phone: string;
    description: string;
    openGraphImage: Image,
    copyright: string;
    logo: Image;
    social: {
        media: string;
        _key: string;
        url: string;
    }[];
    title: string;
    _updatedAt: string;
    _createdAt: string;
    _type: string;
    url: string;
    _rev: string;
}


interface Slug {
  _type: "slug";
  current: string;
}
interface Category {
  _createdAt: string;
  _rev: string;
  _type: string;
  description: string;
  _id: string;
  title: string;
  _updatedAt: string;
}
export interface Author {
  _createdAt: string;
  _type: string;
  _updatedAt: string;
  slug: {
    current: string;
    _type: string;
  };
  occupation?: string;
  _rev: string;
  name: string;
  bio: {
    markDefs: any[]; // You might want to define a more specific interface for markDefs
    children: any[]; // You might want to define a more specific interface for children
    _type: string;
    style: string;
    _key: string;
  }[];
}
export interface SinglePost {
  _type: "post";
  title: string;
  slug: Slug;
  estReadingTime: number;
  estimatedWordCount: number;
  excerpt: string;
  featured: boolean;
  categories: SinglePostCategories[];
  _rev: string;
  mainImage: ImageAdd & Image;
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  publishedAt: string;
  related: SinglePostRelatedPost[];
  author: SinglePostAuthor;
  body: SinglePostBody[];
}
export interface SinglePostRelatedPost {
  title: string;
  slug: Slug;
  author: { name: string };
  mainImage: ImageAdd & Image;
}
export interface SinglePostAuthor {
  name: string;
  image: ImageAdd & Image;
  occupation: string;
  bio: any[];
  slug: Slug;
}

export interface SinglePostCategories {
  slug: Slug;
  title: string;
}

export interface SinglePostBody {
  markDefs: any[];
  children: { _key: string; _type: string; style?: string; text?: string }[];
  _type: string;
  style?: string;
  _key: string;
  headings?: any;
}

/*{
  _type: 'post',
  estReadingTime: 8,
  excerpt: 'Reinvention often comes in spurts, after a long period of silence. Just as modern architecture recently enjoyed a comeback, brand architecture, a field with well-established principles for decades, is back in the limelight.',
  featured: true,
  categories: [ { slug: [Object], title: 'Engineering' } ],
  _rev: 'HDYpJujF7Re3qdeuleQvjV',
  mainImage: {
    _type: 'image',
    alt: 'pinky pink three boxes',
    asset: {
      _ref: 'image-82aaf90fd3317100cb50687867dbac1a73f8363d-2400x1371-jpg',
      _type: 'reference'
    },
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMEBQf/xAAfEAACAgIBBQAAAAAAAAAAAAABAgADBRIhERMUInH/xAAWAQEBAQAAAAAAAAAAAAAAAAAFAQT/xAAaEQACAwEBAAAAAAAAAAAAAAAAAQIDEQQx/9oADAMBAAIRAxEAPwDtbZHx9AELlj04j68n3Qoatl2JHyZ9UoB4idla009EYpeDLbAXMJK59oS4AyrWn//Z',     
    ImageColor: '#944539'
  },
  _id: '18ec2acf-0a3e-478f-a03f-a3046d8d36eb',
  _createdAt: '2024-02-13T14:05:55Z',
  _updatedAt: '2024-02-18T18:53:04Z',
  related: [
    {
      title: 'Architectural Engineering Wonders of the modern era for your Inspiration',
      slug: [Object],
      author: [Object],
      mainImage: [Object]
    },
    {
      title: 'last ig',
      slug: [Object],
      author: [Object],
      mainImage: [Object]
    },
    {
      title: 'Better to Eat More',
      slug: [Object],
      author: [Object],
      mainImage: [Object]
    }
  ],
  author: {
    name: 'Mario Sanchez',
    image: {
      asset: [Object],
      _type: 'image',
      blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAUGBwQI/8QAJBAAAgEEAgEEAwAAAAAAAAAAAQIDAAQFEQYSIQcVQWExcYH/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAwEC/8QAGhEAAwADAQAAAAAAAAAAAAAAAAECAxExQf/aAAwDAQACEQMRAD8A1S5C2dnNcMjOI131X8n6qFwXIRkMn7fe2ElldOhkjDEMHX9j5qZ5NksfjcVN7hdRQhl0A7aJ/lViwz2FhyFjNdSwQSshERdhs7+fqltzaS9KY5msdU+otj2w7GldqMkyLJGwZGGwVOwaVTRLZ5Y9XMhc3nOcklxKzJC/RF34AFVF3YgEuxIHjZ3qlK1nCNP4By7MWnHlgjuO0aSMF7jZA8eKUpQH/9k=',
      ImageColor: '#daaea0',
      alt: 'Noice guy'
    },
    occupation: 'Frontend Engineer',
    bio: [ [Object] ],
    slug: { current: 'mario-sanchez', _type: 'slug' }
  },
  body: [
    {
      markDefs: [],
      children: [Array],
      _type: 'block',
      style: 'h1',
      _key: '254350ea7827',
      headings: null
    },
    {
      markDefs: [],
      children: [Array],
      headings: null,
      _type: 'block',
      style: 'h2',
      _key: '3084ca0cac4e'
    },
    {
      style: 'h3',
      _key: '6942c47db3ee',
      headings: null,
      markDefs: [],
      children: [Array],
      _type: 'block'
    },
    {
      _key: 'a0c4e4cc1d07',
      markDefs: [],
      headings: null,
      children: [Array],
      _type: 'block',
      style: 'normal'
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'f15966c545ce',
      headings: null,
      markDefs: [],
      children: [Array]
    },
    {
      _key: 'a1b5521749a4',
      markDefs: [],
      children: [Array],
      headings: null,
      _type: 'block',
      style: 'normal'
    },
    {
      style: 'h3',
      _key: 'c86a7dbc3709',
      headings: null,
      markDefs: [],
      children: [Array],
      _type: 'block'
    },
    {
      _key: '52f656fd4925',
      headings: null,
      markDefs: [],
      children: [Array],
      _type: 'block',
      style: 'normal'
    },
    {
      _type: 'block',
      headings: null,
      style: 'h1',
      _key: '62cebaa95556',
      markDefs: [],
      children: [Array]
    },
    {
      style: 'normal',
      _key: '4d1fac66f83d',
      markDefs: [],
      headings: null,
      children: [Array],
      _type: 'block'
    },
    {
      style: 'h4',
      _key: 'bdefad9be16f',
      headings: null,
      markDefs: [],
      children: [Array],
      _type: 'block'
    },
    {
      children: [Array],
      _type: 'block',
      style: 'normal',
      _key: 'a8b33651482f',
      headings: null,
      markDefs: [Array]
    },
    {
      _type: 'block',
      style: 'normal',
      _key: '08b2a3ed48cb',
      markDefs: [],
      children: [Array],
      headings: null
    },
    {
      style: 'normal',
      _key: '35bc37605c63',
      headings: null,
      markDefs: [],
      children: [Array],
      _type: 'block'
    },
    {
      markDefs: [],
      children: [Array],
      _type: 'block',
      style: 'normal',
      _key: '4b6b842b1d59',
      headings: null
    },
    {
      markDefs: [],
      children: [Array],
      _type: 'block',
      style: 'normal',
      _key: 'b7e1e3003a3b',
      headings: null
    },
    {
      _key: 'd09455427754',
      headings: null,
      markDefs: [],
      children: [Array],
      _type: 'block',
      style: 'normal'
    },
    {
      _key: 'e7b105469fd6',
      markDefs: [],
      children: [Array],
      _type: 'block',
      style: 'normal',
      headings: null
    },
    {
      _key: 'e4fd00b38337',
      markDefs: [],
      children: [Array],
      _type: 'block',
      headings: null,
      style: 'normal'
    },
    {
      _key: '40adee9fd579',
      markDefs: [],
      children: [Array],
      _type: 'block',
      style: 'normal',
      headings: null
    },
    {
      _key: '87fa9e6bbdfd',
      markDefs: [],
      children: [Array],
      _type: 'block',
      headings: null,
      style: 'normal'
    },
    {
      markDefs: [],
      children: [Array],
      _type: 'block',
      style: 'normal',
      headings: null,
      _key: 'd11d51f9fa13'
    }
  ],
  slug: {
    current: 'architectural-engineering-wonders-of-the-modern-era-for-your-inspiration',
    _type: 'slug'
  },
  publishedAt: '2024-02-18T11:34:39.507Z',
  title: 'Architectural Engineering Wonders of the modern era for your Inspiration'
}








 */
