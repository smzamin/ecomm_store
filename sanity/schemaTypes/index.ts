import { heroBannerSlot } from './heroBannerSlot';
import { type SchemaTypeDefinition } from 'sanity';
import { addressType } from './addressType';
import { blockContentType } from './blockContentType';
import { brandType } from './brandType';
import { categoryType } from './categoryType';
import { orderType } from './orderType';
import { productType } from './productType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    productType,
    orderType,
    brandType,
    addressType,
    blockContentType,
    heroBannerSlot
  ],
};
