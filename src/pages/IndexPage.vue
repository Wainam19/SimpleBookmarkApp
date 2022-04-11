<template>
  <q-inner-loading
    :showing="state.isLoading"
    label="Please wait..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
  <div class="q-pa-md">
    <div class="row">
      <div class="col-md-4 col-12 q-px-md">
        <q-input
          filled
          v-model="state.searchKey"
          label="Search Brand"
          debounce="500"
        />
      </div>
    </div>
    <div class="row" v-if="!state.searchKey">
      <div
        class="col-md-4 col-12 q-pa-md"
        v-for="brand in state.brandList"
        :key="brand.id"
      >
        <q-card>
          <q-card-section class="q-pa-sm">
            <q-item>
              <q-item-section>{{ brand.name }}</q-item-section>
              <q-item-section avatar>
                <q-btn
                  v-if="!brand.bookmark"
                  flat
                  round
                  color="accent"
                  icon="bookmark_border"
                  @click="addBookmark(brand.id)"
                />
                <q-btn v-else flat round color="accent" icon="bookmark" />
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row" v-else>
      <div
        class="col-4 q-pa-md"
        v-for="brand in state.filteredBrandList"
        :key="brand.id"
      >
        <q-card>
          <q-card-section class="q-pa-sm">
            <q-item>
              <q-item-section>{{ brand.name }}</q-item-section>
              <q-item-section avatar>
                <q-btn
                  v-if="!brand.bookmark"
                  flat
                  round
                  color="accent"
                  icon="bookmark_border"
                  @click="addBookmark(brand.id)"
                />
                <q-btn v-else flat round color="accent" icon="bookmark" />
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue';
import { useStore } from 'src/store';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const $q = useQuasar();
    const store = useStore();

    let state = reactive({
      brandList: [] as any,
      filteredBrandList: [] as any,
      isLoading: false,
      searchKey: '',
    });

    watch(
      () => state.searchKey,
      (searchValue) => {
        if (searchValue == '') {
          state.filteredBrandList = [];
        } else {
          searchBrand(searchValue);
        }
      }
    );

    const getBrands = async () => {
      state.isLoading = true;
      await store.dispatch('brand/getBrand');
      state.brandList = store.state.brand.brands;
      state.isLoading = false;
    };

    const searchBrand = (value: any) => {
      state.brandList.filter((brand: any) => {
        if (brand.name.match(value)) {
          state.filteredBrandList.push(brand);
        }
      });
    };

    const addBookmark = (id: string) => {
      const newBookmark = {
        id: id,
        bookmark: true,
      };
      store.dispatch('brand/editBrand', newBookmark);
      addNotify();
    };

    const addNotify = () => {
      $q.notify({
        position: 'top',
        message: 'Saved to Bookmark',
        color: 'secondary',
      });
    };

    onMounted(getBrands);

    return { state, addBookmark };
  },
});
</script>
