import {
  Button,
  Classes,
  Dialog,
  FormGroup, InputGroup,
  Switch
} from "@blueprintjs/core";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { useThemeContext } from "../../../contexts/useThemeContext";
import { Connection } from "../../../lib/clickhouse-clients/types";
import { useShowPasswordButton } from "../../core/ShowPasswordButton";
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
    close,
    connection,
    control,
    isOpen,
    onClickTest,
    onSubmit,
  } = useConnectionDialog({ onClose, ref });

  const { showPassword, ShowPasswordButton } = useShowPasswordButton();

  return (
    <Dialog
      icon="data-connection"
      isOpen={isOpen}
      onClose={close}
      className={bpTheme}
      title={`${connection ? "Edit" : "New"} Connection`}
    >
      <form onSubmit={onSubmit}>
        <div className={`${Classes.DIALOG_BODY} ${bpTheme} flex flex-col gap-2`}>
          <FormGroup label="Name:">
            <Controller name="name" control={control} render={({ field }) => (
              <InputGroup
                className={`flex-grow ${bpTheme}`}
                placeholder="Name"
                size={40}
                {...field}
              />)} />
          </FormGroup>
          <div className="flex flex-row justify-start items-start gap-1">
            <FormGroup label="Host:">
              <Controller name="host" control={control} render={({ field }) => (
                <InputGroup
                  className={`flex-grow ${bpTheme}`}
                  placeholder="Host"
                  size={40}
                  {...field}
                />)} />
            </FormGroup>
            <FormGroup label="Port:">
              <Controller name="port" control={control} render={({ field }) => (
                <InputGroup
                  className={`flex-grow ${bpTheme}`}
                  placeholder="Port"
                  size={40}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  ref={field.ref}
                  value={field.value.toString()}
                />)} />
            </FormGroup>
            <FormGroup label="Secure:">
              <Controller name="secure" control={control} render={({ field }) => (
                <Switch
                  checked={field.value}
                  className={`flex-grow ${bpTheme} mt-1`}
                  innerLabel="http"
                  innerLabelChecked="https"
                  large
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  ref={field.ref}
                />)}
              />
            </FormGroup>
          </div>
          <div className="flex flex-row justify-start items-start gap-2">
            <FormGroup label="Username:">
              <Controller name="username" control={control} render={({ field }) => (
                <InputGroup
                  className={`flex-grow ${bpTheme}`}
                  placeholder="Username"
                  size={40}
                  {...field}
                />
              )} />
            </FormGroup>
            <FormGroup label="Password:">
              <Controller name="password" control={control} render={({ field }) => (
                <InputGroup
                  className={`flex-grow ${bpTheme}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  size={40}
                  rightElement={<ShowPasswordButton />}
                  {...field}
                />
              )} />
            </FormGroup>
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={close} type="button">Close</Button>
            <Button intent="success" onClick={onClickTest} type={"button"}>
              Test Connection
            </Button>
            <Button intent="primary" type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
});

export default ConenctionsDialog;
