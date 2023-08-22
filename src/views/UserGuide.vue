<template>
    <main class="user-guid">
        <h1 class="text-center text-2xl mb-5">User Guide </h1>
        <section class="flex gap-4 flex-wrap">
            <div class="border p-8 bg-cyan-50 w-[350px]">
                <div class="flex ml-3 items-center mb-3">
                    <el-image style="width: 64px; height: 64px" src="./img/quiz.png" fit="cover" />
                    <span class=" text-xl font-bold ml-4">Fun Games</span>
                </div>
                <div class="flex flex-col gap-3 ml-6 ">
                    <div class="flex ">
                        <span class="text-lg">Winner(s): 3</span>
                        <el-image style="width: 24px; height: 24px" src="./img/coin-24.png" fit="cover" />
                    </div>
                    <div class="flex ">
                        <span class="text-lg">Runner-up(s): 2</span>
                        <el-image style="width: 24px; height: 24px" src="./img/coin-24.png" fit="cover" />
                    </div>
                    <div class="flex ">
                        <span class="text-lg">Participants: 1</span>
                        <el-image style="width: 24px; height: 24px" src="./img/coin-24.png" fit="cover" />
                    </div>
                </div>
            </div>
            <div class="border p-4 bg-lime-100 w-[350px]">
                <div class="flex ml-3 items-center mb-3 mt-5">
                    <el-image style="width: 64px; height: 64px" src="./img/promotion.png" fit="cover" />
                    <span class=" text-xl font-bold ml-3">Shout Outs</span>
                </div>

                <div class="flex flex-col gap-3 ml-6 ">
                    <div class="flex items-center">
                        <el-image style="width: 64px; height: 64px" src="./img/C-64.png" fit="cover" />
                        <span class="text-lg ml-3">Certification: 3</span>
                        <el-image style="width: 24px; height: 24px" src="./img/coin-24.png" fit="cover" />
                    </div>
                    <div class="flex items-center">
                        <el-image style="width: 64px; height: 64px" src="./img/R-64.png" fit="cover" />
                        <span class="text-lg ml-3">Referral: 3</span>
                        <el-image style="width: 24px; height: 24px" src="./img/coin-24.png" fit="cover" />
                    </div>
                    <div class="flex items-center">
                        <el-image style="width: 64px; height: 64px" src="./img/A-64.png" fit="cover" />
                        <span class="text-lg ml-3">Anniversary: 2</span>
                        <el-image style="width: 24px; height: 24px" src="./img/coin-24.png" fit="cover" />
                    </div>
                    <div class="flex items-center">
                        <el-image style="width: 64px; height: 64px" src="./img/E-64.png" fit="cover" />
                        <span class="text-lg ml-3">Event Participation: 1</span>
                        <el-image style="width: 24px; height: 24px" src="./img/coin-24.png" fit="cover" />
                    </div>
                </div>
            </div>
            <div class="border p-8 bg-cyan-50 w-[350px]">
                <div class="flex ml-3 items-center mb-3">
                    <el-image style="width: 64px; height: 64px" src="./img/podium.png" fit="cover" />
                    <span class=" text-xl font-bold ml-4">Overall Ranking</span>
                </div>
                <div class="flex flex-col gap-3 ml-6 ">
                    <div class="flex ">
                        <span class="text-lg">is computed by all the accumulated coins in Fun Games & Shoutouts</span>
                    </div>

                </div>
            </div>
        </section>
        <section class="forms" v-if="ifUser">
            Admin

        </section>
    </main>
</template>

<script setup>

import { ref, computed } from 'vue'
import { useGlobalStore } from '@/stores/global'
const GlobalStore = useGlobalStore()

const ifUser = computed(() => GlobalStore.user)


</script>

<style scoped>
.user-guid {}
</style>