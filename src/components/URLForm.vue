<script setup lang="ts">
import Label from "./ui/label/Label.vue";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Link } from "lucide-vue-next";
import { useId } from "radix-vue";
import { ref } from "vue";
import { cn } from "../lib/utils";
import { useLocalStorage } from "@vueuse/core";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = { onSubmit: (e: Event) => void; isLoading?: boolean };
const { onSubmit, isLoading: loading } = defineProps<Props>();

const inputId = useId();

const shouldCopyToClipboard = useLocalStorage("shouldCopyToClipboard", true);
const url = ref("");
</script>

<template>
  <form @submit="onSubmit" class="max-w-sm mx-auto mb-6">
    <div class="relative flex items-center mb-5">
      <label :for="inputId" class="absolute left-5">
        <Link
          :class="
            cn('size-7 text-muted-foreground', {
              'animate-spin': loading,
            })
          "
        />
      </label>

      <Input
        name="url"
        required
        v-model="url"
        :id="inputId"
        :disabled="loading"
        type="url"
        placeholder="https://example.com/very?long=true&short=false"
        class="pl-14 sm:pr-36 pr-16 caret-primary-pink"
      />

      <Button
        type="submit"
        :disabled="loading"
        class="absolute right-2 h-12 font-medium w-12 sm:w-auto shadow-[10px_9px_22px_0px_rgba(20,_78,_227,_38%)] cursor-pointer"
      >
        <ArrowRight class="sm:hidden size-6!" />
        <span class="hidden sm:block">Shorten Now!</span>
      </Button>
    </div>
    <Label class="flex items-center justify-center gap-2">
      <Switch name="shouldCopy" v-model:checked="shouldCopyToClipboard" />
      Copy to clipboard when generated
    </Label>
  </form>
</template>
