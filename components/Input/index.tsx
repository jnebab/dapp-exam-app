import cx from "classnames";

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
  classNames?: string;
  type?: string;
  name?: string;
  id?: string;
  label?: string;
  containerClassNames?: string;
  labelClassNames?: string;
}

export default function Input({
  onChange,
  value,
  placeholder = "Type something here",
  classNames,
  type = "text",
  name,
  id,
  label,
  containerClassNames,
  labelClassNames,
}: InputProps) {
  const defaultClassNames = "border border-neutral-200 rounded-md";
  const defaultContainerClassNames = "flex flex-col text-left";

  return (
    <div className={cx(defaultContainerClassNames, containerClassNames)}>
      {label ? (
        <label className={cx("mb-2", labelClassNames)} htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        name={name}
        id={id}
        type={type}
        className={cx(defaultClassNames, classNames)}
      />
    </div>
  );
}
