import React, { ComponentProps } from "react";

type InputProps = {
  type: string;
  name: string;
  label: string;
  required: boolean;
  errorMessage?: string;
  pattern?: string;
};

export function Input({
  name,
  type,
  label,
  required,
  errorMessage,
  pattern,
}: InputProps) {
  return (
    <label>
      {label}
      <input type={type} name={name} required={required} pattern={pattern} />
      <span>{errorMessage}</span>
    </label>
  );
}
