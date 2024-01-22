<template>
  <div class="invitation-preview-view">
    <v-progress-circular v-if="loading" indeterminate color="primary" size="64" />
    <v-card class="invitation-card" v-else>
      <ConfettiExplosion v-if="acceptLoading == 'success'" :particleCount="200" :force="0.3" />
      <v-card-title class="pt-6 pl-10">{{ invitation?.guestName }}</v-card-title>
      <v-card-subtitle class="pl-10">Invitación</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-card-subtitle>Fecha de la invitación</v-card-subtitle>
            <v-card-title>{{ invitation?.date }} - {{ invitation?.hour }}</v-card-title>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="canAcceptInvitation ? 'primary' : 'success'"
          variant="tonal"
          @click="acceptInvitationAction"
          :loading="acceptLoading == 'loading'"
          :disabled="acceptLoading == 'success' || !canAcceptInvitation"
        >
          <span v-if="canAcceptInvitation">Aceptar invitación</span>
          <span v-else>Invitación aceptada</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "@/stores/appStore";
import { Invitation } from "@/app/modules/invitations/interfaces";
import { useNotifications } from "@/composables/useNotifications";
import ConfettiExplosion from "vue-confetti-explosion";

const { getInvitation, acceptInvitation } = useAppStore();
const { notifyError } = useNotifications();
const route = useRoute();

const invitation = ref<Invitation | null>(null);
const loading = ref(true);
const acceptLoading = ref('start');

const getInvitationInfo = async () => {
  const invitationId = route.params.id as string;
  await getInvitation(invitationId)
    .then((res) => {
      invitation.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

const acceptInvitationAction = async () => {
  const invitationId = route.params.id as string;
  acceptLoading.value = 'loading';

  // check if the invitation caducity date is before now
  if (new Date(invitation.value?.caducity || '') < new Date()) {
    notifyError('La invitación ha caducado');
    acceptLoading.value = 'error';
    return;
  }
  
  await acceptInvitation(invitationId)
    .then((res) => {
      acceptLoading.value = 'success';
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      acceptLoading.value = 'error';
    })
};

const canAcceptInvitation = computed(() => {
  return invitation.value?.status !== 'accepted' && acceptLoading.value !== 'success';
});

getInvitationInfo();
</script>

<style lang="scss" scoped>
.invitation-preview-view {
  height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .invitation-card {
    border-radius: 1rem;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05);
  }
}
</style>