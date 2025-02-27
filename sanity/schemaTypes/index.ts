import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { news } from './news'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, news],
}
