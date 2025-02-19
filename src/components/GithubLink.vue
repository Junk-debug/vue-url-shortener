<script setup lang="ts">
import { cn } from "@/lib/utils";
import GithubIcon from "@/components/ui/GithubIcon.vue";
</script>

<template>
  <a
    href="https://github.com/Junk-debug/vue-url-shortener"
    target="_blank"
    class="relative size-7 group"
  >
    <div
      :class="
        cn(
          'absolute size-full scale-0 rounded-full',
          'dark:bg-[linear-gradient(90deg,_#144EE3_0%,_#EB568E_19%,_#A353AA_64%,_#144EE3_100%)]',
          'bg-[linear-gradient(90deg,_#38bdf8_0%,_#22d3ee_19%,_#ffffff_64%,_#38bdf8_100%)]',
          'group-hover:scale-150'
        )
      "
    />
    <GithubIcon
      ref="iconRef"
      class="size-7 z-10 rounded-full group-hover:scale-125"
    />
  </a>
</template>
