

<template>
  <header class="flex mb-4 text-lg justify-between">
    <div class="flex">
      <RouterLink class="router-link" to="/"><el-image style="height: 32px" src="./img/logo.jpg" />
      </RouterLink>
      <h1 class="min-w-fit pl-3">HR Engagement Portal</h1>
    </div>

    <nav v-if="ifUser">
      <RouterLink class="router-link" to="/">Leader Board</RouterLink>
      <RouterLink class="router-link" to="/admin">Admin</RouterLink>
      <el-button @click="logoutUser" round type="danger">Logout</el-button>
    </nav>
    <div>
      <RouterLink class="router-link" to="/user-guide">
        <el-image style="width: 32px" src="./img/help.png" />
      </RouterLink>
    </div>
  </header>
  <RouterView />
</template>


<script setup>
import { onBeforeMount, onMounted, computed } from "vue"
import { RouterLink, RouterView } from 'vue-router'
import { useGlobalStore } from '@/stores/global'
import { useDataApi } from "./composables/data-api.js"

const { loadLeagues, loadAllGameData, loadAllShoutOutData } = useDataApi();

const GlobalStore = useGlobalStore()

const { fetchUser, logout } = GlobalStore

const ifUser = computed(() => GlobalStore.user)
onBeforeMount(async () => {
  fetchUser();
  await loadLeagues();
  await loadAllGameData();
  await loadAllShoutOutData();

})

const logoutUser = () => {
  logout();
}

</script>

<style >
nav {

  text-align: center;

}

a.router-link-active {
  color: var(--color-text);
}

a.router-link-active:hover {
  background-color: transparent;
}

a.router-link {

  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

a.router-link:first-of-type {
  border: 0;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #bebebe;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #8e8e8e;
}
</style>
