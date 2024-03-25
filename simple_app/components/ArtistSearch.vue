<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import type {Artist} from "~/types/TADB/artist";

const artistName = ref<string>('Coldplay');

const { data, pending, refresh } = await useAsyncData<Artist[]>(
    'search_artist',
    () => $fetch('https://www.theaudiodb.com/api/v1/json/2/search.php', {
      query: {
        s: artistName.value.toLowerCase(),
      },
    }),
    {
      lazy: true,
      immediate: true,
      // @ts-ignore
      transform: (response: { artists: Artist[] }) => response.artists,
    }
);

function handleSubmit() {
  refresh();
}

const router = useRouter();
async function routeToArtist(artistID: string) {
  await router.push(`/artist-${artistID}`);
}
</script>

<template>
  <div class="card m-auto border-box bg-base-200 border border-2 border-accent/50 w-fit h-fit px-8 py-4">
    <h1 class="text-2xl text-center">Search Artists</h1>
    <span class="divider divider-vertical mt-0 mb-8"></span>
    <div class="join w-64 rounded-l-md">
      <LabeledInput label="Artist Name" class="join-item" v-model="artistName" @keydown.enter="handleSubmit" />
      <button class="btn btn-primary join-item" @click="handleSubmit">Search</button>
    </div>
  </div>
  <template>
    <FontAwesomeIcon v-if="pending" size="6x" class="inline-block" :icon="faSpinner" pulse />
    <table v-else class="table table-zebra table-pin-rows table-lg mt-16">
      <thead>
        <tr>
          <th>Image</th>
          <th>Artist Name</th>
          <th>Location</th>
          <th>Style</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="artist in (data as Artist[])" :key="artist.idArtist" class="hover:cursor-pointer" @click="routeToArtist(artist.idArtist.toString())">
          <td class="p-0 mx-auto"><img class="m-0 p-0 object-scale-down max-w-16" :src="`${artist.strArtistThumb}/preview`" :alt="artist.strArtist" /></td>
          <td>{{ artist.strArtist }}</td>
          <td>{{ artist.strCountry }}</td>
          <td>{{ artist.strStyle }}</td>
          <td><FontAwesomeIcon :icon="faMagnifyingGlass" /></td>
        </tr>
      </tbody>
    </table>
  </template>
</template>

<style scoped>
</style>