import React from 'react';
import { useCoordState } from "@/app/networking/context";
import MapComponent from '@/app/components/MapaComponente';

function CargarMapa() {
    const { setLocation } = useCoordState();
    return (
        <MapComponent alElegirUbicacion={setLocation} />
    );
}

export default CargarMapa;