
<template>
  <div class="home-view p-2 ">
    <div class="p-2 text-center">
      <p class="text-lg font-medium ">Leagues</p>
      <el-button :type="league.id == selectedLeagueId ? 'success' : 'default'" v-for="league in leaguesList"
        :key="league.id" @click="setLeague(league.id)">
        {{ league.name }}
      </el-button>
    </div>
    <div v-if="selectedLeagueId" class="league-view  flex flex-col md:flex-row gap-x-2 justify-around">
      <div class=" md:w-2/4 lg:w-1/4  p-3">
        <LeagueRank :leagueid="selectedLeagueId" />

      </div>
      <div class=" md:w-2/4 lg:w-3/4 bg-orange-100 p-3">
        <p class=" text-lg font-medium mb-3">Game Scores</p>
        <LeaderBoard :leagueid="selectedLeagueId" />
      </div>
    </div>
    <!-- <div v-else="selectedLeagueId" class="league-view  flex flex-row gap-x-2 justify-around">
      Select League to load Leader Board
    </div> -->
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from "vue"

import LeaderBoard from "../components/LeaderBoard.vue"
import LeagueRank from "../components/LeagueRank.vue"

import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useGlobalStore } from '@/stores/global';
const GlobalStore = useGlobalStore()
const { setLeagueData, setGamesData } = GlobalStore
const selectedLeagueId = ref(null);
const leaguesList = computed(() => GlobalStore.leagueData)


const gamesDB = collection(db, "games");
const leaguesDB = collection(db, "leagues");

onMounted(async () => {
  // get all leagues
  const querySnapshot = await getDocs(leaguesDB);
  let leagues = [];
  querySnapshot.forEach((doc) => {
    const league = {
      id: doc.id,
      name: doc.data().name,
      active: doc.data().active,
    }
    leagues.push(league)
  });
  setLeagueData(leagues)


  //get all games data across league real-time
  const unsubscribe = onSnapshot(gamesDB, (querySnapshot) => {
    let games = [];
    querySnapshot.forEach((doc) => {
      const game = {
        id: doc.id,
        name: doc.data().name,
        date: doc.data().date,
        leaguename: doc.data().leaguename,
        leagueid: doc.data().leagueid,
        participants: doc.data().participants
      }
      games.push(game)
    });
    setGamesData(games)
    loadInitialLeague();
  });


  const loadInitialLeague = () => {
    if (leaguesList.value) {
      setLeague(leaguesList.value[0].id)
    }
  }
})



const setLeague = (id) => {
  selectedLeagueId.value = id;
}


</script>

<style>
@media (min-width: 1024px) {
  .home-view {}
}
</style>
