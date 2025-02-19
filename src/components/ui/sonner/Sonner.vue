<script lang="ts" setup>
import { useColorMode } from "@vueuse/core";
import type { ToasterProps } from "vue-sonner";
import { Toaster as Sonner } from "vue-sonner";

const { theme, ...props } = defineProps<ToasterProps>();
const { value } = useColorMode();
</script>

<template>
  <Sonner
    class="toaster group"
    :theme="theme || (value === 'auto' ? 'system' : value)"
    v-bind="props"
    :toast-options="{
      classes: {
        toast:
          'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton:
          'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
      },
    }"
  />
</template>
