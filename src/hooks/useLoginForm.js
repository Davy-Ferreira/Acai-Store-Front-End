import { useState } from "react";
import {
  validateEmail,
  validatePassword,
} from "../utils/Validators/authValidators";

function useLoginFormImpl(showToast) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function submit() {
    setIsSubmitting(true);
    const emailRes = validateEmail(email);
    const passRes = validatePassword(password);

    const nextErrors = {};
    if (!emailRes.valid) nextErrors.email = emailRes.error;
    if (!passRes.valid) nextErrors.password = passRes.error;
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      if (typeof showToast === "function")
        showToast("success", "Login efetuado com sucesso");
    } else {
      if (typeof showToast === "function")
        showToast("error", "Verifique os campos antes de continuar");
    }
    setIsSubmitting(false);
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPass,
    setShowPass,
    isSubmitting,
    errors,
    setErrors,
    submit,
  };
}

export function useLoginForm(showToast) {
  return useLoginFormImpl(showToast);
}

export default useLoginFormImpl;
