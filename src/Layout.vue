<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { Toaster } from "@/components/ui/sonner";
import WavyBackground from "@/components/WavyBackground.vue";

import type { HtmlHTMLAttributes } from "vue";
import { cn } from "./lib/utils";

const props = defineProps<{ class: HtmlHTMLAttributes["class"] }>();

const mode = useColorMode();

if (localStorage.getItem("vueuse-color-scheme") === "auto") {
  mode.value = "dark";
}
</script>
<template>
  <Toaster richColors />
  <WavyBackground
    :class="cn(props.class)"
    :backgroundFill="mode === 'light' ? '#fff' : '#000'"
  >
    <slot />
  </WavyBackground>
</template>
