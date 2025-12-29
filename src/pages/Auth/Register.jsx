import React from "react";

// 1) UI / Componentes
import AuthTabs from "../../components/specific/AuthTabs";
import AuthInput from "../../components/specific/AuthInput";
import AuthTitle from "../../components/specific/AuthTitle";
import ValidationMessage from "../../components/specific/ValidationMessage";
import ButtonRoxo from "../../components/layout/Button";
import { EyeOpenIcon, EyeClosedIcon } from "../../components/layout/Icons";

// 2) Assets (ícones)
import EmailIcon from "../../assets/icons/Email-Icon.svg";
import PaswordIcon from "../../assets/icons/Pasword-Icon.svg";

// 3) Asset (imagem fixa)
import AcaiImage from "../../assets/images/Açai_1.png";

// 4) Animações
import { motion as Motion } from "framer-motion";
import { pageAnimation } from "../../animations/page";

// 5) Hook
import { useRegisterForm } from "../../hooks/useRegisterForm";

function RegisterPage() {
  const {
    showPassPassword,
    setShowPassPassword,
    showPassConfirm,
    setShowPassConfirm,

    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,

    touched,
    setTouched,
    setActiveField,

    emailRules,
    passwordRules,
    confirmRules,
    shouldShowEmailValidation,
    shouldShowPasswordValidation,
    shouldShowConfirmValidation,

    isSubmitting,
    disabled,
    handleSubmit,
  } = useRegisterForm();

  return (
    <main className="min-h-dvh w-full bg-white">
      {/* Layout responsivo */}
      <div className="min-h-dvh w-full md:grid md:grid-cols-2">
        {/* LEFT – formulário */}
        <div
          className="
            w-full min-h-dvh
            flex flex-col
            pt-5 overflow-y-auto
            md:items-center
          "
        >
          <nav className="flex justify-center w-full">
            <AuthTabs activeTabValor="register" />
          </nav>

          {/* 🔹 ESTE BLOCO AGORA FICA CENTRALIZADO */}
          <Motion.div
            {...pageAnimation}
            className="px-4 pt-10 pb-10 w-full max-w-md"
          >
            <AuthTitle
              title="Criar Conta"
              subtitle="Crie sua conta para ter acesso ao site"
            />

            <form className="mt-8 flex flex-col gap-2" onSubmit={handleSubmit}>
              {/* Email */}
              <AuthInput
                id="email"
                name="email"
                label="Email"
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
                  if (!touched.email) {
                    setTouched((p) => ({ ...p, email: true }));
                  }
                }}
              />

              <ValidationMessage
                show={shouldShowEmailValidation}
                rules={emailRules}
              />

              {/* Password */}
              <AuthInput
                id="password"
                name="password"
                label="Senha"
                type={showPassPassword ? "text" : "password"}
                placeholder="Senha"
                leftIconSrc={PaswordIcon}
                leftIconAlt="Senha"
                autoComplete="new-password"
                value={password}
                onFocus={() => setActiveField("password")}
                onBlur={() => {
                  setActiveField(null);
                  setTouched((p) => ({ ...p, password: true }));
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!touched.password) {
                    setTouched((p) => ({ ...p, password: true }));
                  }
                }}
                rightIcon={showPassPassword ? EyeOpenIcon : EyeClosedIcon}
                onRightIconClick={() => setShowPassPassword((v) => !v)}
                rightIconAriaLabel={
                  showPassPassword ? "Ocultar senha" : "Mostrar senha"
                }
              />

              <ValidationMessage
                show={shouldShowPasswordValidation}
                rules={passwordRules}
              />

              {/* Confirm Password */}
              <AuthInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmar senha"
                type={showPassConfirm ? "text" : "password"}
                placeholder="Confirmar senha"
                leftIconSrc={PaswordIcon}
                leftIconAlt="Confirmar senha"
                autoComplete="new-password"
                value={confirmPassword}
                onFocus={() => setActiveField("confirmPassword")}
                onBlur={() => {
                  setActiveField(null);
                  setTouched((p) => ({ ...p, confirmPassword: true }));
                }}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (!touched.confirmPassword) {
                    setTouched((p) => ({ ...p, confirmPassword: true }));
                  }
                }}
                rightIcon={showPassConfirm ? EyeOpenIcon : EyeClosedIcon}
                onRightIconClick={() => setShowPassConfirm((v) => !v)}
                rightIconAriaLabel={
                  showPassConfirm
                    ? "Ocultar confirmação"
                    : "Mostrar confirmação"
                }
              />

              <ValidationMessage
                show={shouldShowConfirmValidation}
                rules={confirmRules}
              />

              <div className="mt-3">
                <ButtonRoxo type="submit" disabled={disabled}>
                  {isSubmitting ? "Criando..." : "Criar Conta"}
                </ButtonRoxo>
              </div>

              <div className="pt-3">
                <div className="h-px w-full bg-black/25" />
              </div>

              <button
                type="button"
                className="pt-4 text-center font-roboto text-sm text-Primari-2 underline underline-offset-4"
              >
                Já Tenho Conta?
              </button>
            </form>
          </Motion.div>
        </div>

        {/* RIGHT – imagem (tablet+) */}
        <aside className="hidden md:block min-h-dvh w-full overflow-hidden">
          <img
            src={AcaiImage}
            alt="Açaí"
            className="
              w-full
              h-full
              object-cover
              object-center
              drop-shadow-2xl
              select-none
            "
            draggable="false"
          />
        </aside>
      </div>
    </main>
  );
}

export default RegisterPage;
