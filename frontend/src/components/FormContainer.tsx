import React from "react";

export const FormContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white px-4">{children}</div>;
};
