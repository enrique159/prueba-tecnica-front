<template>
  <div class="invitations-view">
    <v-container class="pt-12 h-100">
      <header class="w-100 d-flex justify-space-between align-center mb-8">
        <h1>Mis invitaciones</h1>
        <v-btn color="primary" variant="tonal" :prepend-icon="IconCirclePlus" @click="newInvitation">
          Nueva invitación
        </v-btn>
      </header>
      
      <!-- META PAGINATION -->
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model.lazy="search"
            label="Buscar"
            :prepend-inner-icon="IconSearch"
            outlined
            hide-details
            @keyup="startTimerSearch()"
            @keydown="stopTimerSearch()"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="px-4">
        <div class="invitations-container" v-if="!loading">
          <invitation-card v-for="(invitation, index) in invitations" :key="index" :invitation="invitation" />
        </div>
        <div class="invitations-loading" v-else>
          <v-progress-circular indeterminate color="primary" size="64" />
        </div>
      </v-row>

      <v-row v-if="!loading">
        <div class="w-100 d-flex justify-end py-6 px-4">
          <paginator
            :limit="limit"
            :total-items="totalItems"
            :total-pages="totalPages"
            :current-page="page"
            @update:limit="changeLimit($event)"
            @update:current-page="changePage($event)"
          />
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import Paginator from "@/components/Paginator/Paginator.vue";
import InvitationCard from "../components/InvitationCard.vue";
import { IconCirclePlus, IconSearch } from "@tabler/icons-vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/stores/appStore";
import { Invitation } from "@/app/modules/invitations/interfaces";

const router = useRouter();

const newInvitation = () => {
  router.push({ name: "NewInvitation" });
};

const loading = ref(true);

const page = ref(1)
const limit = ref(10)
const search = ref("")
const order = ref("DESC")
const sort = ref("createdAt")

const totalItems = ref(0)
const totalPages = ref(0)

const invitations = ref<Invitation[] | []>([]);

const changeLimit = (newLimit: number) => {
  limit.value = newLimit;
};

const changePage = (newPage: number) => {
  page.value = newPage;
};


// GET ALL INVITATIONS
const { getInvitations } = useAppStore();

const getAllInvitations = async () => {
  loading.value = true;

  await getInvitations({
    page: page.value,
    limit: limit.value,
    search: search.value,
    order: order.value,
    sort: sort.value,
  })
    .then((response) => {
      invitations.value = response.data.rows;
      totalItems.value = response.data.count;
      totalPages.value = Math.ceil(response.data.count / limit.value);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

watch([page, limit, order, sort], () => {
  getAllInvitations();
});

let typingTimer: any = null;

const startTimerSearch = () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => getAllInvitations(), 1000);
}

const stopTimerSearch = () => {
  clearTimeout(typingTimer);
}

getAllInvitations();
</script>

<style lang="scss" scoped>
.invitations-view {
  width: 100%;
  height: 100dvh;
  overflow-y: auto;
  .height-content {
    height: calc(100% - 144px);
  }

  .invitations-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(224px, 1fr));
    gap: 1rem;
    overflow-y: auto;
  }

  .invitations-loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
