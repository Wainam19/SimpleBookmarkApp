import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { BrandStateInterface } from './state';

const getters: GetterTree<BrandStateInterface, StateInterface> = {
  getBrand(state) {
    return state.brands;
  },
};

export default getters;
