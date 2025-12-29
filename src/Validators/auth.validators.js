export function validateEmail(email) {
  return String(email || "").includes("@");
}

export function passwordChecks(password) {
  const p = String(password || "");

  const min = p.length >= 4;
  const upper = /[A-Z]/.test(p);
  const lower = /[a-z]/.test(p);
  const number = /[0-9]/.test(p);

  const valid = min && upper && lower && number;

  return { min, upper, lower, number, valid };
}

export function loginRules(email, password) {
  const emailOk = validateEmail(email);
  const pass = passwordChecks(password);

  return {
    emailOk,
    passwordOk: pass.valid,
    emailRules: [{ ok: emailOk, message: 'Email inválido (precisa conter "@")' }],
    passwordRules: [
      { ok: pass.min, message: "A senha deve conter pelo menos 4 caracteres" },
      { ok: pass.upper, message: "A senha deve conter pelo menos 1 letra maiúscula" },
      { ok: pass.lower, message: "A senha deve conter pelo menos 1 letra minúscula" },
      { ok: pass.number, message: "A senha deve conter pelo menos 1 número" },
    ],
  };
}
