

<template>
    <div class="leader-board min-w-[270px]">
        <div class="flex flex-col border-gray-300 border bg-white divide-y rounded-lg flex-none w-full ">
            <div class="flex flex-col space-y-2 divide-y">
                <div class="flex flex-col p-3 relative">
                    <div class="flex flex-col mb-2">
                        <span class="font-bold text-lg">{{ details.name }}</span>
                    </div>
                    <div class="flex flex-col  absolute left-44 -top-1">
                        <el-badge :value="dateFormate(details.date)" type="primary">
                        </el-badge>
                    </div>
                    <div class="flex flex-col space-y-1">
                        <!-- :class="[{ 'bg-amber-200': index == 0 }, { 'bg-zinc-200': index == 1 }, { 'bg-red-200': index == 2 }]" -->
                        <div class="flex w-full border  rounded-md justify-between"
                            :class="[{ 'bg-amber-50': index % 2 == 0 }, { 'bg-zinc-50': index % 2 }]"
                            v-for="( eachPlayer, index ) in  sortRankings(details.participants)" :key="eachPlayer.id">
                            <span class="pl-2">{{ eachPlayer.name }}</span>
                            <div>

                                <!-- <el-icon v-if="index == 0" size="20px">
                                    <Trophy />
                                </el-icon>
                                <el-icon v-if="index == 1 || index == 2" size="20px">
                                    <Medal />
                                </el-icon> -->
                                <span class="text-lg font-medium px-2">{{ eachPlayer.score }}</span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>

    </div>
</template>
  
<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue"
import moment from 'moment';

import {
    Medal,
    Trophy
} from '@element-plus/icons-vue'



const props = defineProps({
    details: {
        type: Object,
        required: true,
        default: {}
    }
})

onMounted(() => {

});

const sortRankings = (playerList) => {
    return playerList.sort((a, b) => {
        return b.score - a.score
    });
}

const dateFormate = (iDate) => {
    return moment(iDate).format("DD-MMM-YYYY")
}


</script>
  
<style scoped>
.leader-board {}
</style>
  