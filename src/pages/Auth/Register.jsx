import React from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";

// Animações
import { pageAnimation } from "../../animations/page";

// Hook
import { useRegisterForm } from "../../hooks/useRegisterForm";

// Auth components
import AuthTabs from "../../components/specific/AuthTabs";
import AuthInput from "../../components/specific/AuthInput";
import AuthTitle from "../../components/specific/AuthTitle";
import ValidationMessage from "../../components/specific/ValidationMessage";
import AuthNotice from "../../components/specific/AuthNotice";

// Layout / UI
import ButtonRoxo from "../../components/layout/Button";
import { EyeOpenIcon, EyeClosedIcon } from "../../components/layout/Icons";
import AuthSideImage from "../../components/layout/AuthSideImage";
import Divider from "../../components/ui/Divider";

// Assets
import EmailIcon from "../../assets/icons/Email-Icon.svg";
import PaswordIcon from "../../assets/icons/Pasword-Icon.svg";
import AcaiImage from "../../assets/images/Açai_1.png";

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
        relative
        w-screen h-screen max-h-screen
        bg-[url('/src/assets/paterns/PatternRoxoCell.svg')]
        md:bg-[url('/src/assets/paterns/PatternRoxoPc.svg')]
        bg-cover bg-center bg-no-repeat
        overflow-hidden
      "
    >
      {/* fundo com opacidade sem afetar o conteúdo */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[url('/src/assets/paterns/PatternRoxoCell.svg')]
          md:bg-[url('/src/assets/paterns/PatternRoxoPc.svg')]
          bg-cover bg-center bg-no-repeat
          opacity-25
        "
      />

      <div className="relative min-h-dvh w-full md:grid md:grid-cols-2">
        {/* LEFT */}
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
          {/* CARD (agora com as Tabs dentro) */}
          <Motion.div
            {...pageAnimation}
            className="
              w-full
              px-4
              pt-6
              pb-8
              mt-4
              mb-6
              flex
              justify-center
            "
          >
            <div
              className="
                w-full
                max-w-md
                lg:max-w-[90%]
                xl:max-w-[70%]

                rounded-4xl
                bg-white/85
                backdrop-blur-md
                border border-white/60

                shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                ring-1 ring-black/5

                px-6
                py-7
              "
            >
              {/* Tabs dentro do card */}
              <div className="flex justify-center">
                <AuthTabs activeTabValor="register" />
              </div>

              <div className="mt-7">
                <AuthTitle
                  title="Criar Conta"
                  subtitle="Crie sua conta para ter acesso ao site"
                />
              </div>

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

                <ValidationMessage show={shouldShowEmailValidation} rules={emailRules} />

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
                  rightIconAriaLabel={showPassPassword ? "Ocultar senha" : "Mostrar senha"}
                />

                <ValidationMessage show={shouldShowPasswordValidation} rules={passwordRules} />

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
                  rightIconAriaLabel={showPassConfirm ? "Ocultar confirmação" : "Mostrar confirmação"}
                />

                <ValidationMessage show={shouldShowConfirmValidation} rules={confirmRules} />

                {/* Botão */}
                <div className="mt-3">
                  <ButtonRoxo type="submit" disabled={disabled}>
                    {isSubmitting ? "Criando..." : "Criar Conta"}
                  </ButtonRoxo>

                  <AuthNotice />
                </div>

                <Divider label="OU" />

                {/* Voltar login */}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="
                    w-full
                    text-center
                    font-roboto
                    text-sm
                    text-gray-500
                    hover:text-Primari-2
                    transition-colors
                    duration-200
                  "
                >
                  Já tem uma conta?{" "}
                  <span className="text-Primari-2 font-bold underline underline-offset-8">
                    Faça Login
                  </span>
                </button>
              </form>
            </div>
          </Motion.div>
        </div>

        {/* RIGHT – imagem */}
        <AuthSideImage src={AcaiImage} alt="Açaí" imgClassName="object-center" />
      </div>
    </main>
  );
}

export default RegisterPage;
