import { PrincipalStyle } from "@/app/styles";
import { Dimensions, FlatList, SafeAreaView, Text, View } from "react-native";
import StyleHome from "./styles";
import NotificacionesReclamoComponente from "@/app/components/NotificacionesReclamoComponente";
import { router } from "expo-router";
import denuncias from "../(denuncias)/denuncias";
import { obtenerDenuncias, obtenerMovimientoReclamo } from "@/app/networking/api";
import React, { useState, useEffect } from "react";
import DenunciaComponente from "@/app/components/denunciaComponente"


export default function Notificaciones() {

    /*
    const [denuncias, setDenuncias] = useState([])

    const cargarDenunciasApi = () =>
    {
        obtenerDenuncias()
            .then((respuesta) => {
                const denuncinasR = respuesta.data.denuncias
                setDenuncias(denuncinasR)
            })
            .catch((e)=>
            {
                console.log(e)
            })
    }
    useEffect(() => {
        cargarDenunciasApi()
    }, []);
    interface itemType
    {
        idDenuncia: number
        estado: string
    }

    // @ts-ignore
    const renderItemDenuncia = ({item}) => (
        <DenunciaComponente numero_denuncia={item.idDenuncia || 0} estado={item.estado} goToDenuncia={() => {
            const idItem : string = item.idDenuncia
            router.push(`denuncia/${idItem}`)
        }} />
    )*/
    /*Tirando magia */
    const [movimientoReclamo, setMovimientoReclamo] = useState([])

    const cargarMovimientoReclamo = () =>
    {
        obtenerMovimientoReclamo()
            .then((respuesta) => {
                const movimientoReclamoTest = respuesta.data.movimientoReclamo
                setMovimientoReclamo(movimientoReclamoTest)
            })
            .catch((e)=>
            {
                console.log(e)
            })
    }
    useEffect(() => {
        cargarMovimientoReclamo()
    }, []);
    interface itemType
    {
        idDenuncia: number
        estado: string
    }

    // @ts-ignore
    const renderItemNotificacion = ({item}) => (
        <NotificacionesReclamoComponente numero_movimientoReclamo={item.idDenuncia || 0} causa={item.estado} goToMovimientoReclamo={() => {
            const idItem : string = item.idDenuncia

            if(item.estado == "Pendiente")
                router.push(`denuncia/${idItem}?local=true`)
            else
                router.push(`denuncia/${idItem}?local=false`)


        }} />
    )


    return (
        <SafeAreaView style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
        <View style={{backgroundColor: '#F2F4F8', height: Dimensions.get('window').height * 0.80}}>
            {/* lista reclamos */}
                <FlatList
                    ListFooterComponent={<View style={{width:Dimensions.get('window').width}}></View>}
                    style={StyleHome.flatListContainer}
                    data={movimientoReclamo}
                    renderItem={renderItemNotificacion}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.idDenuncia}
                    ListEmptyComponent={<View style={{marginTop: 10}}>
                        <Text style={{fontSize: 24, fontFamily: 'outfit', fontWeight: 'bold', textAlign: 'center'}}>Sin notificaciones</Text>
                    </View>}
                    >
                </FlatList>
        </View>
    </SafeAreaView>
    )
}
