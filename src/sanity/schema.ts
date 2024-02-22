import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemaTypes/blockContent'
import category from './schemaTypes/category'
import post from './schemaTypes/post'
import author from './schemaTypes/author'
import settings from './schemaTypes/settings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent,settings],
}
export const schemaTypes=[post, author, category, blockContent,settings]