import { Button, Intent } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import React from "react";

type ShowPasswordButtonProps = {
  showPassword: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowPasswordButton = ({
  showPassword,
  onClick,
}: ShowPasswordButtonProps) => {

  return (
    <Tooltip2 content={`${showPassword ? "Hide" : "Show"}`}>
      <Button
        icon={showPassword ? "unlock" : "lock"}
        intent={Intent.NONE}
        onClick={() => onClick(prev => !prev)}
      />
    </Tooltip2>
  );
};

export default ShowPasswordButton;
