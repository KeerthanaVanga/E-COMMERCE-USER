const InputField = ({
  type = "text",
  placeholder,
  name,
  required = false,
  value,
  checked,
  onChange,
  children,
}) => {
  if (type === "radio") {
    return (
      <label className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          required={required}
        />
        {children}
      </label>
    );
  }

  return (
    <input
      className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
      type={type}
      placeholder={placeholder}
      name={name}
      required={required}
    />
  );
};

export default InputField;
