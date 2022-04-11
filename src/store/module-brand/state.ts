import { Brand } from 'src/models/Brand';

export interface BrandStateInterface {
  brands: Brand[];
  bookmarkList: Brand[];
}

function state(): BrandStateInterface {
  return {
    brands: [],
    bookmarkList: [],
  };
}

export default state;
