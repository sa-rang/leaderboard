

<template>
    <div class="leader-board w-[200px] h-full">
        <div class="flex flex-col border-gray-300 border bg-white divide-y rounded-lg flex-none w-full h-full">
            <div class="flex flex-col space-y-2 divide-y">
                <div class="flex flex-col p-3 relative">
                    <div class="flex flex-col  absolute left-[110px] -top-1">
                        <el-badge :value="dateFormate(details.date)" type="primary">
                        </el-badge>
                    </div>
                    <div class="flex flex-col items-center  space-y-1">
                        <el-image style="width: 64px; height: 64px" :src="'./img/' + details.shoutoutcode + '-64.png'"
                            fit="cover" />
                    </div>

                    <div class="flex flex-row mb-2 justify-between">
                        <span class="font-bold text-base">{{ details.player.name }}</span>
                        <div class="flex ">
                            <span class="font-bold text-base">{{ details.score }}</span>
                            <el-image style="width: 24px; height: 24px" src="./img/coin-24.png" fit="cover" />
                        </div>
                    </div>
                    <div class="flex flex-col mb-2">
                        <span class="text-xs italic">{{ details.desc }}</span>
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

const dateFormate = (iDate) => {
    return moment(iDate).format("DD-MMM-YYYY")
}


</script>
  
<style scoped>
.leader-board {}
</style>
  