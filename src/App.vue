<script setup lang="ts">
import { twGradientStyles } from "@/lib/gradient";
import { useFetch } from "@/lib/useFetch";
import { cn } from "@/lib/utils";
import { isError } from "@/lib/isError";
import { copyToClipboard } from "@/lib/copyToClipboard";
import type { ShortenSuccess, ShortenError } from "@/lib/types/serverResponses";
import { toast } from "vue-sonner";

import Layout from "./Layout.vue";
import URLForm from "./components/URLForm.vue";
import ResultContainer from "./components/ResultContainer.vue";
import GithubLink from "./components/GithubLink.vue";

const fetchFn = async (longUrl: string) => {
  const response = await fetch("https://io.up.railway.app/links/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: longUrl }),
  });
  const res = (await response.json()) as ShortenSuccess | ShortenError;
  if (isError(res) && !response.ok) {
    throw new Error(res.message.join("\n"));
  }

  return (res as ShortenSuccess).data;
};

const { data, loading, fetchData } = useFetch(fetchFn, {
  onError: (error) => {
    if (error instanceof Error) {
      toast.error("Error !", {
        description: error.message,
        closeButton: true,
        duration: 3000,
      });
    }
  },
});

const onSubmit = async (e: Event) => {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);
  const url = formData.get("url") as string;
  const shouldCopyToClipboard = formData.has("shouldCopy");

  await fetchData(url);

  if (shouldCopyToClipboard && data.value) {
    await copyToClipboard(data.value.shortLink);
  }
};
</script>

<template>
  <Layout class="flex flex-col min-h-screen">
    <header class="px-12 py-10">
      <h2 :class="cn('font-extrabold text-3xl', twGradientStyles)">
        URL Shortener
      </h2>
    </header>
    <main class="px-12 flex flex-col items-center pt-28 grow">
      <div class="flex flex-col gap-2 items-center">
        <h1
          :class="
            cn(
              'text-center font-extrabold sm:text-6xl sm:leading-tight text-4xl',
              twGradientStyles
            )
          "
        >
          Shorten Your Looooong Links :)
        </h1>

        <p class="font-light max-w-xl text-secondary-foreground text-center">
          An efficient and easy-to-use URL shortening service that streamlines
          your online experience.
        </p>
      </div>
      <div class="pt-10 w-full">
        <URLForm :is-loading="loading" @submit="onSubmit" />
        <ResultContainer v-if="data" :data="data" />
      </div>
    </main>
    <footer class="px-12 py-5 flex items-center justify-between">
      <a
        href="https://github.com/Junk-debug"
        :class="
          cn('text-muted-foreground text-xs hover:scale-125', twGradientStyles)
        "
      >
        &copy; 2025 Junk-debug
      </a>

      <GithubLink />
    </footer>
  </Layout>
</template>
