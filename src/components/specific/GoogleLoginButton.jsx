import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { ENV } from "../../config/env";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";

export default function GoogleLoginButton() {
  const { handleGoogleSuccess, handleGoogleError } = useGoogleAuth();

  return (
    <div className="w-full">
      <GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT_ID}>
        <GoogleLogin
          text="continue_with"
          locale="pt-BR"
          width="100%"
          theme="outline"
          size="large"
          shape="pill"
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </GoogleOAuthProvider>
    </div>
  );
}
