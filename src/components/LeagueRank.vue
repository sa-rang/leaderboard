

<template>
    <div class="leader-board min-w-[280px]">
        <div class="flex flex-col border-gray-300 border bg-teal-900 text-white divide-y rounded-lg flex-none w-full ">
            <div class="flex flex-col space-y-2 divide-y">
                <div class="flex flex-col p-3 ">
                    <div class="flex flex-col py-3">
                        <span class="font-bold text-lg">League Rankings</span>
                    </div>
                    <div class="flex flex-col space-y-1">
                        <div class="flex w-full border p-1 rounded-md justify-between"
                            :class="[{ 'bg-amber-700': index == 0 }, { 'bg-zinc-700': index == 1 }, { 'bg-red-400': index == 2 }]"
                            v-for="(eachPlayer, index) in leagueRankings" :key="eachPlayer[0]">
                            <span class="pl-2">{{ eachPlayer[1].name }}</span>
                            <div>
                                <el-icon v-if="index == 0" size="20px">
                                    <Trophy />
                                </el-icon>
                                <el-icon v-if="index == 1 || index == 2" size="20px">
                                    <Medal />
                                </el-icon>
                                <span class="text-lg font-medium px-2">{{ eachPlayer[1].score }}</span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>

    </div>
</template>
  
<script setup>
import { ref, onMounted, computed, watch } from "vue"
import { useGlobalStore } from '@/stores/global';
import {
    Medal,
    Trophy
} from '@element-plus/icons-vue'



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
  