import { useMemo, useState } from "react";
import { loginRules } from "../Validators/auth.validators";
import { registerRequest } from "../api/auth.api";
import { appToast } from "../components/ui/toast/toast";

export function useRegisterForm() {
  const [showPassPassword, setShowPassPassword] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [activeField, setActiveField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Reaproveita as mesmas regras do login (email + senha)
  const base = useMemo(() => loginRules(email, password), [email, password]);

  // ✅ Regras confirmar senha (USANDO message — compatível com ValidationMessage)
  const confirmRules = useMemo(() => {
    const hasConfirm = (confirmPassword || "").length > 0;
    const same = hasConfirm && password === confirmPassword;

    return [
      { ok: hasConfirm, message: "Confirme sua senha" },
      { ok: same, message: "Senhas não são iguais" },
    ];
  }, [password, confirmPassword]);

  const confirmOk = confirmRules.every((r) => r.ok);

  // ✅ Quando mostrar validações (mesmo padrão do login)
  const shouldShowEmailValidation =
    (activeField === "email" || touched.email) && email.length > 0;

  const shouldShowPasswordValidation =
    (activeField === "password" || touched.password) && password.length > 0;

  const shouldShowConfirmValidation =
    (activeField === "confirmPassword" || touched.confirmPassword) &&
    (confirmPassword.length > 0 || touched.confirmPassword);

  // ✅ Separar validação de loading
  const canSubmit = base.emailOk && base.passwordOk && confirmOk;
  const disabled = isSubmitting || !canSubmit;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // força exibir validações quando tenta enviar
    setTouched({ email: true, password: true, confirmPassword: true });

    if (!canSubmit) return;

    try {
      setIsSubmitting(true);

      const { ok, status, data } = await registerRequest(email, password);

      if (ok) {
        if (data?.token) localStorage.setItem("token", data.token);
        appToast.success(data?.message ?? "Conta criada com sucesso!");
        return;
      }

      if (status === 409) return appToast.error(data?.message ?? "Email já cadastrado.");
      if (status === 400) return appToast.error(data?.message ?? "Dados inválidos.");
      if (status === 500) return appToast.error("Erro interno. Tente novamente.");

      appToast.error(data?.message ?? `Erro ao criar conta (HTTP ${status})`);
    } catch (err) {
      console.error(err);
      appToast.error("Falha de conexão com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // visibilidade senha
    showPassPassword,
    setShowPassPassword,
    showPassConfirm,
    setShowPassConfirm,

    // inputs
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,

    // ui states
    touched,
    setTouched,
    activeField,
    setActiveField,

    // validações para UI
    emailRules: base.emailRules,
    passwordRules: base.passwordRules,
    confirmRules,
    shouldShowEmailValidation,
    shouldShowPasswordValidation,
    shouldShowConfirmValidation,

    // submit
    isSubmitting,
    disabled,
    handleSubmit,
  };
}
