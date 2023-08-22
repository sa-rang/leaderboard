

<template>
    <div class="soutout-form  flex">
        <div class="max-w-xl">
            <h3>Add Shoutout</h3>
            <el-form ref="ruleFormRef" :model="ruleForm" label-width="140px" class="demo-ruleForm" :size="formSize"
                status-icon>
                <div class="border p-3 mb-1 ">
                    <div class="max-w-sm">
                        <el-form-item label="League" :prop="'league'"
                            :rules="{ required: true, message: 'Please select league', trigger: 'change' }">
                            <el-select v-model="ruleForm.league" placeholder="League">
                                <el-option v-for="league in leaguesList" :key="league.id" :label="league.name"
                                    :value="league.id + '__' + league.name" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Type" :prop="'shoutout'"
                            :rules="{ required: true, message: 'Please select type', trigger: 'change' }">
                            <el-select v-model="ruleForm.shoutout" placeholder="Type">
                                <el-option v-for="each in shoutOutTypeList" :key="each.id" :label="each.name"
                                    :value="each.id + '__' + each.name + '__' + each.code" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Date" prop="date"
                            :rules="[{ required: true, message: 'Please select date', trigger: 'blur' }]">
                            <el-date-picker v-model="ruleForm.date" type="date" placeholder="Pick a date"
                                style="width: 100%" />
                        </el-form-item>

                        <el-form-item label="Short Description" prop="desc"
                            :rules="[{ max: 100, message: 'Length should be max 100 character', trigger: 'blur' }]">
                            <el-input v-model="ruleForm.desc" />
                        </el-form-item>

                        <el-form-item label="Points" prop="score"
                            :rules="{ required: true, message: 'Please add Points', trigger: 'change' }">
                            <el-input-number v-model="ruleForm.score" :min="0" :max="10" style="width: 100%" />
                        </el-form-item>
                    </div>
                </div>
                <div class="border p-3 mb-1">
                    <div class="mb-3">Shout-Out For</div>
                    <div class="flex flex-wrap gap-y-3">
                        <el-button round v-for="player in playersList" @click.prevent="toggleParticipant(player)"
                            :type="ruleForm.player.id == player.id ? 'success' : ''" class="cursor-pointer">
                            {{ player.name }}
                        </el-button>
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
        <div class="max-w-2xl">
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <p class="mb-3">Shoutout List</p>
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
                                            Shout out
                                        </th>
                                        <th scope="col"
                                            class="text-sm font-medium text-gray-900 px-6 py-4 text-center w-52">
                                            League
                                        </th>
                                        <th scope="col"
                                            class="text-sm font-medium text-gray-900 px-6 py-4 text-center w-52">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="block max-h-[600px] overflow-y-auto">
                                    <tr class="border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                        v-for="each, index in shoutoutDataList" :key="each.id"
                                        :class="[{ 'bg-orange-50': index % 2 == 1 }, { 'bg-white': index % 2 == 0 }]">

                                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap w-52">
                                            {{ dateFormate(each.date) }}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap w-52">
                                            {{ each.player.name + " - " + each.shoutoutname }}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap w-52">
                                            {{ each.leaguename }}
                                        </td>
                                        <td class="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900 w-52">
                                            <el-button type="primary" size="small" :icon="Edit" circle
                                                @click="editShoutout(each)" />
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
import { useDataApi } from "../../composables/data-api.js"
import { ElNotification } from 'element-plus'
import { useGlobalStore } from '@/stores/global'
import moment from 'moment';
import { Edit, Delete, InfoFilled } from '@element-plus/icons-vue'

const { playersList, loadPlayers, leaguesList, loadLeagues, shoutOutTypeList, loadShoutOutTypes, saveShoutOut, updateShoutoutData, deleteShoutoutData } = useDataApi();
const GlobalStore = useGlobalStore()
const shoutoutDataList = computed(() => GlobalStore.shoutOutData)

const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = ref({
    desc: '',
    date: '',
    league: null,
    score: 0,
    shoutout: null,
    player: { id: null },

})

const isEdit = ref(false);
const editShoutoutId = ref("");

onBeforeMount(async () => {
    if (!playersList.value) {
        await loadPlayers();
    }

    if (!leaguesList.value) {
        await loadLeagues()
    }

    if (!shoutOutTypeList.value) {
        await loadShoutOutTypes()
    }
})

onMounted(async () => {

})

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            if (ruleForm.value.player.id) {
                if (isEdit.value) {
                    await updateShoutoutData(ruleForm.value, editShoutoutId.value);
                } else {
                    await saveShoutOut(ruleForm.value);

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
                    message: 'Select Participant',
                    type: 'error',
                })
            }

        } else {
            console.log('error submit!', fields)
        }
    })
}


const toggleParticipant = (iPlayer) => {
    ruleForm.value.player = iPlayer
}

const dateFormate = (iDate) => {
    return moment(iDate).format("DD-MMM-YY")
}

const editShoutout = (iShoutout) => {
    isEdit.value = true;
    editShoutoutId.value = iShoutout.id;


    ruleForm.value = {
        desc: iShoutout.desc,
        date: iShoutout.date,
        league: iShoutout.leagueid + '__' + iShoutout.leaguename,
        score: iShoutout.score,
        shoutout: iShoutout.shoutoutid + '__' + iShoutout.shoutoutname + '__' + iShoutout.shoutoutcode,
        player: iShoutout.player

    }

}

const resetForm = () => {
    isEdit.value = false;
    editShoutoutId.value = "";
    ruleFormRef.value?.resetFields();
    ruleForm.value.player = { id: null };
}

const deleteRecord = async (iData) => {
    await deleteShoutoutData(iData.id);
    ElNotification({
        title: 'Success',
        message: 'Record Deleted',
        type: 'success',
    })
}

</script>
  
<style scoped>
.soutout-form {}
</style>
  