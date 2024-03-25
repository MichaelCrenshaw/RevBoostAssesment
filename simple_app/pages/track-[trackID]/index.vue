<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {faChevronLeft, faChevronRight, faSpinner} from "@fortawesome/free-solid-svg-icons";
import type {Track} from "~/types/TADB/track";

const route = useRoute();
const { data, pending, error, refresh } = await useFetch<Track>(
    'https://www.theaudiodb.com/api/v1/json/2/track.php',
    {
      query: {
        h: route.params.trackID,
      },
      lazy: true,
      immediate: true,
      // @ts-ignore
      transform: (data: [Track]) => data.track[0],
    }
);

onMounted(() => {
  refresh();
})

watch(error, () => {
  setTimeout(() => {
    if (error.value) {
      refresh();
    }
  }, 2500);
});

const shownFields = ['strTrack', 'strAlbum', 'strGenre', 'strMood', 'strStyle', 'strTheme', 'strDescriptionEN', 'strMusicVid', 'intMusicVidViews', 'intMusicVidLikes', 'intMusicVidDislikes', 'intMusicVidComments', 'intTotalListeners', 'intTotalPlays'];
</script>

<template>
  <div v-if="pending || !data" class="relative w-2/5 mx-auto my-8 h-32">
    <span class="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <FontAwesomeIcon size="8x" :icon="faSpinner" pulse />
    </span>
  </div>
  <div v-else class="relative stats w-full my-8 h-42 left-1/2 transform -translate-x-1/2">
    <div class="stat">
      <div class="stat-figure">
        <h1 class="stat-title underline"><NuxtLink :to="`/album-${(data as Track)?.idAlbum}`">{{ (data as Track)?.strAlbum }}</NuxtLink></h1>
        <h2 class="stat-value text-primary">{{ (data as Track)?.strTrack }}</h2>
        <h3 class="stat-desc text-right mr-2">-{{ (data as Track)?.strArtist }}</h3>
      </div>
    </div>
    <div class="stat w-24">
      <div class="stat-figure text-primary h-full w-24">
        <img v-if="(data as Track)?.strTrackThumb" class="text-primary rounded-full h-24 s-24" :src="`${(data as Track)?.strTrackThumb}/preview`" alt="Artist Image" />
      </div>
    </div>
  </div>
  <span class="divider divider-vertical my-0 mb-6"></span>
  <span v-if="pending" class="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
    <FontAwesomeIcon size="8x" :icon="faSpinner" pulse />
  </span>
  <template v-else-if="data">
    <table class="table table-zebra table-lg mt-16">
      <tbody>
      <tr v-for="key in shownFields" :key="key">
        <template v-if="data[key]">
          <th>{{ key.replace(/(int)|(str)/, '') }}</th>
          <td>{{ data[key] }}</td>
        </template>
      </tr>
      </tbody>
    </table>
  </template>
  <div v-else>
    <p>Track not found.</p>
  </div>

</template>

<style scoped>

</style>