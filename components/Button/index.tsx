import { useMemo } from "react";
import cx from "classnames";

interface ButtonProps {
  name?: string;
  label: string;
  type?: string;
  onClick: () => void;
  classNames?: string;
}

export default function Button({
  name,
  label,
  onClick,
  type,
  classNames,
}: ButtonProps) {
  const isPrimary = type === "primary";
  const isError = type === "error";
  const isLink = type === "link";

  const defaultClassNames =
    "w-full inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border";
  const primaryClassNames =
    "text-white bg-blue-600 hover:text-white hover:bg-blue-400";
  const errorClassNames =
    "text-white bg-red-500 hover:bg-red-200 hover:text-white focus-visible:ring-red-500";
  const linkClassNames = "text-blue-500 !bg-white border-none";

  return (
    <button
      name={name}
      onClick={onClick}
      className={cx(
        defaultClassNames,
        {
          [primaryClassNames]: isPrimary,
          [errorClassNames]: isError,
          [linkClassNames]: isLink,
        },
        classNames
      )}
    >
      {label}
    </button>
  );
}
