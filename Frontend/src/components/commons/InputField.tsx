import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface InputFieldType {
  type: string;
  placeholder?: string;
  name?: string;
  id?: string;
  value?: string;
  startIcon?: any;
  endIcon?: any;
  passwordType?: string;
  varient?: "Primary" | "Secondary";
  size: string;
  min?: number;
  max?: number;
  required?: boolean;
  autoComplete?: string;
  classNameProp?: any;
  changeHandler?: (event: any) => void;
  iconChangeHandler?: (e: any) => void;
}

/**
 * Shared text input.
 *
 * Sizes used to be hard pixel widths (245px / 490px) which broke every
 * responsive layout they appeared in. They are now fluid: the field fills its
 * container and the `size` prop only caps the maximum width on wide screens.
 */
const InputFieldVarient: Record<string, string> = {
  Primary: "sn-field",
  Secondary:
    "sn-field bg-white text-ink-900 border-ink-200 placeholder:text-ink-400 hover:border-ink-300 focus:bg-white focus:border-brand-500",
};

const InputFieldSize: Record<string, string> = {
  sm: "w-full sm:max-w-[9rem]",
  md: "w-full",
  lg: "w-full",
  xl: "w-full",
};

function InputField({
  type,
  placeholder,
  classNameProp,
  name,
  id,
  value,
  varient,
  size,
  startIcon,
  endIcon,
  passwordType,
  min,
  max,
  required,
  autoComplete,
  changeHandler,
  iconChangeHandler,
}: InputFieldType) {
  const hasToggle = Boolean(passwordType);

  return (
    <div className={`relative flex ${InputFieldSize[size] ?? "w-full"}`}>
      {startIcon && (
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-ink-400">
          {startIcon}
        </span>
      )}

      <input
        className={`${varient ? InputFieldVarient[varient] : InputFieldVarient.Primary} ${
          startIcon ? "pl-11" : ""
        } ${endIcon || hasToggle ? "pr-11" : ""} ${classNameProp ?? ""}`}
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        min={min}
        max={max}
        required={required}
        autoComplete={autoComplete}
        onChange={changeHandler}
      />

      {endIcon && !hasToggle && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-ink-400">
          {endIcon}
        </span>
      )}

      {hasToggle && (
        <button
          type="button"
          name={name}
          onClick={iconChangeHandler}
          aria-label={
            passwordType === "password" ? "Show password" : "Hide password"
          }
          className="absolute inset-y-0 right-0 flex items-center rounded-r-xl px-3.5 text-ink-400 transition-colors hover:text-brand-300"
        >
          {passwordType === "password" ? (
            <IoEyeOffOutline className="h-5 w-5" />
          ) : (
            <IoEyeOutline className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );
}

export default InputField;
