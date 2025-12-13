export function validateEmail(email) {
  const trimmed = String(email || '').trim();
  if (!trimmed) {
    return { valid: false, error: 'Email é obrigatório' };
  }
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!gmailRegex.test(trimmed)) {
    return { valid: false, error: 'Use um email @gmail.com válido' };
  }
  return { valid: true, error: '' };
}

export function validatePassword(password) {
  const value = String(password || '');
  if (value.length < 4) {
    return { valid: false, error: 'Senha deve ter no mínimo 4 caracteres' };
  }
  if (!/[A-Z]/.test(value)) {
    return { valid: false, error: 'Senha deve ter ao menos 1 letra maiúscula' };
  }
  if (!/[a-z]/.test(value)) {
    return { valid: false, error: 'Senha deve ter ao menos 1 letra minúscula' };
  }
  return { valid: true, error: '' };
}

export function validateConfirmPassword(password, confirm) {
  const confirmValue = String(confirm || '');
  if (!confirmValue) {
    return { valid: false, error: 'Confirmar senha é obrigatório' };
  }
  if (String(password || '') !== confirmValue) {
    return { valid: false, error: 'As senhas devem ser iguais' };
  }
  return { valid: true, error: '' };
}
