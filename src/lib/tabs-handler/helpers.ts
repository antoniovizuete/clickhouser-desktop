import { Tab } from "./types";

export const getNewTab = (): Tab => {
  const id = crypto.randomUUID();
  return {
    id,
    closeable: true,
    icon: "console",
    name: "New query",
    sql: "",
    params: "",
    loading: false,
    touched: false,
    isNew: true,
  };
};
