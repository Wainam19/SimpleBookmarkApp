<template>
  <div class="q-pa-md">
    <div class="row">
      <div
        class="col-4 q-pa-md"
        v-for="bookmark in state.bookmarkList"
        :key="bookmark.id"
      >
        <q-card>
          <q-card-section class="q-pa-sm">
            <q-item>
              <q-item-section>{{ bookmark.name }}</q-item-section>
              <q-item-section avatar>
                <q-btn
                  flat
                  round
                  color="accent"
                  icon="bookmark_remove"
                  @click="deleteBookmark(bookmark.id)"
                />
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import { defineComponent, onMounted, reactive } from 'vue';

export default defineComponent({
  name: 'BookmarkPage',
  setup() {
    const $q = useQuasar();
    const store = useStore();

    let state = reactive({
      bookmarkList: [] as any,
    });

    const getBookmarks = () => {
      store.state.brand.bookmarkList.forEach((element: any) => {
        state.bookmarkList.push(element);
      });
    };

    const deleteBookmark = (id: string) => {
      const body = {
        id: id,
        bookmark: false,
      };
      store.dispatch('brand/removeBookmark', body);
      removeNotify();
      state.bookmarkList = [];
      getBookmarks();
    };

    const removeNotify = () => {
      $q.notify({
        position: 'top',
        message: 'Removed from Bookmark',
        color: 'secondary',
      });
    };

    onMounted(getBookmarks);

    return { state, deleteBookmark };
  },
});
</script>
