
<template>
  <div class="home-view p-2 ">
    <div class="p-2 text-center">
      <div v-if="leaguesList && leaguesList.length > 1">
        <p class="text-lg font-medium ">Years</p>
        <el-button :type="league.id == selectedLeagueId ? 'success' : 'default'" v-for="league in leaguesList"
          :key="league.id" @click="setLeague(league.id)">
          {{ league.name }}
        </el-button>
      </div>
    </div>
    <div v-if="selectedLeagueId" class="league-view  flex flex-col md:flex-row gap-x-2 justify-around">
      <div class=" md:w-2/4 lg:w-1/4  p-3">
        <LeagueRank :leagueid="selectedLeagueId" />

      </div>
      <div class=" md:w-2/4 lg:w-3/4  p-3">
        <LeaderBoard :leagueid="selectedLeagueId" />
      </div>
    </div>
    <div v-else class="league-view  flex flex-row gap-x-2 justify-around mt-48">

      <el-image style="width: 64px; height: 64px" src="./img/loading.webp" fit="cover" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed, onUnmounted, shallowRef } from "vue"
import LeaderBoard from "../components/LeaderBoard.vue"
import LeagueRank from "../components/LeagueRank.vue"

import { useGlobalStore } from '@/stores/global';

const GlobalStore = useGlobalStore()
const selectedLeagueId = ref(null);
const leaguesList = computed(() => GlobalStore.leagueData)
let myTimeout = null

onMounted(async () => {

  //load first year league by default in 2s
  const myTimeout = setTimeout(() => {
    if (leaguesList.value && leaguesList.value.length > 0) {
      setLeague(leaguesList.value[0].id)
    }
  }, 2000);
})
onUnmounted(() => {
  clearTimeout(myTimeout);
})

const setLeague = (id) => {
  selectedLeagueId.value = id;
}

</script>

<style></style>
