import React, { useState } from "react";
import AuthTabs from "../../components/specific/AuthTabs";
import EmailIcon from "../../assets/icons/Email-Icon.svg";
import PaswordIcon from "../../assets/icons/Pasword-Icon.svg";
import AuthInput from "../../components/specific/AuthInput";
import { EyeOpenIcon, EyeClosedIcon } from "../../components/layout/Icons";
import ButtonRoxo from "../../components/layout/Button";
import AuthTitle from "../../components/specific/AuthTitle";

function LoginPage() {
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // aqui entra sua lógica depois (supabase / api)
    console.log("submit login");
  };

  return (
    <main className="w-full min-h-dvh flex flex-col pt-5 overflow-y-auto relative">
      <nav className="flex justify-center">
        <AuthTabs activeTabValor="login" />
      </nav>

      <div className="px-4 pt-10 pb-8">
        <AuthTitle title="Login" subtitle="Faça login para acessar sua conta" />

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Label invisível (acessibilidade) */}
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <AuthInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            leftIconSrc={EmailIcon}
            leftIconAlt="Email"
            autoComplete="email"
          />

          <label htmlFor="password" className="sr-only">
            Senha
          </label>
          <AuthInput
            id="password"
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="Senha"
            leftIconSrc={PaswordIcon}
            leftIconAlt="Senha"
            autoComplete="current-password"
            rightIcon={showPass ? EyeOpenIcon : EyeClosedIcon}
            onRightIconClick={() => setShowPass((v) => !v)}
            rightIconAriaLabel={showPass ? "Ocultar senha" : "Mostrar senha"}
          />

          <ButtonRoxo type="submit">Fazer Login</ButtonRoxo>

          {/* Divider (pode virar componente depois) */}
          <div className="pt-3">
            <div className="h-px w-full bg-black/25" />
          </div>

          <button
            type="button"
            className="pt-4 text-center font-roboto text-sm text-Primari-2 underline underline-offset-4"
          >
            Esqueci minha senha?
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
