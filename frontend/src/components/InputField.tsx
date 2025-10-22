import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, type = "text", placeholder, value, onChange, error }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

