

<template>
    <div class="border p-2 bg-cyan-50">
        <div class="flex ml-3 items-center mb-3">
            <el-image style="width: 64px; height: 64px" src="./img/quiz.png" fit="cover" />
            <span class=" text-xl font-bold ml-4">Fun Games</span>
        </div>
        <div class="  flex flex-row gap-4 flex-wrap">
            <div v-for="eachGame in filteredGameData" :key="eachGame.id">
                <ScoreCard :details="eachGame" />
            </div>
        </div>
    </div>
    <!-- <hr class="mt-5 border-slate-400" /> -->

    <div class="border p-2 bg-lime-100 mt-3">

        <div class="flex ml-3 items-center mb-3 mt-5">
            <el-image style="width: 64px; height: 64px" src="./img/promotion.png" fit="cover" />
            <span class=" text-xl font-bold ml-3">Shout Outs</span>
        </div>

        <div class="  flex flex-row gap-4 flex-wrap">
            <div v-for="eachShout in filteredShoutOutData" :key="eachShout.id">
                <ShoutOutCard :details="eachShout" />
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue"
import ScoreCard from "./ScoreCard.vue"
import ShoutOutCard from "./ShoutOutCard.vue"

import { useGlobalStore } from '@/stores/global';


const props = defineProps({
    leagueid: {
        type: String,
        required: true,
        default: ""
    }
})

const GlobalStore = useGlobalStore()
const { getGamesByLeagueId, getShoutOutsByLeagueId } = GlobalStore;
const filteredGameData = ref([]);
const filteredShoutOutData = ref([])

onMounted(() => {
    loadLeaderBoard(props.leagueid)
});

watch(() => props.leagueid, (first, second) => {
    loadLeaderBoard(first)
});

const loadLeaderBoard = (id) => {
    filteredGameData.value = getGamesByLeagueId(id);
    filteredShoutOutData.value = getShoutOutsByLeagueId(id);
}

</script>
  
<style scoped>
.leader-board {}
</style>
  