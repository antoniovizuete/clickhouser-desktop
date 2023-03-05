import { Button, Intent } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useCallback, useState } from "react";

export const useShowPasswordButton = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = useCallback(
    () => setShowPassword(prev => !prev),
    []
  );

  const ShowPasswordButton = useCallback(
    () => (
      <Tooltip2 content={`${showPassword ? "Hide" : "Show"}`}>
        <Button
          icon={showPassword ? "unlock" : "lock"}
          intent={Intent.NONE}
          onClick={toggleShowPassword}
        />
      </Tooltip2>
    ),
    [showPassword]
  );

  return { showPassword, ShowPasswordButton };
};