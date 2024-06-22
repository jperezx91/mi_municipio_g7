import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, View, FlatList, TouchableOpacity, Alert, AlertButton} from "react-native";
import FormButton from "@/app/components/FormButton";
import {PrincipalStyle} from "@/app/styles";
import StyleHome from "@/app/(tabs)/(home)/styles";
import PublicacionComponente from '@/app/components/PublicacionComponente';
import { obtenerMisPublicaciones, eliminarPublicacion } from '@/app/networking/api';
import {router, useFocusEffect } from "expo-router";
import { withDecay } from 'react-native-reanimated';

function MisPublicaciones() {

    // Código para hacer la solicitud al backend, reemplaza los datos de mockup
    const [publicaciones, setPublicaciones] = useState([]);

    const cargarPublicaciones = () => {
        obtenerMisPublicaciones()
            .then((respuesta) => {
            setPublicaciones(respuesta.data);
        })
            .catch((e) =>{
            console.log(e)
        })
    }

    useEffect(() => {
        cargarPublicaciones();
    }, []);

    useFocusEffect(useCallback(()=>{
        cargarPublicaciones();
    }, []))

    // Código para gestionar el borrado de publicaciones
    const [modoEliminar, setModoEliminar] = useState(false);
    const [publicacionesSeleccionadas, setPublicacionesSeleccionadas] = useState<{[key: number]: boolean}>({});

    const toggleModoEliminacion = () => {
        setModoEliminar(!modoEliminar);
        setPublicacionesSeleccionadas({});
    }

    const manejarSeleccion = (id: number) => {
        // Levanta es estado anterior (prev de previous)
        setPublicacionesSeleccionadas(prev => ({
            ...prev,
            // Hace toggle (de verdadero a falso y falso a verdadero)
            [id]: !prev[id]
        }));
    };

    const manejarEliminacion = () => {
        Alert.alert(
            "Confirmar eliminacion",
            "¿Está seguro que quiere eliminar las publicaciones seleccionadas? Esta acción no es reversible",
            [
                {
                    text: 'Confirmar',
                    onPress: enviarSolicitudDeEliminacion
                },
                    {
                        text: 'Cancelar',
                        onPress: () => {
                            // Lógica para cancelar la acción
                        },
                        style: 'cancel', // Establece este botón como el de cancelar
                    },
                ],
            { cancelable: false } // Evita cerrar la alerta al tocar fuera de ella
        )
    };

    const enviarSolicitudDeEliminacion = () => {
        const publicacionesParaEliminar =
                Object.keys(publicacionesSeleccionadas)
                .filter(key => publicacionesSeleccionadas[Number(key)]);
        var errores = false;

        publicacionesParaEliminar.forEach(async idPublicacion => {
            try {
                const response = await eliminarPublicacion(idPublicacion);
                errores = response.status != 200
            }
            catch (error) {
                console.error(error);
                Alert.alert("Error", "Error al intentar eliminar publicación");
            }
        })
        if (errores){
            Alert.alert("Error", "Error al intentar eliminar publicación");
        } else {
            Alert.alert("Eliminación exitosa", "Éxito al eliminar las publicaciones seleccionadas.");
            toggleModoEliminacion();
            cargarPublicaciones();
        };
    }

    // @ts-ignore
    const renderItemPublicacion = ({item}) => (
        <PublicacionComponente
            title={item.titulo}
            desc={item.descripcion}
            imgUrl={item.imgBase64}
            activarPublicacion={() => {
                if(modoEliminar){
                    manejarSeleccion(item.id);
                } else {
                    toggleModoEliminacion;
                    const idItem : string = item.id
                    router.push(`publicacion/${idItem}`)
                    }
                }
            }
            modoEliminar={modoEliminar}
            seleccionada={publicacionesSeleccionadas[item.id]}
            onSeleccionar={() => manejarSeleccion(item.id)}
        />
    );

    return (
        <SafeAreaView style={PrincipalStyle.principalContainer}>
            <FlatList
                numColumns={1}
                ListFooterComponent={<View style={{height: 150}}></View>}
                style={StyleHome.flatListContainer}
                data={publicaciones}
                renderItem={renderItemPublicacion}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
            >
            </FlatList>
            {!modoEliminar && (
                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'none',
                    marginBottom: 25,
                    position: 'absolute',
                    bottom: 0,
                    left: '5%',
                    width: '90%' }}
                    >
                    <View>
                        <FormButton action={()=> {router.push("publicacion/nueva_publicacion")}} title={'Cargar publicación'} />
                    </View>
                    <View style={{marginTop: 10}}>
                        <FormButton invertStyle={true} action={toggleModoEliminacion} title={'Seleccionar publicaciones para eliminar'} />
                    </View>
                </View>
                )}
            {modoEliminar && (
                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'none',
                    marginBottom: 25,
                    position: 'absolute',
                    bottom: 0,
                    left: '5%',
                    width: '90%' }}
                    >
                    <View>
                        <FormButton action={manejarEliminacion} title={'Eliminar'} />
                    </View>
                    <View style={{marginTop: 10}}>
                        <FormButton invertStyle={true} action={toggleModoEliminacion} title={'Cancelar'} />
                    </View>
                </View>
                )}
        </SafeAreaView>
    );
}

export default MisPublicaciones;