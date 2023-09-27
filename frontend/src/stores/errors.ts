import { defineStore } from "pinia";
import { ref } from "vue";

// Stores error codes
export const errorStore = defineStore("error", () => {
  const errors = ref<{ [key: string]: number }>({
    send: 200,
    hash: 200,
  });

  const errorMessages = ref<{ [key: string]: string | null }>({
    send: null,
    hash: null,
  });

  const set = (error: "send" | "hash", toggle: number, message?: string) => {
    errors.value[error] = toggle;
    if (message) {
      errorMessages.value[error] = message;
    }
  };
  const get = (error: "send" | "hash") => {
    return errors.value[error];
  };

  const getMessage = (error: "send" | "hash") => {
    return errorMessages.value[error];
  };

  return { set, get, getMessage };
});
