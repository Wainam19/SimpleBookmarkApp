import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { BrandStateInterface } from './state';

const brandAPI = 'https://assets.g2g.com/offer/keyword.json';

const actions: ActionTree<BrandStateInterface, StateInterface> = {
  async getBrand(context) {
    try {
      await fetch(brandAPI)
        .then((response) => response.json())
        .then((data) => {
          const values = Object.values(data);
          const filteredValues = values.splice(0, 200);
          filteredValues.forEach((element: any) => {
            const brandData = {
              id: element.keyword_id,
              name: element.default_name,
              bookmark: false,
            };
            context.commit('setBrand', brandData);
          });
        });
    } catch (error) {
      return error;
    }
  },
  editBrand(context, body: any) {
    context.commit('editBrand', body);
  },
  removeBookmark(context, body: any) {
    context.commit('removeBookmark', body);
  },
};

export default actions;
