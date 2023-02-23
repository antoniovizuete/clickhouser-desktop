import { Button } from "@blueprintjs/core";
import { invoke } from "@tauri-apps/api/tauri";
import { AppToaster } from "../lib/toaster/AppToaster";

export default function Test() {
  const handleClick = async () => {
    try {

      await invoke("init", { passphrase: "test!" })
      AppToaster.top.success("Connected");

      await invoke("insert_connection", {
        connection: {
          host: "localhost",
          port: 9000,
          user: "default",
          password: "",
          database: "default",
        }
      });
      AppToaster.top.success("Created");

      const connections = await invoke("get_all_connections");
      console.log(connections);
      AppToaster.top.success("Selected");
    } catch (error) {

      AppToaster.top.error(error as string);
    }
  }
  return (
    <Button text="Test" onClick={handleClick} />
  )
}
