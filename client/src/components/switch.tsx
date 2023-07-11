import React, { useCallback, useState } from "react";
interface SwitchToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}
const SwitchToggle = ({ checked, onChange }: SwitchToggleProps) => {
  const handleToggle = useCallback(() => {
    const newChecked = !checked;
    onChange(newChecked);
  }, [checked, onChange]);

  return (
    <label className="flex relative items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={handleToggle}
      />
      <div
        className={`w-9 h-4 ${
          checked ? "bg-red-300" : "bg-gray-300"
        } rounded-full shadow-inner`}
      ></div>
      <div
        className={`${
          checked ? "translate-x-5" : "translate-x-0"
        } absolute left-0 w-4 h-4 bg-white rounded-full shadow transform 
					transition-transform duration-300`}
      ></div>
    </label>
  );
};

export default SwitchToggle;
