import React from "react";

/**
 * rules: [
 *   { ok: boolean, message: string }
 * ]
 * show: boolean (ex: value.length > 0)
 */
export default function ValidationRules({
  rules = [],
  show = false,
  className = "",
}) {
  if (!show) return null;

  const invalidRules = rules.filter((rule) => !rule.ok);

  // Se todas as regras estão ok → some do HTML
  if (invalidRules.length === 0) return null;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {invalidRules.map((rule, index) => (
        <p
          key={index}
          className="text-red-500 text-sm font-roboto"
        >
          {rule.message}
        </p>
      ))}
    </div>
  );
}
