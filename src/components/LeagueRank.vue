

<template>
    <div class="leader-board min-w-[280px]">
        <div class="flex flex-col border-gray-300 border bg-teal-900 text-white divide-y rounded-lg flex-none w-full ">
            <div class="flex flex-col space-y-2 divide-y">
                <div class="flex flex-col p-3 ">
                    <div class="flex items-center py-3">
                        <el-image style="width: 64px; height: 64px" src="./img/podium.png" fit="cover" />
                        <span class=" text-xl  ml-4">Overall Ranks</span>
                    </div>
                    <div class="flex flex-col space-y-1">
                        <div class="flex w-full border p-1 rounded-md justify-between items-center"
                            :class="[{ 'bg-amber-700': index == 0 }]" v-for="(eachPlayer, index) in leagueRankings"
                            :key="eachPlayer[0]">
                            <span class="pl-2">{{ eachPlayer[1].name }}</span>

                            <div class="flex items-center">
                                <span class="text-lg font-medium mr-1">{{ eachPlayer[1].score }}</span>
                                <el-image style="width: 24px; height: 24px" src="./img/coin-24.png" fit="cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useGlobalStore } from '@/stores/global';

const props = defineProps({
    leagueid: {
        type: String,
        required: true,
        default: ""
    }
})

const GlobalStore = useGlobalStore()
const { getRanksByLeagueId } = GlobalStore;
const leagueRankings = ref([])

onMounted(() => {
    loadLeaderBoard(props.leagueid)
});

watch(() => props.leagueid, (first, second) => {
    loadLeaderBoard(first)
});

const loadLeaderBoard = (id) => {
    leagueRankings.value = getRanksByLeagueId(id);
}

</script>
  
<style scoped>
.leader-board {}
</style>
  