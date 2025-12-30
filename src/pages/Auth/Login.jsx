import React from "react";
import { motion as Motion } from "framer-motion";

// Animações
import { pageAnimation } from "../../animations/page";

// Hook
import { useLoginForm } from "../../hooks/useLoginForm";

// Auth components
import AuthTabs from "../../components/specific/AuthTabs";
import AuthTitle from "../../components/specific/AuthTitle";
import AuthInput from "../../components/specific/AuthInput";
import ValidationMessage from "../../components/specific/ValidationMessage";
import GoogleLoginButton from "../../components/specific/GoogleLoginButton";
import AuthNotice from "../../components/specific/AuthNotice";

// Layout / UI
import ButtonRoxo from "../../components/layout/Button";
import { EyeOpenIcon, EyeClosedIcon } from "../../components/layout/Icons";
import Divider from "../../components/ui/Divider";
import AuthSideImage from "../../components/layout/AuthSideImage";

// Assets
import EmailIcon from "../../assets/icons/Email-Icon.svg";
import PaswordIcon from "../../assets/icons/Pasword-Icon.svg";
import AcaiImage from "../../assets/images/Açai_1.png";

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
      {/* overlay de opacidade do pattern */}
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
        {/* LEFT – formulário */}
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
          {/* CARD */}
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
              {/* Tabs agora dentro do card */}
              <div className="flex justify-center">
                <AuthTabs activeTabValor="login" />
              </div>

              <div className="mt-7">
                <AuthTitle
                  title="Login"
                  subtitle="Faça login para acessar sua conta"
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

                <ValidationMessage
                  show={shouldShowEmailValidation}
                  rules={emailRules}
                />

                {/* Senha */}
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
                    if (!touched.password) {
                      setTouched((p) => ({ ...p, password: true }));
                    }
                  }}
                  rightIcon={showPass ? EyeOpenIcon : EyeClosedIcon}
                  onRightIconClick={() => setShowPass((v) => !v)}
                  rightIconAriaLabel={
                    showPass ? "Ocultar senha" : "Mostrar senha"
                  }
                />

                <ValidationMessage
                  show={shouldShowPasswordValidation}
                  rules={passwordRules}
                />

                {/* Botão */}
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
                  Esqueci minha senha?
                </button>
              </form>
            </div>
          </Motion.div>
        </div>

        {/* RIGHT – imagem */}
        <AuthSideImage
          src={AcaiImage}
          alt="Açaí"
          imgClassName="object-center"
        />
      </div>
    </main>
  );
}

export default LoginPage;
