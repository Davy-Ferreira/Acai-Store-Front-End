import React from "react";

function AuthInput({
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  leftIcon,
  leftIconSrc,
  leftIconAlt = "",
  rightIcon,
  onRightIconClick,
  rightIconAriaLabel,
  error,
  className = "",
  autoComplete,
}) {
  const RightIconComp = typeof rightIcon === "function" ? rightIcon : null;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {(leftIcon || leftIconSrc) && (
          <div className="absolute inset-y-0 left-3 flex items-center">
            {leftIcon ? (
              leftIcon
            ) : (
              <img src={leftIconSrc}  alt={leftIconAlt} className="w-5 h-5 " />
            )}
          </div>
        )}
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full  bg-white rounded-xl border px-3 py-3 outline-none transition ${
            leftIcon || leftIconSrc ? "pl-10" : ""
          } ${rightIcon ? "pr-10" : ""} ${
            error ? "border-red-500" : "border-gray-300 focus:border-purple-700"
          }`}
        />
        {(RightIconComp || rightIcon) && (
          <button
            type="button"
            onClick={onRightIconClick}
            aria-label={rightIconAriaLabel}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer" 
          >
            {RightIconComp ? <RightIconComp /> : rightIcon}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
export default AuthInput;
