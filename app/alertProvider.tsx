import React, { createContext, useContext, useState } from 'react';

type AlertContextType = {
    showAlert: boolean;
    setShowAlert: (show: boolean) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false);
    return (
        <AlertContext.Provider value={{ showAlert, setShowAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
