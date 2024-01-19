<template>
  <nav class="nav-drawer" :class="{ 'nav-drawer__collapsed': !isHovered }">
    <div ref="drawMenuRef" class="nav-drawer-card">
      <div class="user-info mb-8">
        <div class="circle">
          <h4>{{ abreviation }}</h4>
        </div>
        <div class="user-info-data">
          <span class="name">{{ user?.name }} {{ user?.lastname }}</span>
          <span class="email">{{ user?.email }}</span>
        </div>
      </div>

      <v-divider></v-divider>

      <div class="options">
        <button
          class="options__button"
          :class="{ 'option-selected': currentPath == option.route }"
          v-for="(option, index) in options"
          :key="`options-${index}`"
        >
          <v-icon :icon="option.icon"></v-icon>
          <span>{{ option.text }}</span>
        </button>
      </div>

      <button class="logout-button" @click="logout">
        <v-icon :icon="IconLogout2"></v-icon>
        <span>Cerrar sesión</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { IconGiftCard, IconAtom2Filled, IconAutomaticGearbox, IconChartInfographic, IconSettings, IconLogout2 } from "@tabler/icons-vue";
import { ref, reactive, computed } from "vue";
import { useAppStore } from "@/stores/appStore";
import { useElementHover } from "@vueuse/core";
import { useRouter } from "vue-router";

const router = useRouter();
const currentPath = computed(() => router.currentRoute.value.name);

const drawMenuRef = ref();
const isHovered = useElementHover(drawMenuRef);

const { user, signOut } = useAppStore();

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

const abreviation = computed(() => {
  const name = user.name || "";
  const lastName = user.lastname || "";
  return `${name[0]}${lastName[0]}`;
});

const options = reactive([
  {
    icon: IconGiftCard,
    text: "Invitaciones",
    route: "Invitations",
  },
  {
    icon: IconAtom2Filled,
    text: "Participaciones",
    route: "Participations",
  },
  {
    icon: IconAutomaticGearbox,
    text: "Mis conexiones",
    route: "Conexions",
  },
  {
    icon: IconChartInfographic,
    text: "Estadísticas",
    route: "Statistics",
  },
  {
    icon: IconSettings,
    text: "Ajustes",
    route: "Settings",
  },
]);
</script>

<style lang="scss" scoped>
.nav-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100%;
  padding: 1rem;
  z-index: 1000;
  transition: 0.2s ease-in-out;

  &__collapsed {
    width: 112px;
    .options__button, .logout-button {
      span {
        opacity: 0;
      }
    }
  }
  .nav-drawer-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #fff;
    box-shadow: 0 0 2em #00000019;
    border-radius: 2rem;
    overflow-x: hidden;
    padding: 1rem;
    position: relative;
    .logout-button {
      position: absolute;
      bottom: 1rem;
      left: 0.9rem;
      width: 100%;
      max-width: 218px;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 0.7rem;
      border-radius: 1rem;
      margin-top: 0.5rem;
      background-color: transparent;
      transition: 0.2s ease-in-out;
      overflow-x: hidden;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover {
        background-color: #e91b6723;
      }

      i {
        margin-right: 1rem;
        font-size: 1.5rem;
        color: #5b6c7f;
      }

      span {
        margin-left: 0.6rem;
        font-size: 0.9rem;
        font-weight: 500;
        color: #313131;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        flex-wrap: nowrap;
      }
    }

    .options {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      width: 100%;

      &__button {
        width: 100%;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 0.7rem;
        border-radius: 1rem;
        margin-bottom: 0.5rem;
        background-color: transparent;
        transition: 0.2s ease-in-out;
        overflow-x: hidden;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
          background-color: #781be923;
        }

        i {
          margin-right: 1rem;
          font-size: 1.5rem;
          color: #5b6c7f;
        }

        span {
          margin-left: 0.6rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #313131;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          flex-wrap: nowrap;
        }
      }

      .option-selected {
        background-color: #781be923;
        i, span {
          color: #781be9;
        }
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      width: 100%;

      .circle {
        width: 3rem;
        min-width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: #00000019;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;

        h4 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #00000050;
        }
      }

      .user-info-data {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        span {
          color: #545454;
          margin: 0;
          // add elipsis to long text
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          flex-wrap: nowrap;
        }

        .name {
          font-size: 0.9rem;
          font-weight: 700;
          color: #000000;
        }
        .email {
          font-size: 0.8rem;
          font-weight: 400;
          color: #00000093;
        }
      }
    }
  }
}
</style>
