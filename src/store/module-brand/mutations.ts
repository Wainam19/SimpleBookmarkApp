import { Brand } from 'src/models/Brand';
import { MutationTree } from 'vuex';
import { BrandStateInterface } from './state';

const mutation: MutationTree<BrandStateInterface> = {
  setBrand(state, brands: Brand) {
    state.brands.push(brands);
  },
  editBrand(state, brands: Brand) {
    const findIndex = state.brands.findIndex(
      (element: any) => element.id == brands.id
    );
    if (findIndex != -1) {
      state.brands[findIndex].bookmark = brands.bookmark;
      const bookmarkData = state.brands[findIndex];
      state.bookmarkList.push(bookmarkData);
    }
  },
  removeBookmark(state, brands: Brand) {
    const findBrandIndex = state.brands.findIndex(
      (element: any) => element.id == brands.id
    );
    if (findBrandIndex != -1) {
      state.brands[findBrandIndex].bookmark = brands.bookmark;
      // const bookmarkData = state.brands[findBrandIndex];
      // state.bookmarkList.push(bookmarkData);
    }
    const findBookmarkIndex = state.bookmarkList.findIndex(
      (element: any) => element.id == brands.id
    );
    if (findBookmarkIndex != -1) {
      state.bookmarkList.splice(findBookmarkIndex, 1);
    }
  },
};

export default mutation;
