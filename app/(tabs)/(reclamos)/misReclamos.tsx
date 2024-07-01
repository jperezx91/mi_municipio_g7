import {View, Text, SafeAreaView, Pressable, Dimensions, Image, TextInput, FlatList} from 'react-native';
import {PrincipalStyle} from "@/app/styles";
import {router, useFocusEffect } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import StyleHome from "@/app/(tabs)/(home)/styles";
import ReclamoComponente from "@/app/components/reclamoComponente";
import { useState, useEffect, useCallback } from 'react';
import { obtenerReclamosPropios } from '@/app/networking/api';
import FormButton from '@/app/components/FormButton';
import BusquedaFiltroComponente from '@/app/components/BusquedaFiltroComponente';




export default function MisReclamos() {
    
    // Código para hacer la solicitud al backend, reemplaza los datos de mockup
    interface Reclamo {
        numero_reclamo: string
        categoria: string
        estado: string
        }

    const [reclamos, setReclamos] = useState<Reclamo[]>([]);

    const cargarReclamos = async (categoria: string) => {
        try {
            const respuesta = await obtenerReclamosPropios(categoria);
            setReclamos(respuesta.data);
        } catch (e) {
            console.log(e);
        }
    };

    // Código para funciones de búsqueda y filtrado
    const [filtroVisible, setFiltroVisible] = useState(false);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState('');
    
    const manejarSeleccionDeFiltro = (categoria: string) => {
        setFiltroSeleccionado(categoria);
        setFiltroVisible(false);
        if(categoria === 'Quitar filtro'){
            setFiltroSeleccionado('');
            cargarReclamos('');
        } else {
            cargarReclamos(categoria);
        }
    };

    useEffect(() => {
        cargarReclamos(filtroSeleccionado);
    }, [filtroSeleccionado]);

    // @ts-ignore
    const renderItemReclamo = ({item} : {item:Reclamo}) => (
        <ReclamoComponente numero_reclamo={item.numero_reclamo} categoria={item.categoria} estado={item.estado} goToPublicacion={() => {
            const idItem : string = String(item.numero_reclamo)
            router.push(`reclamo/${idItem}`)
        }} />
    )

    return (
        <SafeAreaView style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
            <View style={{marginTop: 15, padding: 20, paddingTop: 0, backgroundColor: '#F2F4F8', height: Dimensions.get('window').height * 0.80}}>
                
                    {/* Búsqueda y Filtro */}
                    <BusquedaFiltroComponente
                        filtroVisible={filtroVisible}
                        setFiltroVisible={setFiltroVisible}
                        manejarSeleccionDeFiltro={manejarSeleccionDeFiltro}
                    />

                    {/* lista reclamos */}
                    {reclamos.length != 0 &&(
                        <FlatList
                            ListFooterComponent={<View style={{width:Dimensions.get('window').width}}></View>}
                            style={StyleHome.flatListContainer}
                            data={reclamos}
                            renderItem={renderItemReclamo}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => String(item.numero_reclamo)}
                            >
                        </FlatList>
                    )}
                    {reclamos.length == 0 &&(
                        <Text style={{textAlign: 'center', marginTop: 15, fontSize: 18}}>No se han encontrado reclamos.</Text>
                    )}
                
                </View>
                
                {/* Botón de carga de reclamo */}
                <View style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'none',
                        marginBottom: 25,
                        position: 'absolute',
                        bottom: 0,
                        left: '5%',
                        width: '90%' }}>
                        <FormButton action={()=> {router.push("reclamo/nuevo_reclamo")}} title={'Cargar reclamo'} />
                </View>
        </SafeAreaView>
    );
}
