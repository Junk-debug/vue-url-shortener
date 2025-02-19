import { toast } from "vue-sonner";

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Successfully copied");
  } catch (err) {
    console.error(err);
    toast.error("Failed to copy");
  }
}
