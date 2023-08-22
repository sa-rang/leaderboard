<template>
  <div class="admin bg-yellow-50 p-2">
    <div class="mb-8">
      <RouterLink class="router-link mx-3" to="/admin/manage-player">Manage Player</RouterLink>
      <RouterLink class=" router-link mx-3" to="/admin/manage-score">Manage Scores</RouterLink>
      <RouterLink class="router-link" to="/admin/manage-shoutout">Manage Shoutout</RouterLink>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue"

</script>

<style></style>
