import React, { PropsWithRef, useEffect, useState } from "react";
import { getInverseBW } from "../../lib/colors-helpers";

type Props = {
  name: string;
  value: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
};

export default function ColorSelector({
  value,
  name,
  ref,
  onBlur,
  onChange,
}: PropsWithRef<Props>) {
  const [color, setColor] = useState(value);

  useEffect(() => {
    setColor(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    onChange?.(e);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
  };

  return (
    <label
      className="bp4-input w-24 flex justify-center items-center gap-2 rounded-sm relative"
      style={{ background: color }}
    >
      <span className="font-mono" style={{ color: getInverseBW(color) }}>
        {color.toUpperCase()}
      </span>
      <input
        ref={ref}
        name={name}
        type="color"
        value={color}
        onChange={handleChange}
        onBlur={handleOnBlur}
        className="absolute inset-0 opacity-0"
      />
    </label>
  );
}
