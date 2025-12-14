import React from "react";

function AuthTitle({ title, subtitle }) {
  return (
    <div className="text-center">
      <h1 className="text-Primari-2 font-roboto font-extrabold text-5xl leading-none">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-black/85 font-roboto text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default AuthTitle;
