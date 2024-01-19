<template>
  <div class="home-module">
    <MainDrawer />
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script setup lang="ts">
import MainDrawer from '@/components/MainDrawer/MainDrawer.vue'
</script>

<style lang="scss" scoped>
.home-module {
  width: 100%;
  height: 100dvh;
  display: flex;
  padding-left: 112px;
  background-color: #faf9f9;
} 
</style>