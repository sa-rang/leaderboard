<template>
  <div class="admin bg-yellow-50 p-2 flex flex-row justify-around">

    <Players v-if="playersList" class="w-1/3" :players="playersList" />


    <div class="w-2/3 max-w-md bg-orange-100  p-3">
      <div class="flex justify-end">
        <el-button v-if="showGameForm" type="danger" :icon="Delete" circle @click="showGameForm = !showGameForm" />

        <el-button v-if="!showGameForm" type="primary" round @click="showGameForm = !showGameForm">
          Add Game & Score
        </el-button>
      </div>
      <Games v-if="showGameForm && playersList" :players="playersList" :leagues="leaguesList" />
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue"
import Players from "../components/Players.vue"
import Games from "../components/Games.vue"
import {

  Delete,

} from '@element-plus/icons-vue'

import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "@/firebase";


const playersList = ref(null);
const leaguesList = ref(null);
const showGameForm = ref(false);
const playersDB = collection(db, "players");
const leaguesDB = collection(db, "leagues");
onMounted(async () => {

  // get all leagues
  const querySnapshot = await getDocs(leaguesDB);
  let leagues = [];
  querySnapshot.forEach((doc) => {
    const league = {
      id: doc.id,
      name: doc.data().name,
      active: doc.data().active
    }
    leagues.push(league)
  });
  leaguesList.value = leagues

  //get all players real-time
  const unsubscribe = onSnapshot(playersDB, (querySnapshot) => {
    let players = [];
    querySnapshot.forEach((doc) => {
      const player = {
        id: doc.id,
        name: doc.data().name,
        active: doc.data().active
      }
      players.push(player)
    });
    playersList.value = players.sort((a, b) => a.name > b.name ? 1 : -1)

  });
})
</script>

<style>
@media (min-width: 1024px) {
  .admin {}
}
</style>
