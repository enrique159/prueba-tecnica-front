<template>
  <div class="auth-module">
    <v-container class="py-0">
      <header class="auth-header">
        <div class="d-flex align-center">
          <router-link to="/">
            <img src="@/assets/eugenia-logo.png" alt="Eugenia" srcset="">
          </router-link>

          <a class="link pl-10 d-none d-sm-flex" href="https://eugenia.ai/">Conócenos</a>
        </div>

        <div class="auth-header__links">
          <router-link v-if="currentRoute !== 'SignUp'" class="link d-flex ga-1 align-center" to="/login/register">
            <icon-brand-zapier :size="18" />
            <span class="d-none d-sm-flex">Registrarme</span>
          </router-link>

          <router-link v-else class="link d-flex ga-1 align-center" to="/login">
            <icon-login2 :size="18" />
            <span class="d-none d-sm-flex">Ingresar</span>
          </router-link>
        </div>
      </header>
    </v-container>

    <router-view />

    <v-footer class="bg-white auth-footer">
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="black"
          variant="text"
          class="mx-2"
          rounded="xl"
        >
          {{ link }}
        </v-btn>
        <v-col class="text-center mt-4" cols="12">
          <span class="text-body-2">{{ new Date().getFullYear() }} — <strong>Enrique Marín Hirales</strong></span>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script setup lang="ts">
import { IconBrandZapier, IconLogin2 } from '@tabler/icons-vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const currentRoute = computed(() => route.name)


const links = [
  'Inicio',
  'Conócenos',
  'Equipo',
  'Servicios',
  'Blog',
  'Contacto',
]
</script>

<style lang="scss" scoped>
.auth-module {
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .auth-header {
    width: 100%;
    height: fit-content;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 1.6rem;

    img {
      width: 100%;
      max-width: 112px;
    }

    .link {
      color: #282829;
      font-weight: 600;
      font-size: 0.9rem;
      text-decoration: none;
      transition: 0.1s ease-in-out;
      &:hover {
        transform: translateY(-1px);
      }
    }
  }

  .auth-footer {
    width: 100%;
    height: fit-content;
    max-height: 100px;
  }
}
</style>