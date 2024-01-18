<template>
  <div>
    <h1>Home</h1>
    <v-btn @click="logout">
      Cerrar sesion
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const { signOut } = useAppStore();

const logout = () => {
  signOut();
  router.push({ name: 'SignIn' });
};
</script>

<style lang="scss" scoped>

</style>