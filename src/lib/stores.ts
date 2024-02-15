import { arrayStore } from "./util/store";

export const notifications = arrayStore<{text: string, timeout?: number}>("notifications")