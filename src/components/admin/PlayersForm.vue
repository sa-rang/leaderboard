

<template>
  <div class="players bg-orange-100 p-3">

    <div class="flex ">
      <div class="bg-zinc-50 p-3 ">
        <h2 class=" mb-3 font-bold">{{ isEdit ? "Update Player" : "Add New Player" }}</h2>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
          :size="formSize" status-icon>
          <el-form-item label="Name" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="ruleForm.email" />
          </el-form-item>
          <el-form-item label="Player Active" prop="active">
            <el-switch v-model="ruleForm.active" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              Save
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="ml-4 p-3 w-1/4 ">
        <h2 class="mb-3 font-bold">All Players</h2>
        <div class="text-base flex justify-between bg-slate-100 mb-1 p-1 font-bold" v-for="player in playersList"
          :key="player.id">
          <div>{{ player.name }} {{ !player.active ? " (In-active)" : "" }}</div>
          <div>
            <el-button type="primary" size="small" :icon="Edit" circle @click="editPlayer(player)" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue"
import { ElNotification } from 'element-plus'
import { useDataApi } from "../../composables/data-api.js"
import { Edit } from '@element-plus/icons-vue'

const { playersList, loadPlayers, savePlayer, updatePlayer } = useDataApi();

const isEdit = ref(false)
const editPlayerId = ref("");
const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = ref({
  name: '',
  email: '',
  active: true
})

const rules = reactive({
  name: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { min: 3, max: 100, message: 'Length should be 3 to 20 character', trigger: 'blur' },
  ],
  email: [{ required: true, message: 'Please input Email', trigger: 'blur' },],
})

onBeforeMount(async () => {
  await loadPlayers();
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (isEdit.value) {
        console.log("updating")
        await updatePlayer(ruleForm.value, editPlayerId.value)
      } else {
        await savePlayer(ruleForm.value)
      }
      ElNotification({
        title: 'Success',
        message: 'Record Saved',
        type: 'success',
      })
      ruleFormRef.value?.resetFields();
      isEdit.value = false;
    } else {
      console.log('error submit!', fields)
    }
  })
}

const editPlayer = async (iData) => {
  isEdit.value = true;
  editPlayerId.value = iData.id;
  ruleForm.value = {
    name: iData.name,
    email: iData.email,
    active: iData.active
  };
}
</script>

<style scoped>
.player-list {}
</style>
