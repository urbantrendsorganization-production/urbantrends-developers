import { createContext, useContext, useState } from "react";

const DeveloperContext = createContext();

export const DeveloperProvider = ({ children }) => {
  const [developerId, setDeveloperId] = useState(localStorage.getItem("developerId") || null);

  return (
    <DeveloperContext.Provider value={{ developerId, setDeveloperId }}>
      {children}
    </DeveloperContext.Provider>
  );
};

export const useDeveloper = () => useContext(DeveloperContext);
