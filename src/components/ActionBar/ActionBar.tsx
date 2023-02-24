import { Alignment, Button, Navbar } from "@blueprintjs/core";
import Brand from "../Brand";
import ConnectionCaption from "./components/ConnectionCaption";
import SelectThemeButton from "./components/SelectThemeButton";
import ThemedButton from "./components/ThemedButton";
import { useConnectionDrawer } from "./hooks/useConnectionDrawer";

type ActionBarProps = {
  onClickRunQuery: () => void;
}

export default function ActionBar({ onClickRunQuery }: ActionBarProps) {
  const [ConnectionsDrawer, openConnectionDrawer] = useConnectionDrawer();
  return (<>
    <Navbar className="bg-slate-50 dark:bg-neutral-800 dark:text-white">
      <Navbar.Group align={Alignment.LEFT}>
        <div className="flex flex-row justify-start items-center mr-1 gap-1">
          <Brand />
          <Button
            icon="play"
            intent="warning"
            aria-label="Run query"
            onClick={onClickRunQuery}
          />
          <ThemedButton
            icon="data-connection"
            action={openConnectionDrawer}
          />
          <ConnectionCaption />
        </div>
      </Navbar.Group>
      <Navbar.Group
        align={Alignment.RIGHT}
        className="flex flex-row justify-start items-center gap-1"
      >
        <SelectThemeButton />
      </Navbar.Group>
    </Navbar>
    {ConnectionsDrawer}
  </>)
}