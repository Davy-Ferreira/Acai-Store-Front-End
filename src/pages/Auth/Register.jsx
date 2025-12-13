import React, { useState } from "react";
import AuthTabs from "../../components/specific/AuthTabs";
import EmailIcon from "../../assets/icons/Email-Icon.svg";
import PaswordIcon from "../../assets/icons/Pasword-Icon.svg";
import AuthInput from "../../components/specific/AuthInput";

function RegisterPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassPassword, setShowPassPassword] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // erros por campo
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // toast
  const [toast, setToast] = useState({
    open: false,
    type: "info", // "success" | "error" | "warning" | "info"
    message: "",
  });

  const showToast = (type, message) => {
    setToast({ open: true, type, message });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => {
      setToast((t) => ({ ...t, open: false }));
    }, 2600);
  };

  // ✅ Regras
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const passwordRules = {
    minLength: 4,
    upper: /[A-Z]/,
    lower: /[a-z]/,
  };

  const validate = () => {
    const next = { email: "", password: "", confirmPassword: "" };

    const emailTrim = email.trim();

    // ===== EMAIL (gmail) =====
    if (!emailTrim) {
      next.email = "Informe seu e-mail.";
    } else if (!gmailRegex.test(emailTrim)) {
      next.email = "Use um e-mail válido do Gmail (ex: nome@gmail.com).";
    }

    // ===== PASSWORD =====
    if (!password) {
      next.password = "Crie uma senha.";
    } else if (password.length < passwordRules.minLength) {
      next.password = "A senha deve ter no mínimo 4 caracteres.";
    } else if (!passwordRules.upper.test(password)) {
      next.password = "A senha deve conter pelo menos 1 letra MAIÚSCULA.";
    } else if (!passwordRules.lower.test(password)) {
      next.password = "A senha deve conter pelo menos 1 letra minúscula.";
    }

    // ===== CONFIRM PASSWORD =====
    if (!confirmPassword) {
      next.confirmPassword = "Confirme sua senha.";
    } else if (password && confirmPassword !== password) {
      next.confirmPassword = "As senhas não coincidem.";
    }

    setErrors(next);

    // Toast inteligente (primeiro erro)
    if (next.email) {
      showToast("warning", next.email);
      return false;
    }
    if (next.password) {
      showToast("warning", next.password);
      return false;
    }
    if (next.confirmPassword) {
      showToast("warning", next.confirmPassword);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const ok = validate();
    if (!ok) return;

    try {
      setIsSubmitting(true);

      // ✅ Aqui você chamaria sua API/Supabase:
      // await supabase.auth.signUp({ email, password })

      await new Promise((r) => setTimeout(r, 900));
      showToast("success", "Conta criada no front-end! Agora integre com o backend.");
    } catch {
      showToast("error", "Não foi possível criar a conta. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 👁️ Olho aberto (fill)
  const EyeOpenIcon = (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );

  // 🙈 Olho fechado (stroke)
  const EyeClosedIcon = (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a21.77 21.77 0 0 1 5.06-6.06" />
      <path d="M1 1l22 22" />
      <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5a3.5 3.5 0 0 0 2.47-1.03" />
      <path d="M14.47 14.47A3.5 3.5 0 0 0 9.53 9.53" />
      <path d="M12 4c7 0 10 8 10 8a21.82 21.82 0 0 1-3.17 4.46" />
    </svg>
  );

  const toastStyles = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-amber-600",
    info: "bg-black",
  };

  return (
    <main className="w-full flex flex-col pt-5 h-full overflow-hidden relative">
      {/* Toast */}
      {toast.open && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div
            className={`${toastStyles[toast.type]} text-white px-4 py-3 rounded-xl shadow-lg font-roboto text-sm`}
            role="status"
            aria-live="polite"
          >
            {toast.message}
          </div>
        </div>
      )}

      {/* Tabs */}
      <nav className="flex justify-center">
        <AuthTabs activeTabValor="register" />
      </nav>

      {/* Conteúdo */}
      <div className="px-4 pt-10 pb-8">
        {/* Títulos */}
        <div className="text-center">
          <h1 className="text-Primari-2 font-roboto font-extrabold text-4xl leading-none">
            Criar Conta
          </h1>
          <p className="mt-3 text-black/70 font-roboto text-base">
            Crie sua conta para ter acesso ao site
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <AuthInput
              type="email"
              placeholder="Email"
              leftIconSrc={EmailIcon}
              leftIconAlt="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((p) => ({ ...p, email: "" }));
              }}
              autoComplete="email"
              className={
                errors.email
                  ? "[&>input]:border-red-500 [&>input]:focus:ring-red-200"
                  : ""
              }
            />
            {errors.email && (
              <p className="mt-1 text-xs font-roboto text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <AuthInput
              type={showPassPassword ? "text" : "password"}
              placeholder="Password"
              leftIconSrc={PaswordIcon}
              leftIconAlt="Senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((p) => ({ ...p, password: "" }));
                // se o user muda a senha, revalida confirmação (mas sem ficar chato)
                if (errors.confirmPassword && confirmPassword === e.target.value) {
                  setErrors((p) => ({ ...p, confirmPassword: "" }));
                }
              }}
              autoComplete="new-password"
              rightIcon={showPassPassword ? EyeOpenIcon : EyeClosedIcon}
              onRightIconClick={() => setShowPassPassword((v) => !v)}
              rightIconAriaLabel={
                showPassPassword ? "Ocultar senha" : "Mostrar senha"
              }
              className={
                errors.password
                  ? "[&>input]:border-red-500 [&>input]:focus:ring-red-200"
                  : ""
              }
            />
            {errors.password && (
              <p className="mt-1 text-xs font-roboto text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password (independente) */}
          <div>
            <AuthInput
              type={showPassConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              leftIconSrc={PaswordIcon}
              leftIconAlt="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
                  setErrors((p) => ({ ...p, confirmPassword: "" }));
              }}
              autoComplete="new-password"
              rightIcon={showPassConfirm ? EyeOpenIcon : EyeClosedIcon}
              onRightIconClick={() => setShowPassConfirm((v) => !v)}
              rightIconAriaLabel={
                showPassConfirm ? "Ocultar confirmação" : "Mostrar confirmação"
              }
              className={
                errors.confirmPassword
                  ? "[&>input]:border-red-500 [&>input]:focus:ring-red-200"
                  : ""
              }
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs font-roboto text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-2 h-13 w-full rounded-xl bg-Primari-2 text-white font-roboto font-normal shadow-lg shadow-black/10 transition
              ${isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "active:scale-[0.99] hover:brightness-110"
              }`}
          >
            {isSubmitting ? "Criando..." : "Criar Conta"}
          </button>

          {/* Linha separadora */}
          <div className="pt-3">
            <div className="h-px w-full bg-black/25" />
          </div>

          {/* Já tenho conta */}
          <button
            type="button"
            className="pt-4 text-center font-roboto text-sm text-Primari-2 underline underline-offset-4"
            onClick={() => showToast("info", "Levar para tela de Login (rota) ainda não implementado.")}
          >
            Já Tenho Conta?
          </button>
        </form>
      </div>
    </main>
  );
}

export default RegisterPage;
