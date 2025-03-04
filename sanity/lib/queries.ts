import { defineQuery } from "next-sanity";

export const newsQuery = defineQuery( `*[_type == "news" && defined(slug.current) && !defined($search) || title match $search || category match $search || author -> name match $search] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  description,
  category,
  image
}`)

export const NEWS_BY_ID_QUERY = defineQuery(`*[_type == "news" && _id == $id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  description,
  category,
  image,
  news,
}`)

export const NEWS_VEIWS_QUERY = defineQuery(`*[_type == "news" && _id == $id][0]{
  _id, views
}`)

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`*[_type == "author" && id == $id][0]{
 _id,
 id,
 name,
 username,
 email,
 image,
 bio
}`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`*[_type == "author" && _id == $id][0]{
 _id,
 id,
 name,
 username,
 email,
 image,
 bio
}`);

export const NEWS_BY_AUTHOR_QUERY = defineQuery( `*[_type == "news" && author._ref == $id] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  description,
  category,
  image
}`)

export const PLAYLIST_BY_SLUG_QUERY = defineQuery( `*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    news
  }
}`);