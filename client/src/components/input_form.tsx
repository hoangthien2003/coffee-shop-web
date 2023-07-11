import { useCallback, useState } from "react";

interface InputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  validate?: boolean;
  onValueChange: (value: string) => void;
}

const StyledInputForm = ({
  id,
  name,
  type,
  placeholder,
  validate = false,
  onValueChange,
}: InputProps) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (validate) {
        setIsValid(true);
      }
      onValueChange(event.target.value);
    },
    [onValueChange, validate]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (validate && value.trim() === "") {
      setIsValid(false);
    }
  }, [validate, value]);

  return (
    <div className="flex flex-col">
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
        />
      </label>
      {!isValid && <span className="text-red-500">Invalid {name}!</span>}
    </div>
  );
};

export default StyledInputForm;
