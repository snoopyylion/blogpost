import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { news } from './news'
import { playlist } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, news, playlist],
}
