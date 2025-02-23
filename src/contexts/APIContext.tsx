import { APIService } from "@services/api/api.service";
import { createContext, ReactNode } from "react";

export const APIContext = createContext<APIService | null>(null);

export const APIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const service = new APIService();

  return (
    <APIContext.Provider value={service}>
      {children}
    </APIContext.Provider>
  );
};
