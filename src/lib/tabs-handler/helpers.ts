import { Tab } from "./types";

export const getNewTab = (): Tab => {
  const id = crypto.randomUUID();
  return {
    id,
    closeable: true,
    icon: "console",
    name: id.slice(0, 6), //"New query",
    sql: "SELECT 1",
    params: "",
    loading: false,
  };
};
