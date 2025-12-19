import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { pageAnimation } from "../../animations/page";

import AuthTabs from "../../components/specific/AuthTabs";
import EmailIcon from "../../assets/icons/Email-Icon.svg";
import PaswordIcon from "../../assets/icons/Pasword-Icon.svg";
import AuthInput from "../../components/specific/AuthInput";
import { EyeOpenIcon, EyeClosedIcon } from "../../components/layout/Icons";
import ButtonRoxo from "../../components/layout/Button";
import AuthTitle from "../../components/specific/AuthTitle";
import ValidationMessage from "../../components/specific/ValidationMessage";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


function LoginPage() {
  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // controla quando mostrar validação
  const [touched, setTouched] = useState({ email: false, password: false });
  const [activeField, setActiveField] = useState(null); // "email" | "password" | null

  // ===== validações =====
  const emailValido = email.includes("@");

  const senhaMinima = password.length >= 4;
  const senhaTemMaiuscula = /[A-Z]/.test(password);
  const senhaTemMinuscula = /[a-z]/.test(password);
  const senhaTemNumero = /[0-9]/.test(password);

  const senhaValida =
    senhaMinima && senhaTemMaiuscula && senhaTemMinuscula && senhaTemNumero;

  const handleSubmit = (e) => {
    e.preventDefault();

    // marca tudo como tocado ao tentar enviar
    setTouched({ email: true, password: true });

    if (!emailValido || !senhaValida) return;

    console.log("submit login");
  };

  // helper: mostrar validação só se:
  // - campo está ativo (em foco) OU já foi tocado
  // - E tem algo digitado
  const shouldShowEmailValidation =
    (activeField === "email" || touched.email) && email.length > 0;

  const shouldShowPasswordValidation =
    (activeField === "password" || touched.password) && password.length > 0;

  const emailRules = [
    { ok: emailValido, message: 'Email inválido (precisa conter "@")' },
  ];

  const passwordRules = [
    { ok: senhaMinima, message: "A senha deve conter pelo menos 4 caracteres" },
    {
      ok: senhaTemMaiuscula,
      message: "A senha deve conter pelo menos 1 letra maiúscula",
    },
    {
      ok: senhaTemMinuscula,
      message: "A senha deve conter pelo menos 1 letra minúscula",
    },
    { ok: senhaTemNumero, message: "A senha deve conter pelo menos 1 número" },
  ];

  return (
    <main className="w-full min-h-dvh flex flex-col pt-5 overflow-y-auto relative">
      {/* Tabs SEM animação */}
      <nav className="flex justify-center">
        <AuthTabs activeTabValor="login" />
      </nav>

      {/* Conteúdo COM animação */}
      <Motion.div {...pageAnimation} className="px-4 mb-4 pt-10">
        <AuthTitle title="Login" subtitle="Faça login para acessar sua conta" />

        <form className="mt-8 flex flex-col gap-2" onSubmit={handleSubmit}>
          {/* EMAIL */}
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

          <ValidationMessage
            show={shouldShowEmailValidation}
            rules={emailRules}
          />

          {/* SENHA */}
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
              if (!touched.password)
                setTouched((p) => ({ ...p, password: true }));
            }}
            rightIcon={showPass ? EyeOpenIcon : EyeClosedIcon}
            onRightIconClick={() => setShowPass((v) => !v)}
            rightIconAriaLabel={showPass ? "Ocultar senha" : "Mostrar senha"}
          />

          {/* Regras de senha (todas juntas) */}
          <ValidationMessage
            show={shouldShowPasswordValidation}
            rules={passwordRules}
          />

          <div className="mt-3">
            <ButtonRoxo type="submit" disabled={!emailValido || !senhaValida}>
              Fazer Login
            </ButtonRoxo>
          </div>

          <div className="pt-3">
            <div className="h-px w-full bg-black/25" />
          </div>

          <div className="w-full max-w-md">
            <GoogleOAuthProvider clientId="880656243346-25rbh2dj7sc5uga0dpg1lr618jjt73ta.apps.googleusercontent.com">
              <GoogleLogin
                text="continue_with"
                locale="pt-BR"
                width="100%"
                theme="outline"
                size="large"
                shape="pill"
                onSuccess={(response) => {
                  const token = response?.credential;
                  if (!token) {
                    console.log("Sem credential:", response);
                    return;
                  }
                  const user = jwtDecode(token);
                  console.log("Google user:", user);
                }}
                onError={() => console.log("Erro no login Google")}
              />
            </GoogleOAuthProvider>
          </div>
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
