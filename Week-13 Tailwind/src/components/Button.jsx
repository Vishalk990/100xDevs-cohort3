export const Button = ({ disabled, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full font-medium rounded-lg text-md cursor-pointer text-white px-32 py-2 ${
        disabled ? "bg-blue-200" : "bg-green-400 text-black"
      }`}
    >
      {children}
    </button>
  );
};
