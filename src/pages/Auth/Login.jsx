import React from "react";
import AuthTabs from "../../components/specific/AuthTabs";
import EmailIcon from "../../assets/icons/Email-Icon.svg";
import PaswordIcon from "../../assets/icons/Pasword-Icon.svg";
import AuthInput from "../../components/specific/AuthInput";
import Toast from "../../components/layout/Toast";
import { EyeOpenIcon, EyeClosedIcon } from "../../components/layout/Icons";
import { useToast } from "../../hooks/useToast";
import { useLoginForm } from "../../hooks/useLoginForm";

function LoginPage() {
  const { toast, showToast } = useToast();
  const {
    email, setEmail,
    password, setPassword,
    showPass, setShowPass,
    isSubmitting,
    errors, setErrors,
    submit,
  } = useLoginForm(showToast);

  return (
    <main className="w-full flex flex-col pt-5 h-full overflow-hidden relative">
      <Toast open={toast.open} type={toast.type} message={toast.message} />

      <nav className="flex justify-center">
        <AuthTabs activeTabValor="login" />
      </nav>

      <div className="px-4 pt-10 pb-8">
        <div className="text-center">
          <h1 className="text-Primari-2 font-roboto font-extrabold text-5xl leading-none">
            Login
          </h1>
          <p className="mt-3 text-black/70 font-roboto text-base">
            Faça login para acessar sua conta
          </p>
        </div>

        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={(e) => { e.preventDefault(); submit(); }}
        >
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
              className={errors.email ? "[&>input]:border-red-500 [&>input]:focus:ring-red-200" : ""}
            />
            {errors.email && <p className="mt-1 text-xs font-roboto text-red-600">{errors.email}</p>}
          </div>

          <div>
            <AuthInput
              type={showPass ? "text" : "password"}
              placeholder="Password"
              leftIconSrc={PaswordIcon}
              leftIconAlt="Senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((p) => ({ ...p, password: "" }));
              }}
              autoComplete="current-password"
              rightIcon={showPass ? EyeOpenIcon : EyeClosedIcon}
              onRightIconClick={() => setShowPass((v) => !v)}
              rightIconAriaLabel={showPass ? "Ocultar senha" : "Mostrar senha"}
              className={errors.password ? "[&>input]:border-red-500 [&>input]:focus:ring-red-200" : ""}
            />
            {errors.password && <p className="mt-1 text-xs font-roboto text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-2 h-13 w-full rounded-xl bg-Primari-2 text-white font-roboto font-normal shadow-lg shadow-black/10 transition
              ${isSubmitting ? "opacity-70 cursor-not-allowed" : "active:scale-[0.99] hover:brightness-110"}`}
          >
            {isSubmitting ? "Entrando..." : "Fazer Login"}
          </button>

          <div className="pt-3">
            <div className="h-px w-full bg-black/25" />
          </div>

          <button
            type="button"
            className="pt-4 text-center font-roboto text-sm text-Primari-2 underline underline-offset-4"
            onClick={() => showToast("info", "Fluxo de recuperação ainda não implementado.")}
          >
            Esqueci minha senha?
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
