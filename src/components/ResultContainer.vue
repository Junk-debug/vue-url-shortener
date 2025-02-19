<script setup lang="ts">
import { CopyIcon } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { copyToClipboard } from "@/lib/copyToClipboard";
import type { ShortenSuccess } from "@/lib/types/serverResponses";

const { data } = defineProps<{ data: ShortenSuccess["data"] }>();
const onClick = () => copyToClipboard(data.shortLink);
</script>

<template>
  <Card class="max-w-md mx-auto">
    <CardHeader>
      <CardTitle class="text-center">Your shorten link</CardTitle>
      <CardDescription class="text-center"
        >You can now copy it!</CardDescription
      >
    </CardHeader>
    <CardContent>
      <div class="relative flex items-center">
        <Button @click="onClick" class="absolute left-2 h-12">
          <CopyIcon />
        </Button>
        <Input class="pl-16" readonly :model-value="data.shortLink" />
      </div>
    </CardContent>
  </Card>
</template>
