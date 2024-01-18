<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { useNotifications } from './composables/useNotifications';

const { snack } = useNotifications();
</script>

<template>
  <v-app class="app-container">
    <router-view></router-view>

    <v-snackbar 
      v-model="snack.show" 
      :text="snack.message" 
      :timeout="snack.duration" 
      :color="snack.color"
    >
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snack.show = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<style scoped>
.app-container {
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
