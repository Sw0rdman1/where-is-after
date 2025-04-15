import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { createContext, useRef, useContext, ReactNode } from 'react';
import MapView from 'react-native-maps';

interface GlobalContextType {
    mapRef: React.MutableRefObject<MapView>;
    filterBottomSheetRef: React.RefObject<BottomSheetModal>;
}

const GlobalContext = createContext<GlobalContextType | null>(null);


export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const mapRef = useRef<any>(null);
    const filterBottomSheetRef = useRef<any>(null);

    return (
        <GlobalContext.Provider value={{ mapRef, filterBottomSheetRef }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};