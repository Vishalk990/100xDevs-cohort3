export const Input = ({ onChange, type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-lg text-sm cursor-pointer text-white px-4 py-3 bg-blue-600 focus:outline-none`}
    />
  );
};
