<template>
  <div class="paginator">
    <div class="limit-selector">
      <span>Invitaciones por página: </span>
      <v-select
        class="ml-4"
        v-model="limitComp"
        :items="limits"
        variant="outlined"
        :menu-icon="IconCaretDown"
        hide-details
        density="compact"
      />
    </div>

    <span>{{ `${currentItemsInPage} de ${totalItems}` }}</span>

    <div class="d-flex justify-space-between align-center ga-2">
      <v-btn density="compact" variant="tonal" :disabled="currentPage == 1" :icon="IconChevronLeftPipe" @click="changePage('start')"></v-btn>
      <v-btn density="compact" variant="tonal" :disabled="currentPage == 1" :icon="IconChevronLeft" @click="changePage('prev')"></v-btn>
      <v-btn density="compact" variant="tonal" :disabled="currentPage == totalPages" :icon="IconChevronRight" @click="changePage('next')"></v-btn>
      <v-btn density="compact" variant="tonal" :disabled="currentPage == totalPages" :icon="IconChevronRightPipe" @click="changePage('finish')"></v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IconChevronLeft, IconChevronLeftPipe, IconChevronRight, IconChevronRightPipe, IconCaretDown } from "@tabler/icons-vue";

const emits = defineEmits(["update:limit", "update:currentPage"]);
const props = defineProps<{
  limit: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
}>();

const limits = [5, 10, 15, 30, 50, 100]

const limitComp = computed({
  get: () => props.limit,
  set: (value) => {
    emits("update:limit", value);
  },
});

const currentItemsInPage = computed(() => {
  const startItem = props.currentPage * props.limit - props.limit + 1;
  const endItem = (startItem + props.limit - 1) > props.totalItems ? props.totalItems : (startItem + props.limit - 1);

  return `${startItem}-${endItem}`;
});

const changePage = (type: "start" | "prev" | "next" | "finish") => {
  switch (type) {
    case "start":
      emits("update:currentPage", 1);
      break;
    case "prev":
      if (props.currentPage === 1) return;
      emits("update:currentPage", props.currentPage - 1);
      break;
    case "next":
      if (props.currentPage === props.totalPages) return;
      emits("update:currentPage", props.currentPage + 1);
      break;
    case "finish":
      emits("update:currentPage", props.totalPages);
      break;
  }
};
</script>

<style lang="scss" scoped>
.paginator {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  gap: 1rem;

  .limit-selector {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }
}
</style>