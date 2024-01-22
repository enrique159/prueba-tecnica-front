<template>
  <v-card>
    <v-card-title class="pt-6 pl-10">{{ invitation.guestName }}</v-card-title>
    <v-card-subtitle class="pl-10">Invitación</v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-card-subtitle>Fecha de la invitación</v-card-subtitle>
          <v-card-title>{{ invitation.date }} - {{ invitation.hour }}</v-card-title>
        </v-col>
      </v-row>
      <div class="d-flex justify-center align-center">
        <QRCodeVue3
          :width="240"
          :height="240"
          :value="URL"
          :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
          :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
          :dotsOptions="{
            type: 'square',
            color: '#232323',
          }"
          :cornersSquareOptions="{ type: 'extra-rounded', color: '#232323' }"
          :backgroundOptions="{ color: '#ffffff' }"
          fileExt="png"
          :download="true"
          downloadButton="download-button"
          :downloadOptions="{ name: 'invitacion-qe', extension: 'png' }"
        />
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { Invitation } from "@/app/modules/invitations/interfaces";
import QRCodeVue3 from "qrcode-vue3";

const props = defineProps<{
  invitation: Invitation
}>()

const URL = `${window.location.origin}/invitations/info/${props.invitation?.id}`
</script>

<style lang="scss" scoped>
:deep(.download-button) {
  margin: 0 auto;
  display: block;
  width: 100%;
  max-width: 240px;
  background: linear-gradient(100deg, rgb(40, 130, 255) 35%, rgb(76, 0, 255) 100%);
  color: #fff;
  font-weight: 700;
  padding: 0.6rem 2rem;
  border-radius: 2rem;
}
</style>