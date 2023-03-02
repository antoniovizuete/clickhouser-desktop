import {
  Button,
  Classes,
  Dialog,
  FormGroup, InputGroup
} from "@blueprintjs/core";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useConnectionContext } from "../../contexts/useConnectionContext";
import { useThemeContext } from "../../contexts/useThemeContext";
import { RustBridge } from "../../lib/rust-bridge";
import { AppToaster } from "../../lib/toaster/AppToaster";
import Brand from "../Brand";
import ShowPasswordButton from "../core/ShowPasswordButton";

const MAX_ATTEMPS = 3;

type Props = {
  openFirstTimeDialog: () => void;
};

export type EnterPassphraseDialogRef = {
  open: () => void;
};

const EnterPassphraseDialog = forwardRef<EnterPassphraseDialogRef, Props>(({ openFirstTimeDialog }, ref) => {
  const { bpTheme } = useThemeContext()
  const [passphrase, setPassphrase] = useState<string | undefined>()
  const [isOpen, setIsOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [attemps, setAttemps] = useState(MAX_ATTEMPS);
  const { setDatabaseDecrypted } = useConnectionContext();

  useImperativeHandle(ref, () => ({ open }), []);

  const handleOkClick = async () => {
    if (!passphrase) {
      return;
    }
    const result = await RustBridge.init(passphrase);

    if (!result.isError()) {
      AppToaster.top.success("Connections database unlocked successfully.");
      setDatabaseDecrypted(true);
      setIsOpen(false);
      return;
    }

    if (attemps === 1) {
      AppToaster.top.error("You have reached the maximum number of attempts.");
      await RustBridge.deleteDb();
      AppToaster.top.warn("The connections database has been removed.");
      setDatabaseDecrypted(false);
      openFirstTimeDialog();
      setIsOpen(false);
      return;
    }

    setAttemps((attemps) => attemps - 1);

  };

  useEffect(() => {
    if (attemps < MAX_ATTEMPS) {
      AppToaster.top.error(`Wrong passphrase. You have ${attemps} attempts left.`);
    }
  }, [attemps])

  const open = () => {
    setIsOpen(true);
  };

  return (
    <Dialog
      isOpen={isOpen}
      canEscapeKeyClose={false}
      canOutsideClickClose={false}
      isCloseButtonShown={false}
      className={bpTheme}
      title={<>
        Welcome to <Brand />
      </>
      }
    >
      <div className={`${Classes.DIALOG_BODY} ${bpTheme} flex flex-col gap-2`}>
        <div>A connections database has been found.</div>
        <div>Please type the passphrase to decrypt your connections.</div>
        <div>Consider the following:</div>
        <ul className="list-disc text-xs">
          <li className="list-item ml-6">Have only {attemps} attempts.</li>
          <li className="list-item ml-6">On the 3rd failed attempt, the connections database will be remove and you will need to re-enter the connections again.</li>
        </ul>

        <FormGroup label="Passphrase:">
          <InputGroup
            className={`flex-grow ${bpTheme}`}
            type={showPassword ? "text" : "password"}
            value={passphrase}
            placeholder="The database passphrase"
            onChange={(e) => setPassphrase(e.target.value)}
            size={40}
            rightElement={
              <ShowPasswordButton
                showPassword={showPassword}
                onClick={setShowPassword}
              />
            }
          />
        </FormGroup>

      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button intent="primary" onClick={handleOkClick} disabled={!passphrase}>
            Decrypt
          </Button>
        </div>
      </div>
    </Dialog>
  );
});

type ReturnType = [JSX.Element, EnterPassphraseDialogRef["open"]];

export const useEnterPassphraseDialogHandler = (props: Props): ReturnType => {
  const enterPassphraseDialogRef = useRef<EnterPassphraseDialogRef>(null);

  return [
    <EnterPassphraseDialog ref={enterPassphraseDialogRef} {...props} />,
    enterPassphraseDialogRef.current?.open ?? (() => enterPassphraseDialogRef.current?.open()),
  ];
};
