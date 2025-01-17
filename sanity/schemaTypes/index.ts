import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType';
import { categoryType } from './categoryType';
import { productType } from './productType';
import { orderType } from './orderType';
import { newsType } from './newsType';
import { heroSectionType } from './heroSectionType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, heroSectionType, categoryType, productType, orderType, newsType],
};
