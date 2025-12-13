import React from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN, REGISTER } from "../../routes/paths";

function AuthTabs({ activeTabValor }) {
  const navigate = useNavigate();

  const getBorderClass = (tabName) => {
    return activeTabValor === tabName
      ? "border-b-2 border-Cinza-Ativo"
      : "";
  };

  return (
    <div className="flex w-[90%]">
      <div
        className={`flex-1 text-center py-3 px-4 cursor-pointer ${getBorderClass(
          "login"
        )}`}
        onClick={() => navigate(LOGIN)}
      >
        <span className="font-roboto font-normal text-black">Login</span>
      </div>

      <div
        className={`flex-1 text-center py-3 px-4 cursor-pointer ${getBorderClass(
          "register"
        )}`}
        onClick={() => navigate(REGISTER)}
      >
        <span className="font-roboto font-normal text-black">Criar Conta</span>
      </div>
    </div>
  );
}

export default AuthTabs;
