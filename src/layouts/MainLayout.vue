<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Simple Bookmark App </q-toolbar-title>

        <q-btn v-if="$q.platform.is.desktop" flat no-caps to="/" class="q-mr-md"
          >Home</q-btn
        >

        <q-separator
          v-if="$q.platform.is.desktop"
          color="light-blue"
          size="3px"
          vertical
          inset
        />

        <q-btn v-if="$q.platform.is.desktop" flat no-caps to="bookmark"
          >Your Bookmarks</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <div class="row items-center">
          <div class="col-10">
            <q-item-label header> Simple Bookmark App </q-item-label>
          </div>
          <div class="col-2">
            <q-btn flat icon="clear" @click="closeDrawer(false)" />
          </div>
        </div>

        <EssentialLink
          v-for="link in state.linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'MainLayout',

  components: { EssentialLink },

  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);

    let state = reactive({
      linksList: [
        {
          title: 'Home',
          icon: 'home',
          link: '/',
        },
        {
          title: 'Bookmark',
          icon: 'bookmarks',
          link: 'bookmark',
        },
      ],
    });

    const closeDrawer = () => {
      leftDrawerOpen.value = false;
    };

    return {
      $q,
      state,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      closeDrawer,
    };
  },
});
</script>
