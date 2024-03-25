<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {faMagnifyingGlass, faSpinner} from "@fortawesome/free-solid-svg-icons";
import type {Album} from "~/types/TADB/album";
import type {Track} from "~/types/TADB/track";

const route = useRoute();
const { data: albumData, pending: albumPending } = await useFetch<Album>(
    'https://www.theaudiodb.com/api/v1/json/2/album.php',
    {
      query: {
        m: route.params.albumID,
      },
      lazy: true,
      immediate: true,
      // @ts-ignore
      transform: (data: [Album]) => data.album[0],
    }
);


const { data: tracksData, pending: tracksPending } = await useFetch<Track[]>(
    'https://www.theaudiodb.com/api/v1/json/2/track.php',
    {
      query: {
        m: route.params.albumID,
      },
      lazy: true,
      immediate: true,
      // @ts-ignore
      transform: (data: { tracks: Track[] }) => data.track,
    }
);

function routeToTrack(trackID: number) {
  navigateTo(`/track-${trackID}`);
}

function formatMilliseconds(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
}
</script>

<template>
  <div v-if="albumPending || !albumData" class="relative w-2/5 mx-auto my-8 h-32">
    <span class="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <FontAwesomeIcon size="8x" :icon="faSpinner" pulse />
    </span>
  </div>
  <div v-else class="relative stats w-full my-8 h-32 left-1/2 transform -translate-x-1/2">
    <div class="stat">
      <div class="stat-figure">
        <h1 class="stat-title">{{ (albumData as Album)?.intYearReleased }}</h1>
        <h2 class="stat-value text-primary">{{ (albumData as Album)?.strAlbum }}</h2>
        <h3 class="stat-desc text-right underline"><NuxtLink :to="`/artist-${(albumData as Album)?.idArtist}`">-{{ (albumData as Album)?.strArtist }}</NuxtLink></h3>
      </div>
    </div>
    <div class="stat w-24">
      <div class="stat-figure text-primary h-full w-24">
        <img v-if="(albumData as Album)?.strAlbumThumb" class="text-primary rounded-full h-24 s-24" :src="`${(albumData as Album)?.strAlbumThumb}/preview`" alt="Artist Image" />
      </div>
    </div>
  </div>
  <span v-if="tracksPending" class="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
    <FontAwesomeIcon size="8x" :icon="faSpinner" pulse />
  </span>
  <template v-else-if="tracksData">
    <table class="table table-zebra table-pin-rows table-lg mt-16">
      <thead>
      <tr>
        <th>Track</th>
        <th>Genre</th>
        <th>Duration</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="track in tracksData as Track[]" :key="track.idTrack" @click="() => routeToTrack(track.idTrack)" class="hover:cursor-pointer">
        <td>{{ track.strTrack }}</td>
        <td>{{ track.strGenre }}</td>
        <td>{{ formatMilliseconds(track.intDuration) }}</td>
        <td><FontAwesomeIcon :icon="faMagnifyingGlass" /></td>
      </tr>
      </tbody>
    </table>
  </template>
  <div v-else>
    <p>Album not found.</p>
  </div>

</template>

<style scoped>

</style>