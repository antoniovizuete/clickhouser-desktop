import { Button, Classes, Dialog } from "@blueprintjs/core";
import { useThemeContext } from "../../../contexts/useThemeContext";
import { Tab } from "../../../lib/tabs-handler";

type Props = {
  handleOnClickDontSave: () => void;
  handleOnClickSave: () => void;
  isOpen: boolean;
  onClose: () => void;
  tabToBeClosed: Tab | undefined;
};

export default function CloseDialog({
  handleOnClickDontSave,
  handleOnClickSave,
  isOpen,
  onClose,
  tabToBeClosed,
}: Props) {
  const { bpTheme } = useThemeContext();

  return (
    <Dialog
      icon="warning-sign"
      className={bpTheme}
      isOpen={isOpen}
      onClose={onClose}
      title="Unsaved query"
    >
      <div className={`${Classes.DIALOG_BODY} ${bpTheme} flex flex-col gap-3`}>
        <div>
          <span className="font-bold">{tabToBeClosed?.name}</span> has unsaved
          changes. Your changes will be lost if you close this tab without
          saving it.
        </div>

        <div>Are you sure you want to close this tab?</div>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={handleOnClickDontSave} type="button">
            Don't save
          </Button>
          <Button onClick={onClose} type={"button"}>
            Cancel
          </Button>
          <Button intent="warning" type="submit" onClick={handleOnClickSave}>
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
