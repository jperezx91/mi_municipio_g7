import {View, Text, SafeAreaView, Pressable, Dimensions, Image, TextInput, FlatList, TouchableOpacity, Modal, Alert} from 'react-native';
import {PrincipalStyle} from "@/app/styles";
import {router, useFocusEffect } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import StyleHome from "@/app/(tabs)/(home)/styles";
import ReclamoComponente from "@/app/components/reclamoComponente";
import { useState, useEffect, useCallback } from 'react';
import { obtenerCategorias, obtenerReclamo, obtenerReclamos } from '@/app/networking/api';
import FormButton from '@/app/components/FormButton';
import BusquedaFiltroComponente from '@/app/components/BusquedaFiltroComponente';
import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import { AxiosResponse } from 'axios';
import * as verificar_rol from '@/app/utils/verificar_rol';



export default function HomeScreen() {

    const esInspector = verificar_rol.comprobarSiEsInspector();

    const [categoriaInspector, setCategoriaInspector] = useState('')

    const obtenerCategoriaInspector = async () => {
        try{
            const respuesta = await obtenerCategorias(true)
            const descripciones = respuesta.data.map((categoria: { id: string, descripcion: string }) => categoria.descripcion);
            setCategoriaInspector(descripciones);
            
        }catch(e) {
            console.log(e);
        }
    }
    
    // Código para hacer la solicitud al backend, reemplaza los datos de mockup
    interface Reclamo {
        numero_reclamo: string
        categoria: string
        estado: string
        }

    const [reclamos, setReclamos] = useState<Reclamo[]>([]);

    const cargarReclamos = async (categoria: string) => {
        try {
            
            if(esInspector){
                categoria = categoriaInspector;
            }
            const respuesta = await obtenerReclamos(categoria);
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
        obtenerCategoriaInspector();
    }, [esInspector]);

    useEffect(() => {
        cargarReclamos(filtroSeleccionado);
    }, [filtroSeleccionado, categoriaInspector]);

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

                {/* Botón Mis reclamos */}
                <Pressable style={{paddingTop: 14, paddingBottom:14}} onPress={()=> {router.push("misReclamos")}}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontFamily:'outfit', fontSize:18}}>Mis reclamos</Text>
                        <Entypo name="chevron-thin-right" size={20} color="black" />
                    </View>
                </Pressable>

                {/* Búsqueda y Filtro */}
                <BusquedaFiltroComponente
                    filtroVisible={filtroVisible}
                    setFiltroVisible={setFiltroVisible}
                    manejarSeleccionDeFiltro={manejarSeleccionDeFiltro}
                />

                {/* lista reclamos */}
                {reclamos.length != 0 &&(
                <FlatList
                    refreshing={false}
                    onRefresh={() => {
                        cargarReclamos(filtroSeleccionado)
                    }}
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
