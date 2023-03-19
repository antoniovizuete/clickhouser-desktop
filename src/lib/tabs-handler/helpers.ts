import { Tab } from "./types";

export const getNewTab = (): Tab => {
  const id = crypto.randomUUID();
  return {
    id,
    closeable: true,
    icon: "console",
    name: "New query",
    //name: id.slice(0, 6),
    sql: "",
    params: "",
    loading: false,
  };
};
