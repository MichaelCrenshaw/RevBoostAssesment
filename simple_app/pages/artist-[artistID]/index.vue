<script setup lang="ts">
import type {Artist} from "~/types/TADB/artist";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {faChevronLeft, faChevronRight, faSpinner} from "@fortawesome/free-solid-svg-icons";

const route = useRoute();
const { data, pending, error, refresh } = await useFetch<Artist>(
    'https://www.theaudiodb.com/api/v1/json/2/artist.php',
    {
      query: {
        i: route.params.artistID,
      },
      lazy: true,
      immediate: true,
      // @ts-ignore
      transform: (data: [Artist]) => data.artists[0],
    }
);

watch(error, () => {
  setTimeout(() => {
    if (error.value) {
      refresh();
    }
  }, 2500);
});

const shownFields = ['strArtist', 'strCountry', 'strGenre', 'strStyle', 'strWebsite', 'strFacebook', 'strBiographyEN', 'strArtistFanart', 'strArtistWideThumb', 'strArtistLogo', 'strArtistCutout', 'strArtistClearart', 'strArtistFanart2', 'strArtistFanart3', 'strArtistFanart4', 'strArtistBanner'];
const imageFields = ['strArtistFanart', 'strArtistWideThumb', 'strArtistLogo', 'strArtistCutout', 'strArtistClearart', 'strArtistFanart2', 'strArtistFanart3', 'strArtistFanart4', 'strArtistBanner'];
</script>

<template>
  <div v-if="pending || !data" class="relative w-2/5 mx-auto my-8 h-32">
    <span class="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <FontAwesomeIcon size="8x" :icon="faSpinner" pulse />
    </span>
  </div>
  <div v-else class="relative stats w-full my-8 h-32 left-1/2 transform -translate-x-1/2">
    <div class="stat">
      <div class="stat-figure">
        <h1 class="stat-title">{{ (data as Artist)?.strArtist }}</h1>
        <h2 class="stat-value text-primary">{{ (data as Artist)?.intFormedYear }}</h2>
        <h3 class="stat-desc text-right mr-2">-{{ (data as Artist)?.intDiedYear ?? 'current' }}</h3>
      </div>
    </div>
    <div class="stat w-24">
      <div class="stat-figure text-primary h-full w-24">
        <img v-if="(data as Artist)?.strArtistThumb" class="text-primary rounded-full h-24 s-24" :src="`${(data as Artist)?.strArtistThumb}/preview`" alt="Artist Image" />
      </div>
    </div>
  </div>
  <span class="divider divider-vertical my-0"></span>
  <DiscographyTimeline :id="route.params.artistID" />
  <span class="divider divider-vertical my-0 mb-6"></span>
  <div class="w-4/5 mx-auto flex justify-between">
    <NuxtLink :to="`/artist-${route.params.artistID - 1}`" class="btn btn-outline btn-primary"><FontAwesomeIcon :icon="faChevronLeft" /> Last Artist</NuxtLink>
    <NuxtLink to="/" class="btn btn-outline btn-primary">Back to Search</NuxtLink>
    <NuxtLink :to="`/artist-${route.params.artistID - -1}`" class="btn btn-outline btn-primary">Next Artist <FontAwesomeIcon :icon="faChevronRight" /></NuxtLink>
  </div>
  <span v-if="pending" class="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
    <FontAwesomeIcon size="8x" :icon="faSpinner" pulse />
  </span>
  <template v-else-if="data">
    <table class="table table-zebra table-lg mt-16">
      <tbody>
      <tr v-for="key in shownFields" :key="key">
        <template v-if="data[key]">
          <template v-if="imageFields.includes(key)">
            <th>{{ key.replace(/(int)|(str)/, '') }}</th>
            <td>
              <img :src="`${data[key]}/preview`" alt="Artist Image" />
            </td>
          </template>
          <template v-else>
            <th>{{ key.replace(/(int)|(str)/, '') }}</th>
            <td>{{ data[key] }}</td>
          </template>
        </template>
      </tr>
      </tbody>
    </table>
  </template>
  <div v-else>
    <p>Artist not found.</p>
  </div>

</template>

<style scoped>

</style>