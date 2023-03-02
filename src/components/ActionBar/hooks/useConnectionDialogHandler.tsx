import { useRef } from "react";
import ConnectionDialog, {
  ConnectionDialogRef
} from "../components/ConnectionDialog";

type ReturnType = [JSX.Element, ConnectionDialogRef["open"]];

type Props = {
  onClose: () => void;
};

export const useConnectionDialogHandler = ({ onClose }: Props): ReturnType => {
  const connectionsDialogRef = useRef<ConnectionDialogRef>(null);

  return [
    <ConnectionDialog ref={connectionsDialogRef} onClose={onClose} />,
    connectionsDialogRef.current?.open ?? (() => { }),
  ];
};
