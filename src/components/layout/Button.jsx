function ButtonRoxo({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-2 h-13 w-full rounded-xl bg-[linear-gradient(270deg,#821266,#6C1356)] text-white font-roboto font-normal shadow-lg shadow-black/10 transition active:scale-[0.99] hover:brightness-110"
    >
      {children}
    </button>
  );
}

export default ButtonRoxo;
