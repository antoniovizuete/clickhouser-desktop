import {
  Button,
  Classes,
  Dialog,
  FormGroup, InputGroup
} from "@blueprintjs/core";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { useConnectionContext } from "../../contexts/useConnectionContext";
import { useThemeContext } from "../../contexts/useThemeContext";
import { RustBridge } from "../../lib/rust-bridge";
import { AppToaster } from "../../lib/toaster/AppToaster";
import Brand from "../Brand";
import ShowPasswordButton from "../core/ShowPasswordButton";

type Props = {};

export type FirstTimeDialogRef = {
  open: () => void;
};

const FirstTimeDialog = forwardRef<FirstTimeDialogRef, Props>(({ }, ref) => {
  const { bpTheme } = useThemeContext();
  const { setDatabaseDecrypted } = useConnectionContext();
  const [passphrase, setPassphrase] = useState<string | undefined>(undefined)
  const [isOpen, setIsOpen] = useState(false);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  useImperativeHandle(ref, () => ({ open }), []);

  const handleOnChangeScore = (score: number) => {
    setSaveEnabled(score < 2);
  }

  const save = async () => {
    if (!passphrase) {
      return;
    }
    const result = await RustBridge.init(passphrase);
    if (result.isError()) {
      console.dir("Error: ", result.unwrapError());
      AppToaster.top.error(result.unwrapError()?.message || "Unknown error");
      return;
    }
    AppToaster.top.success("Your passphrase has been set successfully");
    setDatabaseDecrypted(true);
    setIsOpen(false);

  };

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
        <div>Your connections and passwords will be stored in an encrypted local sqlite database.</div>
        <div>Please set a security passphrase to encrypt your connections passwords.</div>
        <div>Consider the following:</div>
        <ul className="list-disc text-xs">
          <li className="list-item ml-6">Use a strong passphrase with at least 16 characters.</li>
          <li className="list-item ml-6">Remember the passphrase. There is no way to recover the passphrase.</li>
          <li className="list-item ml-6">
            Once you set the passphrase, you will have only 3 attempts to enter it. After that, the app will remove the connections database and you will need to re-enter the connections again.
          </li>
        </ul>

        <FormGroup label="Passphrase:">
          <InputGroup
            className={`flex-grow ${bpTheme}`}
            type={showPassword ? "text" : "password"}
            value={passphrase}
            placeholder="Type your strong passphrase here"
            onChange={(e) => setPassphrase(e.target.value)}
            size={40}
            rightElement={
              <ShowPasswordButton
                showPassword={showPassword}
                onClick={setShowPassword}
              />
            }
          />
          <PasswordStrengthBar
            password={passphrase}
            minLength={16}
            onChangeScore={handleOnChangeScore}
            shortScoreWord="Too short"
            scoreWords={["Weak", "Weak", "Okay", "Good", "Strong"]}
          />
        </FormGroup>

      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button intent="primary" onClick={save} disabled={saveEnabled}>
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
});

type ReturnType = [JSX.Element, FirstTimeDialogRef["open"]];

export const useFirstTimeDialogHandler = (): ReturnType => {
  const firstTimeDialogRef = useRef<FirstTimeDialogRef>(null);

  return [
    <FirstTimeDialog ref={firstTimeDialogRef} />,
    firstTimeDialogRef.current?.open ?? (() => firstTimeDialogRef.current?.open()),
  ];
};
