import { useMemo, useState } from "react";
import { loginRules } from "../Validators/auth.validators"; // ajuste se seu path for outro
import { loginRequest } from "../api/auth.api";
import { appToast } from "../components/ui/toast/toast";

export function useLoginForm() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [touched, setTouched] = useState({ email: false, password: false });
  const [activeField, setActiveField] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const rules = useMemo(() => loginRules(email, password), [email, password]);

  const shouldShowEmailValidation =
    (activeField === "email" || touched.email) && email.length > 0;

  const shouldShowPasswordValidation =
    (activeField === "password" || touched.password) && password.length > 0;

  const disabled = isSubmitting || !rules.emailOk || !rules.passwordOk;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // marca como tocado para mostrar mensagens
    setTouched({ email: true, password: true });

    if (!rules.emailOk || !rules.passwordOk) return;

    try {
      setIsSubmitting(true);

      const { ok, status, data } = await loginRequest(email, password);

      if (ok) {
        appToast.success(data?.message ?? "Login realizado com sucesso!");
        if (data?.token) localStorage.setItem("token", data.token);
        return;
      }

      if (status === 404) return appToast.error(data?.message ?? "Usuário não encontrado.");
      if (status === 401) return appToast.error(data?.message ?? "Senha inválida.");

      appToast.error(data?.message ?? `Erro ao logar (HTTP ${status})`);
    } catch (err) {
      console.error(err);
      appToast.error("Falha de conexão com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // state
    showPass,
    setShowPass,
    email,
    setEmail,
    password,
    setPassword,
    touched,
    setTouched,
    activeField,
    setActiveField,

    // rules (para UI)
    emailOk: rules.emailOk,
    passwordOk: rules.passwordOk,
    emailRules: rules.emailRules,
    passwordRules: rules.passwordRules,
    shouldShowEmailValidation,
    shouldShowPasswordValidation,

    // submit
    isSubmitting,
    disabled,
    handleSubmit,
  };
}
