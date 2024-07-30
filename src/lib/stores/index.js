import { writable } from "svelte/store";

const theme = writable("light");
const sessionStore = writable({});

export { theme, sessionStore };
