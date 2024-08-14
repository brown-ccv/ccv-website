import React, { type ReactNode } from "react";

interface ButtonProps
  extends React.PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > {
  icon?: ReactNode;
}

const buttonStyles =
  "flex items-center gap-2 px-3 py-2 w-max rounded transition-all hover:shadow-md";

export default function Button({ icon, children, ...delegated }: ButtonProps) {
  return (
    <button
      className={`${buttonStyles} bg-secondary-blue-500 text-white hover:bg-secondary-blue-700`}
      {...delegated}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

export function ButtonSecondary({ icon, children, ...delegated }: ButtonProps) {
  return (
    <button
      className={`${buttonStyles} bg-secondary-yellow-500 hover:bg-secondary-yellow-700`}
      {...delegated}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

export function ButtonTertiary({ icon, children, ...delegated }: ButtonProps) {
  return (
    <button
      className={`${buttonStyles} bg-neutral-50 text-secondary-blue-700 hover:bg-neutral-100`}
      {...delegated}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
