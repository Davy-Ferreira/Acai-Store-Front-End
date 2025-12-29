// 1) React / libs
import React from "react";
import { motion as Motion } from "framer-motion";

// 2) Animações / configs
import { pageAnimation } from "../../animations/page";

// 3) Hooks
import { useLoginForm } from "../../hooks/useLoginForm";

// 4) Componentes (página/auth)
import AuthTabs from "../../components/specific/AuthTabs";
import AuthTitle from "../../components/specific/AuthTitle";
import AuthInput from "../../components/specific/AuthInput";
import ValidationMessage from "../../components/specific/ValidationMessage";
import GoogleLoginButton from "../../components/specific/GoogleLoginButton";
import AuthNotice from "../../components/specific/AuthNotice";

// 5) Componentes (layout/UI)
import ButtonRoxo from "../../components/layout/Button";
import { EyeOpenIcon, EyeClosedIcon } from "../../components/layout/Icons";
import Divider from "../../components/ui/Divider";

// 6) Assets
import EmailIcon from "../../assets/icons/Email-Icon.svg";
import PaswordIcon from "../../assets/icons/Pasword-Icon.svg";

function LoginPage() {
  const {
    showPass,
    setShowPass,
    email,
    setEmail,
    password,
    setPassword,
    touched,
    setTouched,
    setActiveField,

    emailRules,
    passwordRules,
    shouldShowEmailValidation,
    shouldShowPasswordValidation,

    isSubmitting,
    disabled,
    handleSubmit,
  } = useLoginForm();

  return (
    <main className="w-full min-h-dvh flex flex-col pt-5 overflow-y-auto relative">
      <nav className="flex justify-center">
        <AuthTabs activeTabValor="login" />
      </nav>

      <Motion.div {...pageAnimation} className="px-4 mb-4 pt-10">
        <AuthTitle title="Login" subtitle="Faça login para acessar sua conta" />

        <form className="mt-8 flex flex-col gap-2" onSubmit={handleSubmit}>
          <AuthInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            leftIconSrc={EmailIcon}
            leftIconAlt="Email"
            autoComplete="email"
            value={email}
            onFocus={() => setActiveField("email")}
            onBlur={() => {
              setActiveField(null);
              setTouched((p) => ({ ...p, email: true }));
            }}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!touched.email) setTouched((p) => ({ ...p, email: true }));
            }}
          />

          <ValidationMessage show={shouldShowEmailValidation} rules={emailRules} />

          <AuthInput
            id="password"
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="Senha"
            leftIconSrc={PaswordIcon}
            leftIconAlt="Senha"
            autoComplete="current-password"
            value={password}
            onFocus={() => setActiveField("password")}
            onBlur={() => {
              setActiveField(null);
              setTouched((p) => ({ ...p, password: true }));
            }}
            onChange={(e) => {
              setPassword(e.target.value);
              if (!touched.password) setTouched((p) => ({ ...p, password: true }));
            }}
            rightIcon={showPass ? EyeOpenIcon : EyeClosedIcon}
            onRightIconClick={() => setShowPass((v) => !v)}
            rightIconAriaLabel={showPass ? "Ocultar senha" : "Mostrar senha"}
          />

          <ValidationMessage show={shouldShowPasswordValidation} rules={passwordRules} />

          <div className="mt-3">
            <ButtonRoxo type="submit" disabled={disabled}>
              {isSubmitting ? "Entrando..." : "Fazer Login"}
            </ButtonRoxo>

            <AuthNotice />
          </div>

          <Divider label="OU" />

          <GoogleLoginButton />

          <button
            type="button"
            className="pt-4 text-center font-roboto text-sm text-Primari-2 underline underline-offset-4"
          >
            Esqueci minha senha?
          </button>
        </form>
      </Motion.div>
    </main>
  );
}

export default LoginPage;
