import React from "react";

function AuthSideImage({ src, alt = "Imagem", className = "", imgClassName = "" }) {
  return (
    <aside className={`hidden md:block min-h-dvh w-full overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`
          w-full h-full
          object-cover
          object-center
          select-none
          ${imgClassName}
        `}
        draggable="false"
      />
    </aside>
  );
}

export default AuthSideImage;
