import React from "react";

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">{children}</div>;
};
