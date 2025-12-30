import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN, REGISTER } from "../../routes/paths";

const ANIM_MS = 140; // Aumentei levemente para uma transição mais fluida

function AuthTabs({ activeTabValor }) {
  const navigate = useNavigate();

  const [animTab, setAnimTab] = useState(activeTabValor);
  const lockRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setAnimTab(activeTabValor);
  }, [activeTabValor]);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  const go = (tab) => {
    if (lockRef.current) return;
    if (tab === activeTabValor) return;

    lockRef.current = true;
    setAnimTab(tab);

    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      navigate(tab === "login" ? LOGIN : REGISTER);
      lockRef.current = false;
    }, ANIM_MS);
  };

  const isLogin = animTab === "login";

  return (
    <div className="relative flex w-[95%] max-w-100 p-1 bg-gray-100/10 md:max-w-[90%] lg:max-w-[80%] xl:max-w-[62%] 2xl:max-w-[65%] rounded-full border border-gray-200/50 backdrop-blur-sm">
      {/* Indicador Deslizante (Fundo Branco) */}
      <div
        className={`
          absolute top-1 bottom-1 left-1
          w-[calc(50%-4px)]
          bg-white rounded-full shadow-sm
          transition-transform ease-in-out
          duration-200ms
          ${isLogin ? "translate-x-0" : "translate-x-full"}
        `}
      />

      <button
        type="button"
        onClick={() => go("login")}
        className={`
          relative z-10 flex-1 py-2.5 text-sm font-roboto font-medium transition-colors duration-200
          ${isLogin ? "text-Primari-2" : "text-gray-500 hover:text-gray-700"}
        `}
      >
        Login
      </button>

      <button
        type="button"
        onClick={() => go("register")}
        className={`
          relative z-10 flex-1 py-2.5 text-sm font-roboto  font-medium transition-colors duration-200
          ${!isLogin ? "text-Primari-2" : "text-gray-500 hover:text-gray-700"}
        `}
      >
        Criar Conta
      </button>
    </div>
  );
}

export default AuthTabs;
