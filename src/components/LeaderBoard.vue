

<template>
    <div class="leader-board   flex flex-row gap-4 flex-wrap">
        <div v-for="eachGame in filteredGameData" :key="eachGame.id">
            <RankingCard :details="eachGame" />
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue"
import RankingCard from "./RankingCard.vue"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { ElNotification } from 'element-plus'
import { useGlobalStore } from '@/stores/global';


const props = defineProps({
    leagueid: {
        type: String,
        required: true,
        default: ""
    }
})

const GlobalStore = useGlobalStore()
const { getGamesByLeagueId } = GlobalStore;
const filteredGameData = ref([])

onMounted(() => {
    loadLeaderBoard(props.leagueid)
});

watch(() => props.leagueid, (first, second) => {
    loadLeaderBoard(first)
});

const loadLeaderBoard = (id) => {
    filteredGameData.value = getGamesByLeagueId(id);
}

</script>
  
<style scoped>
.leader-board {}
</style>
  