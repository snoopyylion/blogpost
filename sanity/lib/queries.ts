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
  pitch
}`)

export const NEWS_VEIWS_QUERY = defineQuery(`*[_type == "news" && _id == $id][0]{
  _id, views
  }`)