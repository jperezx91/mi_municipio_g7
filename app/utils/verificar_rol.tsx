import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

// Código para determinar si el usuario es vecino o inspector

export function comprobarSiEsInspector () {

    const token = SecureStore.getItem("bearerToken");
    let esInspector;
    if(token){
        const payload = jwtDecode(token)
        // @ts-ignore
        const rol = payload["rol"];
        esInspector = (rol == "municipal");
    } else {
        esInspector = false;
    }
    return esInspector;
}