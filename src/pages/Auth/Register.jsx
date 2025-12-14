import React, { useState } from "react";
import AuthTabs from "../../components/specific/AuthTabs";
import EmailIcon from "../../assets/icons/Email-Icon.svg";
import PaswordIcon from "../../assets/icons/Pasword-Icon.svg";
import AuthInput from "../../components/specific/AuthInput";
import AuthTitle from "../../components/specific/AuthTitle";
import ButtonRoxo from "../../components/layout/Button";
import { EyeOpenIcon, EyeClosedIcon } from "../../components/layout/Icons";

import { motion as Motion } from "framer-motion";
import { pageAnimation } from "../../animations/page";

function RegisterPage() {
  const [showPassPassword, setShowPassPassword] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit register");
  };

  return (
    <main className="w-full min-h-dvh flex flex-col pt-5 overflow-y-auto relative">
      {/* Tabs (SEM animação) */}
      <nav className="flex justify-center">
        <AuthTabs activeTabValor="register" />
      </nav>

      {/* Conteúdo (COM animação) */}
      <Motion.div {...pageAnimation} className="px-4 pt-10 pb-8">
        <AuthTitle
          title="Criar Conta"
          subtitle="Crie sua conta para ter acesso ao site"
        />

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
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
            rightIcon={showPassPassword ? EyeOpenIcon : EyeClosedIcon}
            onRightIconClick={() => setShowPassPassword((v) => !v)}
            rightIconAriaLabel={
              showPassPassword ? "Ocultar senha" : "Mostrar senha"
            }
          />

          {/* Confirm Password (independente) */}
          <AuthInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar senha"
            type={showPassConfirm ? "text" : "password"}
            placeholder="Confirmar senha"
            leftIconSrc={PaswordIcon}
            leftIconAlt="Confirmar senha"
            autoComplete="new-password"
            rightIcon={showPassConfirm ? EyeOpenIcon : EyeClosedIcon}
            onRightIconClick={() => setShowPassConfirm((v) => !v)}
            rightIconAriaLabel={
              showPassConfirm ? "Ocultar confirmação" : "Mostrar confirmação"
            }
          />

          <ButtonRoxo type="submit">Criar Conta</ButtonRoxo>

          {/* Divider */}
          <div className="pt-3">
            <div className="h-px w-full bg-black/25" />
          </div>

          {/* Já tenho conta */}
          <button
            type="button"
            className="pt-4 text-center font-roboto text-sm text-Primari-2 underline underline-offset-4"
          >
            Já Tenho Conta?
          </button>
        </form>
      </Motion.div>
    </main>
  );
}

export default RegisterPage;
