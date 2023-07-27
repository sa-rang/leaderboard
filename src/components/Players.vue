

<template>
  <div class="players bg-orange-100 p-3">
    <h1 class="green font-bold">All Players</h1>
    <div class="p-3">
      <div class="text-lg font-bold" v-for="player in players" :key="player.id">{{ player.name }}</div>
    </div>
    <div class="bg-zinc-50 p-3 ">
      <span class="green font-bold">Add New Player</span>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
        :size="formSize" status-icon>
        <el-form-item label="Name" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Add
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { ElNotification } from 'element-plus'

defineProps({
  players: {
    type: Array,
    required: true,
    default: []
  }
})

const playersDB = collection(db, "players");

const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = ref({
  name: '',
})

const rules = reactive({
  name: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { min: 3, max: 100, message: 'Length should be 3 to 20 character', trigger: 'blur' },
  ],
})


const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      let payload = JSON.parse(JSON.stringify(ruleForm.value));
      const docRef = addDoc(playersDB, {
        name: payload.name,
        active: true
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
.player-list {}
</style>
