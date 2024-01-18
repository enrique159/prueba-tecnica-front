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
          <router-link class="link d-flex ga-1 align-center" to="/register">
            <icon-brand-zapier :size="18" />
            <span class="d-none d-sm-flex">Registrarme</span>
          </router-link>
        </div>
      </header>
    </v-container>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { IconBrandZapier } from '@tabler/icons-vue'
</script>

<style lang="scss" scoped>
.auth-module {
  width: 100%;
  height: 100dvh;

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
}
</style>