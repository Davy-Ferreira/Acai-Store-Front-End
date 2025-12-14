function ButtonRoxo({ children, onClick, type = "button", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        mt-2 h-13 w-full rounded-xl
        bg-[linear-gradient(270deg,#821266,#6C1356)]
        text-white font-roboto font-normal

        shadow-[6px_5px_17.6px_0px_rgba(0,0,0,0.25)]

        transition-all duration-200 ease-out

        hover:brightness-110 hover:-translate-y-px
        hover:shadow-[6px_7px_20px_0px_rgba(0,0,0,0.28)]

        active:translate-y-px active:scale-[0.98]
        active:shadow-[4px_3px_12px_0px_rgba(0,0,0,0.22)]

        focus:outline-none
        focus:ring-2 focus:ring-Primari-2/40
        focus:ring-offset-2

        disabled:opacity-60
        disabled:cursor-not-allowed
        disabled:hover:brightness-100
        disabled:hover:translate-y-0
        disabled:hover:shadow-[6px_5px_17.6px_0px_rgba(0,0,0,0.25)]
      `}
    >
      {children}
    </button>
  );
}

export default ButtonRoxo;
