import React from "react";

export default function AuthNotice({
  text = "🔒 Seus dados são protegidos e nunca compartilhados.",
  className = "",
}) {
  return (
    <p className={`mt-2 text-center text-xs text-black/60 ${className}`}>
      {text}
    </p>
  );
}
