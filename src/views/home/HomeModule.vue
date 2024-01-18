<template>
  <div>
    <h1>Home</h1>
    <v-btn @click="logout" :loading="loading">
      Cerrar sesion
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const { signOut } = useAppStore();
const loading = ref(false);


const logout = async() => {
  loading.value = true;
  await signOut()
    .then(() => {
      console.log('Sesion cerrada');
      router.push({ name: 'SignIn' });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style lang="scss" scoped>

</style>