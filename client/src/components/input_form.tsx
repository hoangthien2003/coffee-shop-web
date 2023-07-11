import { useCallback, useEffect, useState } from "react";

interface InputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  validate?: boolean;
  onValueChange: (value: string) => void;
  error?: string | null;
}

const StyledInputForm = ({
  id,
  name,
  type,
  placeholder,
  onValueChange,
  error,
}: InputProps) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (error) {
      setIsValid(false);
    } else setIsValid(true);
  }, [error]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      onValueChange(event.target.value);
    },
    [onValueChange, error]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setIsValid(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <div className="flex flex-col h-[4rem]">
      <label
        id={id}
        className={`card_input_border ${
          isFocused
            ? "border-purple-500"
            : isValid
            ? "border-gray-200"
            : "border-red-500"
        }`}
      >
        <input
          name={name}
          type={type}
          className="card_input_field"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
        />
      </label>
      {error && !isValid && (
        <span
          className="text-red-500
      text-[13px]"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default StyledInputForm;
