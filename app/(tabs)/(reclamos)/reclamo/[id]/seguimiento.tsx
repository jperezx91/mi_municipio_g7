import React, { useEffect, useState } from 'react';
import {ScrollView, View, Text, Dimensions, TextInput, TextInputProps, StyleProp, ViewStyle, TouchableOpacity, Image, SafeAreaView, FlatList} from "react-native";
import {PrincipalStyle} from "@/app/styles";
import StyleHome from "@/app/(tabs)/(home)/styles";
import { obtenerSeguimientoReclamo } from '@/app/networking/api';
import { router, useLocalSearchParams } from 'expo-router';
import MovimientoComponente from '@/app/components/MovimientoComponente';



const Seguimiento = () => {

    const irAtras = () =>
        {
            router.back()
        };
        const { id }  = useLocalSearchParams();
        const index: string = id ? "" + id : "0";

    // Código para hacer la solicitud al backend, reemplaza los datos de mockup
    interface Movimiento {
        estado: string,
        sector: string,
        responsable: string,
        fecha: string,
        causa: string
        }

    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

    const cargarSeguimiento = async (idReclamo: string) => {
        try {
            const respuesta = await obtenerSeguimientoReclamo(idReclamo);
            setMovimientos(respuesta.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        cargarSeguimiento(index);
    }, [index]);

    const renderItemMovimiento = ({item, index} : {item:Movimiento, index: number}) => (
        <MovimientoComponente
            estado={item.estado}
            sector={item.sector}
            responsable={item.responsable}
            fecha={item.fecha}
            causa={item.causa}
            ultimoMovimiento={index === movimientos.length - 1}
        />
    )


    return (
        <SafeAreaView style={PrincipalStyle.principalContainer}>
                <FlatList
                    style={StyleHome.flatListContainer}
                    data={movimientos}
                    renderItem={renderItemMovimiento}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => String(index)}
                    >
            </FlatList>
        </SafeAreaView>
    );
}

export default Seguimiento;