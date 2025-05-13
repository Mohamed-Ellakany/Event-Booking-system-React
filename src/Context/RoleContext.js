import { createContext, useEffect, useState } from "react";

export let RoleContext = createContext();

export default function RoleContextProvider({ children }) {
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || null;
  });

  useEffect(() => {
    if (userRole) {
      localStorage.setItem("userRole", userRole);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [userRole]);

  return (
    <RoleContext.Provider value={{ userRole, setRole: setUserRole }}>
      {children}
    </RoleContext.Provider>
  );
}
