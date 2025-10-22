import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, primary = true }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
        primary ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
      }`}
    >
      {children}
    </button>
  );
};
