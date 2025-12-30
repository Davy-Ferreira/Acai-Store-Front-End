import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN, REGISTER } from "../../routes/paths";

const ANIM_MS = 140; // tempo da animação (tem que bater com o duration-*)

function AuthTabs({ activeTabValor }) {
  const navigate = useNavigate();

  // Estado local só para animar antes de trocar de rota
  const [animTab, setAnimTab] = useState(activeTabValor);
  const lockRef = useRef(false);
  const timerRef = useRef(null);

  // Mantém o underline sincronizado quando a rota muda por outros meios
  useEffect(() => {
    setAnimTab(activeTabValor);
  }, [activeTabValor]);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  const go = (tab) => {
    if (lockRef.current) return;            // evita spam de clique
    if (tab === activeTabValor) return;     // já está nessa página

    lockRef.current = true;
    setAnimTab(tab);                        // 1) dispara animação

    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      // 2) navega depois da animação
      navigate(tab === "login" ? LOGIN : REGISTER);
      lockRef.current = false;
    }, ANIM_MS);
  };

  const isLogin = animTab === "login";

  return (
    <div className="relative flex xl:max-w-[70%] w-[90%]">
      <button
        type="button"
        onClick={() => go("login")}
        className="flex-1 py-3 text-center font-roboto font-normal text-Primari-2 "
      >
        Login
      </button>

      <button
        type="button"
        onClick={() => go("register")}
        className="flex-1 py-3 text-center font-roboto font-normal text-Primari-2"
      >
        Criar Conta
      </button>

      {/* Underline animado */}
      <span
        className={`
          absolute bottom-0 left-0
          h-0.5 w-1/2
          bg-Primari-2
          transition-transform ease-out
          duration-[${ANIM_MS}ms]
          ${isLogin ? "translate-x-0" : "translate-x-full"}
        `}
      />
    </div>
  );
}

export default AuthTabs;
