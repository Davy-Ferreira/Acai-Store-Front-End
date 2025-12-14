import React from "react";

/**
 * Use 1 regra (modo antigo):
 * <ValidationMessage show={show} ok={ok}>Mensagem</ValidationMessage>
 *
 * Use várias regras (modo novo):
 * <ValidationMessage show={show} rules={[{ ok: true/false, message: "..." }]} />
 */
export default function ValidationMessage({
  show = true,
  ok, // opcional (modo antigo)
  children, // opcional (modo antigo)
  rules = [], // modo novo
  className = "",
  itemClassName = "",
}) {
  // Se não deve mostrar, não renderiza nada
  if (!show) return null;

  const baseClass = `text-red-500 text-sm font-roboto ${className}`.trim();

  // ===== MODO NOVO (rules) =====
  if (rules && rules.length > 0) {
    const invalid = rules.filter((r) => !r.ok);

    // Se todas regras ok, some do HTML
    if (invalid.length === 0) return null;

    return (
      <div className={`flex flex-col gap-1 ${className}`.trim()}>
        {invalid.map((r, idx) => (
          <p key={idx} className={`text-red-500 text-sm font-roboto ${itemClassName}`.trim()}>
            {r.message}
          </p>
        ))}
      </div>
    );
  }

  // ===== MODO ANTIGO (ok + children) =====
  if (ok) return null;

  return <p className={baseClass}>{children}</p>;
}
