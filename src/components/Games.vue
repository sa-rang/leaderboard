

<template>
    <div class="games ">
        <h1 class="green">Add Game & Score</h1>
        <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
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
                    <el-option v-for="league in leagues" :key="league.id" :label="league.name"
                        :value="league.id + '__' + league.name" />
                </el-select>
            </el-form-item>
            <h3>Scores</h3>
            <div v-for="(eachItem, index ) in ruleForm.participants" key:index>
                <el-form-item :label="eachItem.name" required>
                    <el-form-item :prop="'participants.' + index + '.score'"
                        :rules="{ required: true, message: 'Please add score', trigger: 'change' }">
                        <el-input-number v-model="eachItem.score" :min="0" :max="100" style="width: 100%" />
                    </el-form-item>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    Save
                </el-button>
            </el-form-item>

        </el-form>

    </div>
</template>
  
<script setup>
import { onBeforeMount, onMounted, ref, reactive } from "vue"
import { collection, getDocs, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { ElNotification } from 'element-plus'

const props = defineProps({
    players: {
        type: Array,
        required: true,
        default: []
    },
    leagues: {
        type: Array,
        required: true,
        default: []
    }
})




const gamesDB = collection(db, "games");

const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = ref({
    name: '',
    date: '',
    league: null,
    participants: []
})

onBeforeMount(async () => {
    props.players.forEach((each) => {
        ruleForm.value.participants.push({ ...each, score: 0 })
    })

})

onMounted(async () => {

})

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            let payload = JSON.parse(JSON.stringify(ruleForm.value));
            let leagueData = payload.league.split("__")
            const docRef = addDoc(gamesDB, {
                name: payload.name,
                date: payload.date,
                leagueid: leagueData[0],
                leaguename: leagueData[1],
                participants: payload.participants

            });

            ElNotification({
                title: 'Success',
                message: 'Record Added',
                type: 'success',
            })
            ruleFormRef.value?.resetFields();
        } else {
            console.log('error submit!', fields)
        }
    })
}



</script>
  
<style scoped>
.games {}
</style>
  