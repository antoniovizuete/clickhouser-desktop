import {
  Button,
  Classes,
  Dialog,
  FormGroup, InputGroup,
  Switch
} from "@blueprintjs/core";
import { forwardRef } from "react";
import { useThemeContext } from "../../../contexts/useThemeContext";
import { Connection } from "../../../lib/clickhouse-clients/types";
import ShowPasswordButton from "../../core/ShowPasswordButton";
import { useConnectionDialog } from "../hooks/useConnectionDialog";

type Props = {
  onClose: () => void;
};

export type ConnectionDialogRef = {
  open: (connection?: Connection) => void;
};

const ConenctionsDialog = forwardRef<ConnectionDialogRef, Props>(({
  onClose
}, ref) => {
  const { bpTheme } = useThemeContext();
  const {
    connection,
    isOpen,
    name,
    setName,
    host,
    setHost,
    port,
    setPort,
    username,
    setUsername,
    password,
    setPassword,
    secure,
    setSecure,
    showPassword,
    setShowPassword,
    tested,
    test,
    save,
    close,
  } = useConnectionDialog({ onClose, ref });

  return (
    <Dialog
      icon="data-connection"
      isOpen={isOpen}
      onClose={close}
      className={bpTheme}
      title={`${connection ? "Edit" : "New"} Connection`}
    >
      <div className={`${Classes.DIALOG_BODY} ${bpTheme} flex flex-col gap-2`}>
        <FormGroup label="Name:">
          <InputGroup
            className={`flex-grow ${bpTheme}`}
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value || "")}
            size={40}
          />
        </FormGroup>
        <div className="flex flex-row justify-start items-start gap-1">
          <FormGroup label="Host:">
            <InputGroup
              className={`flex-grow ${bpTheme}`}
              value={host}
              placeholder="Host"
              onChange={(e) => setHost(e.target.value || "")}
              size={40}
            />
          </FormGroup>
          <FormGroup label="Port:">
            <InputGroup
              className={`flex-grow ${bpTheme}`}
              value={port.toString()}
              placeholder="Port"
              onChange={(e) => setPort(parseInt(e.target.value))}
              size={40}
            />
          </FormGroup>
          <FormGroup label="Secure:">
            <Switch
              className={`flex-grow ${bpTheme} mt-1`}
              checked={secure}
              innerLabel="http"
              innerLabelChecked="https"
              large
              onChange={(e) => setSecure(e.currentTarget.checked)}
            />
          </FormGroup>
        </div>
        <div className="flex flex-row justify-start items-start gap-2">
          <FormGroup label="Username:">
            <InputGroup
              className={`flex-grow ${bpTheme}`}
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value || "")}
              size={40}
            />
          </FormGroup>
          <FormGroup label="Password:">
            <InputGroup
              className={`flex-grow ${bpTheme}`}
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value || "")}
              size={40}
              rightElement={
                <ShowPasswordButton showPassword={showPassword} onClick={() => setShowPassword(prev => !prev)} />
              }
            />
          </FormGroup>
        </div>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={close}>Close</Button>
          <Button intent="success" onClick={test}>
            Test Connection
          </Button>
          <Button intent="primary" onClick={save} disabled={!tested}>
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
});

export default ConenctionsDialog;
