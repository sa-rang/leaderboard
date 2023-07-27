

<template>
  <header class="mb-4 text-lg">
    <nav v-if="ifUser">
      <RouterLink to="/">Leader Board</RouterLink>
      <RouterLink to="/admin">Admin</RouterLink>
      <el-button @click="logoutUser" round type="danger">Logout</el-button>
    </nav>
  </header>
  <RouterView />
</template>


<script setup>
import { onBeforeMount, onMounted, computed } from "vue"
import { RouterLink, RouterView } from 'vue-router'
import { useGlobalStore } from '@/stores/global'


const GlobalStore = useGlobalStore()
const { fetchUser, logout } = GlobalStore

const ifUser = computed(() => GlobalStore.user)
onBeforeMount(() => {
  fetchUser();
})



const logoutUser = () => {

  logout();
}


</script>

<style scoped>
nav {
  width: 100%;

  text-align: center;

}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
