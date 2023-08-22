

<template>
    <div class="score-form  flex">
        <div class="max-w-xl ">
            <h2 class=" mb-3 font-bold">{{ isEdit ? "Update Game" : "Add New Game" }}</h2>
            <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm" :size="formSize"
                status-icon>
                <div class="border p-3 mb-1">
                    <el-form-item label="Game Title" prop="name" :rules="[{ required: true, message: 'Please input game title', trigger: 'blur' },
                    { min: 3, max: 100, message: 'Length should be 3 to 20 character', trigger: 'blur' }]">
                        <el-input v-model="ruleForm.name" />
                    </el-form-item>

                    <el-form-item label="Date" prop="date"
                        :rules="[{ required: true, message: 'Please select date', trigger: 'blur' }]">
                        <el-date-picker v-model="ruleForm.date" type="date" placeholder="Pick a date" style="width: 100%" />
                    </el-form-item>

                    <el-form-item label="League" :prop="'league'"
                        :rules="{ required: true, message: 'Please select league', trigger: 'change' }">
                        <el-select v-model="ruleForm.league" placeholder="League">
                            <el-option v-for="league in leaguesList" :key="league.id" :label="league.name"
                                :value="league.id + '__' + league.name" />
                        </el-select>
                    </el-form-item>
                </div>
                <div class="border p-3 mb-1">
                    <div class="mb-3">Participants</div>
                    <div class="flex flex-wrap gap-y-3">
                        <el-button round v-for="player in playersList" @click.prevent="toggleParticipant(player)"
                            :type="participantPool.indexOf(player.id) == -1 ? '' : 'success'" class="cursor-pointer">
                            {{ player.name }}
                        </el-button>
                    </div>
                </div>
                <div class="border p-3 mb-2 ">
                    <div class="mb-1">Scores </div>
                    <div class="mb-5 italic text-sm">
                        Point is <el-image style="width: 24px; height: 24px" src="../img/coin-24.png" fit="cover" /> earned.
                        |
                        Activate slider to declare winner(s)
                    </div>
                    <div v-for="(eachItem, index ) in ruleForm.participants" key:index>
                        <el-form-item :label="eachItem.name" required>
                            <el-form-item :prop="'participants.' + index + '.score'"
                                :rules="{ required: true, message: 'Please add score', trigger: 'change' }">
                                <el-input-number v-model="eachItem.score" :min="0" :max="10" style="width: 100%" />
                            </el-form-item>
                            <el-form-item :prop="'participants.' + index + '.isWinner'">
                                <el-switch v-model="eachItem.isWinner" class="ml-5" />
                            </el-form-item>
                        </el-form-item>
                    </div>

                </div>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        {{ isEdit ? "Update" : "Save" }}
                    </el-button>
                    <el-button type="primary" @click.prevent="resetForm()">
                        {{ isEdit ? "Cancel" : "Reset" }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="max-w-xl">
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <h2 class=" mb-3 font-bold">Games List</h2>
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="bg-gray-200 border-b block">
                                    <tr>
                                        <th scope="col"
                                            class="text-sm font-medium text-gray-900 px-6 py-4 text-center w-52">
                                            Date
                                        </th>
                                        <th scope="col"
                                            class="text-sm font-medium text-gray-900 px-6 py-4 text-center w-52">
                                            Game
                                        </th>
                                        <th scope="col"
                                            class="text-sm font-medium text-gray-900 px-6 py-4 text-center w-52">
                                            League
                                        </th>
                                        <th scope="col"
                                            class="text-sm font-medium text-gray-900 px-6 py-4 text-center w-52">
                                            Edit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="block max-h-[600px] overflow-y-auto">
                                    <tr class="border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                        v-for="each, index in gamesDataList" :key="each.id"
                                        :class="[{ 'bg-orange-50': index % 2 == 1 }, { 'bg-white': index % 2 == 0 }]">

                                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap w-52">
                                            {{ dateFormate(each.date) }}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap w-52">
                                            {{ each.name }}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap w-52">
                                            {{ each.leaguename }}
                                        </td>
                                        <td class="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900 w-52">
                                            <el-button type="primary" size="small" :icon="Edit" circle
                                                @click="editGame(each)" />
                                            <el-popconfirm confirm-button-text="Yes" cancel-button-text="No"
                                                :icon="InfoFilled" icon-color="#626AEF" title="Are you sure to delete this?"
                                                @confirm="deleteRecord(each)">
                                                <template #reference>
                                                    <el-button type="danger" size="small" :icon="Delete" circle />
                                                </template>
                                            </el-popconfirm>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { onBeforeMount, onMounted, ref, computed } from "vue"
import { collection, getDocs, onSnapshot, addDoc } from "firebase/firestore";
import { useDataApi } from "../../composables/data-api.js"
import { db } from "@/firebase";
import { ElNotification } from 'element-plus'
import { useGlobalStore } from '@/stores/global'
import moment from 'moment';
import { Edit, Delete, InfoFilled } from '@element-plus/icons-vue'

const { playersList, loadPlayers, leaguesList, loadLeagues, saveGameScore, updateGameData, deleteGameData } = useDataApi();
const GlobalStore = useGlobalStore()
const gamesDataList = computed(() => GlobalStore.gamesData)


const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = ref({
    name: '',
    date: '',
    league: null,
    participants: []
})
const isEdit = ref(false);
const editGameId = ref("");

onBeforeMount(async () => {
    if (!playersList.value) {
        await loadPlayers();
    }

    if (!leaguesList.value) {
        await loadLeagues()
    }
})

onMounted(async () => {

})



const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            if (ruleForm.value.participants.length) {
                if (isEdit.value) {
                    await updateGameData(ruleForm.value, editGameId.value);
                } else {
                    await saveGameScore(ruleForm.value);
                }


                ElNotification({
                    title: 'Success',
                    message: 'Record Saved',
                    type: 'success',
                })
                resetForm();
            } else {
                ElNotification({
                    title: 'Error',
                    message: 'Select Participants',
                    type: 'error',
                })
            }

        } else {
            console.log('error submit!', fields)
        }
    })
}

const participantPool = ref([])
const toggleParticipant = (iPlayer) => {

    let participantIndex = participantPool.value.indexOf(iPlayer.id)
    if (participantIndex == -1) {
        participantPool.value.push(iPlayer.id)
        ruleForm.value.participants.push({ ...iPlayer, score: 0, isWinner: false })
    } else {
        const indexToRemove = ruleForm.value.participants.findIndex((obj) => obj.id === iPlayer.id);
        if (indexToRemove > -1) {
            participantPool.value.splice(participantIndex, 1);
            ruleForm.value.participants.splice(indexToRemove, 1);
        }

    }
}

const dateFormate = (iDate) => {
    return moment(iDate).format("DD-MMM-YYYY")
}

const editGame = (iGame) => {
    isEdit.value = true;
    editGameId.value = iGame.id;
    ruleForm.value = {
        name: iGame.name,
        date: iGame.date,
        league: iGame.leagueid + '__' + iGame.leaguename,
        participants: iGame.participants
    }
    participantPool.value = iGame.participants.map((e) => e.id)
}

const resetForm = () => {
    isEdit.value = false;
    editGameId.value = "";
    ruleFormRef.value?.resetFields();
    ruleForm.value.participants = [];
    participantPool.value = []
}

const deleteRecord = async (iData) => {
    await deleteGameData(iData.id);
    ElNotification({
        title: 'Success',
        message: 'Record Deleted',
        type: 'success',
    })
}


</script>
  
<style scoped>
.score-form {}
</style>
  