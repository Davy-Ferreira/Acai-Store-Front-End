import React from "react";

function AuthTitle({ title, subtitle }) {
  return (
    <div className="text-center px-2">
      <h1
        className="
          text-Primari-2 font-roboto font-extrabold leading-none
          text-5xl sm:text-4xl md:text-5xl lg:text-6xl
        "
      >
        {title}
      </h1>

      {subtitle && (
        <p
          className="
            mt-3 text-black/85 font-roboto
            text-1xl sm:text-base md:text-lg
          "
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default AuthTitle;
