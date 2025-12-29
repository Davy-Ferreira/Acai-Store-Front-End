import { loginWithGoogleRequest } from "../api/auth.api";
import { appToast } from "../components/ui/toast/toast";

export function useGoogleAuth() {
  const handleGoogleSuccess = async (response) => {
    const idToken = response?.credential;

    if (!idToken) {
      appToast.error("Erro ao obter token do Google");
      return;
    }

    try {
      // Padrão esperado: { ok, status, data }
      const { ok, status, data } = await loginWithGoogleRequest(idToken);

      if (ok && data?.token) {
        localStorage.setItem("token", data.token);
        appToast.success(data?.message ?? "Login com Google realizado com sucesso");
      } else {
        appToast.error(data?.message ?? `Erro ao logar com Google (HTTP ${status})`);
      }
    } catch (err) {
      console.error(err);
      appToast.error("Erro ao realizar login com Google");
    }
  };

  const handleGoogleError = () => {
    appToast.error("Erro no login Google");
  };

  return { handleGoogleSuccess, handleGoogleError };
}