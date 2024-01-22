<template>
  <div class="invitation-card">
    <div class="invitation-card__header">
      <h5>Para:</h5>
      <h3>{{ invitation.guestName }}</h3>
    </div>

    <div class="invitation-card__content mb-8">
      <v-row>
        <v-col cols="12" class="pt-4">
          <span>Fecha y hora:</span>
          <p>{{ invitation.date }} - {{ invitation.hour }}</p>
        </v-col>
        <v-col cols="12" class="py-2">
          <span>Estado:
            <v-chip :color="statusColor" variant="tonal">{{ status }}</v-chip>
          </span>
        </v-col>
      </v-row>
    </div>

    <v-btn color="black" block @click="showDetails" rounded>
      Ver QR
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Invitation } from '@/app/modules/invitations/interfaces'

const props = defineProps<{
  invitation: Invitation
}>()

const emits = defineEmits(['show:details'])

const status = computed(() => {
  switch (props.invitation.status) {
    case 'pending':
      return 'Pendiente'
    case 'accepted':
      return 'Aceptada'
    default:
      return 'Pendiente'
  }
})

const statusColor = computed(() => {
  switch (props.invitation.status) {
    case 'pending':
      return 'orange'
    case 'accepted':
      return 'green'
    default:
      return 'orange'
  }
})

const showDetails = () => {
  emits('show:details')
}
</script>

<style lang="scss" scoped>
.invitation-card {
  height: fit-content;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);

  &__content {
    span {
      font-size: 0.8rem;
      color: #999;
    }
  }
}
</style>