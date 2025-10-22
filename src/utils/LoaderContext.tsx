import React, { useState, type ReactNode } from "react";

export interface LoaderContextType {
  showLoader: () => void;
  hideLoader: () => void;
}

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
      <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );
};


const LoaderContext = React.createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const showLoader = () => setVisible(true);
  const hideLoader = () => setVisible(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {visible && <Loader />}
    </LoaderContext.Provider>
  );
};

export { LoaderContext }