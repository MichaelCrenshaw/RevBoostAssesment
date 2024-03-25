<script setup lang="ts">
import type { Album } from "~/types/TADB/album";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const props = defineProps<{
  id: string;
}>();

const { data, pending, error, refresh } = useFetch<Album[]>(
    'https://www.theaudiodb.com/api/v1/json/2/album.php',
    {
      query: {
        i: props.id,
      },
      lazy: true,
      immediate: true,
      // @ts-ignore
      transform: (data: { album: Album[] }) => {
        // pick array from object
        let d = data.album
        // remove entries with no year
        d = d.filter((a: Album) => a.intYearReleased != 0);
        // sort by year
        d = d.sort((a: Album, b: Album) => (a.intYearReleased ?? 0) - (b.intYearReleased ?? 0));
        return d;
      },
    }
);

</script>

<template>
  <div v-if="pending || !data" class="relative w-2/5 mx-auto my-0 min-h-64 h-64 max-h-64">
    <span class="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <FontAwesomeIcon size="8x" :icon="faSpinner" pulse />
    </span>
  </div>
  <ul v-else class="timeline h-64 max-h-64 max-w-[100vw] overflow-x-scroll overflow-y-hidden slim-scrollbar">
    <template v-for="album in (data as Album[])" :key="album.idAlbum">
      <li class="timeline-item w-32 transform -translate-y-12">
        <hr class="w-32 bg-accent/75"/>
        <div class="timeline-start text-center w-42">{{ album.intYearReleased }}</div>
        <div class="timeline-middle h-24 w-24">
          <div class="avatar h-24 w-24">
            <NuxtLink :to="`/album-${album.idAlbum}`">
              <img :src="`${album.strAlbumThumb}/preview`" class="h-24 w-24 rounded-full" alt="" />
            </NuxtLink>
          </div>
        </div>
        <div class="timeline-end timeline-box text-center max-w-28 break-words">
          {{ album.strAlbum }}
        </div>
        <hr class="w-32 bg-accent/75"/>
      </li>
    </template>
  </ul>

</template>

<style scoped>
.slim-scrollbar {
  scrollbar-width: thin;
}
</style>