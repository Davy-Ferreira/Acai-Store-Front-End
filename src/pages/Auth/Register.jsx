import React from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";

// 1) Componentes de autenticação
import AuthTabs from "../../components/specific/AuthTabs";
import AuthInput from "../../components/specific/AuthInput";
import AuthTitle from "../../components/specific/AuthTitle";
import ValidationMessage from "../../components/specific/ValidationMessage";
import AuthNotice from "../../components/specific/AuthNotice";

// 2) Layout / UI
import ButtonRoxo from "../../components/layout/Button";
import { EyeOpenIcon, EyeClosedIcon } from "../../components/layout/Icons";
import AuthSideImage from "../../components/layout/AuthSideImage";

// 3) Assets
import EmailIcon from "../../assets/icons/Email-Icon.svg";
import PaswordIcon from "../../assets/icons/Pasword-Icon.svg";
import AcaiImage from "../../assets/images/Açai_1.png";

// 4) Animações
import { pageAnimation } from "../../animations/page";

// 5) Hook
import { useRegisterForm } from "../../hooks/useRegisterForm";

function RegisterPage() {
  const navigate = useNavigate();

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
    <main
      className="
        z-0
        w-screen h-screen max-h-screen
        bg-[url('/src/assets/paterns/PatternRoxoCell.svg')]
        md:bg-[url('/src/assets/paterns/PatternRoxoPc.svg')]
        bg-cover bg-center bg-no-repeat
      "
    >
      {/* Grid principal */}
      <div className="min-h-dvh w-full md:grid md:grid-cols-2">
        {/* LEFT – Formulário */}
        <div
          className="
            w-full min-h-dvh
            flex flex-col
            pt-5
            overflow-y-auto
            md:items-center
            md:justify-center
          "
        >
          {/* Tabs */}
          <nav className="flex justify-center w-full">
            <AuthTabs activeTabValor="register" />
          </nav>

          {/* Conteúdo */}
          <Motion.div
            {...pageAnimation}
            className="px-4 mb-4 pt-10 w-full max-w-md lg:max-w-[90%] xl:max-w-[70%]"
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

              {/* Senha */}
              <AuthInput
                id="password"
                name="password"
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

              {/* Confirmar senha */}
              <AuthInput
                id="confirmPassword"
                name="confirmPassword"
                type={showPassConfirm ? "text" : "password"}
                placeholder="Confirmar senha"
                leftIconSrc={PaswordIcon}
                leftIconAlt="Confirmar senha"
                autoComplete="new-password"
                value={confirmPassword}
                onFocus={() => setActiveField("confirmPassword")}
                onBlur={() => {
                  setActiveField(null);
                  setTouched((p) => ({
                    ...p,
                    confirmPassword: true,
                  }));
                }}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (!touched.confirmPassword) {
                    setTouched((p) => ({
                      ...p,
                      confirmPassword: true,
                    }));
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

              {/* Botão */}
              <div className="mt-3">
                <ButtonRoxo type="submit" disabled={disabled}>
                  {isSubmitting ? "Criando..." : "Criar Conta"}
                </ButtonRoxo>
                <AuthNotice />
              </div>

              {/* Divider */}
              <div className="pt-3">
                <div className="h-px w-full bg-black/25" />
              </div>

              {/* Voltar para login */}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="
                  pt-4
                  text-center
                  font-roboto
                  text-sm
                  text-Primari-2
                  underline
                  underline-offset-4
                "
              >
                Já Tenho Conta?
              </button>
            </form>
          </Motion.div>
        </div>

        {/* RIGHT – Imagem */}
        <AuthSideImage
          src={AcaiImage}
          alt="Açaí"
          imgClassName="object-center"
        />
      </div>
    </main>
  );
}

export default RegisterPage;
