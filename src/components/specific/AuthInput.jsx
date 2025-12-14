import React from "react";

function AuthInput({
  id,
  name,
  label, // opcional (acessibilidade)
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
  disabled = false,
}) {
  const RightIconComp = typeof rightIcon === "function" ? rightIcon : null;

  return (
    <div className={`w-full ${className}`}>
      {/* Label invisível para leitores de tela */}
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Ícone esquerdo */}
        {(leftIcon || leftIconSrc) && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            {leftIcon ? (
              leftIcon
            ) : (
              <img
                src={leftIconSrc}
                alt={leftIconAlt}
                className="w-5 h-5"
              />
            )}
          </div>
        )}

        {/* Input */}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={!!error}
          className={`
            w-full
            shadow-[3px_5px_14.3px_0px_rgba(0,0,0,0.25)]
            rounded-xl
            border
            px-3 py-3
            outline-none
            transition
            bg-white
            ${leftIcon || leftIconSrc ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-purple-700 focus:ring-2 focus:ring-purple-200"
            }
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}
          `}
        />

        {/* Ícone direito (ação) */}
        {(RightIconComp || rightIcon) && (
          <button
            type="button"
            onClick={onRightIconClick}
            aria-label={rightIconAriaLabel}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            disabled={disabled}
          >
            {RightIconComp ? <RightIconComp /> : rightIcon}
          </button>
        )}
      </div>

      {/* Mensagem de erro */}
      {error && (
        <p className="mt-1 text-sm text-red-600 font-roboto">
          {error}
        </p>
      )}
    </div>
  );
}

export default AuthInput;
