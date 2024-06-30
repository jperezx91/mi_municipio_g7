import React, { createContext, useState } from 'react';

const CoordStateContext = createContext();

export const CoordStateProvider = ({ children }) => {
    const [location, setLocation] = useState({
        "latitude": 0,
        "longitude": 0
    });

    return (
        <CoordStateContext.Provider value={{location, setLocation }}>
            {children}
        </CoordStateContext.Provider>
    );
};

export const useCoordState = () => React.useContext(CoordStateContext);
