import {Alert, SafeAreaView, FlatList, View} from 'react-native';
import React, {useCallback, useEffect, useState} from "react";
import {router, useFocusEffect} from "expo-router";
import {useAlert} from "@/app/alertProvider";
import {PrincipalStyle} from "@/app/styles";
import PublicacionComponente from "@/app/components/PublicacionComponente";
import StyleHome from "@/app/(tabs)/(home)/styles";
import FormButton from "@/app/components/FormButton";
import * as SecureStore from 'expo-secure-store';
import {jwtDecode} from "jwt-decode";
import { obtenerPublicaciones } from '@/app/networking/api';

const Home = () => {
    const { showAlert, setShowAlert } = useAlert();
    const [isLogged, setIsLogged] = useState(false);
    const [esVecino, setEsVecino] = useState<boolean>(true);
    
    // Código para hacer la solicitud al backend, reemplaza los datos de mockup
    const [publicaciones, setPublicaciones] = useState([]);
    const cargarPublicaciones = () => {
        obtenerPublicaciones()
            .then((respuesta) =>
            {
                setPublicaciones(respuesta.data);
            })
            .catch((e) =>
            {
                console.log(e)
            })
    }

    useEffect(() => {
        cargarPublicaciones();
    }, []);
    
    useFocusEffect(useCallback(()=>{
        cargarPublicaciones();
    }, []))



    // @ts-ignore
    const renderItemPublicacion = ({item}) => (
        <PublicacionComponente
            title={item.titulo}
            desc={item.descripcion}
            imgUrl={item.imgBase64}
            activarPublicacion={() => {
                const idItem : string = item.id
                router.push(`publicacion/${idItem}`)
                }}
            // Variables para eliminación de publicaciones, sólo disponible desde "Mis Publicaciones"
            modoEliminar = {false}
            seleccionada = {false}
            onSeleccionar= {null}
            />
    );

    useEffect(() => {
        if (showAlert) {
            Alert.alert('Sesión', "Inicia sesión como vecino para ver esta sección.",
                    [
                    {
                        text: 'Aceptar',
                        onPress: () => {
                            // Lógica para aceptar la acción
                            if(esVecino) // si fuese un vecino...
                                router.push("login")
                        }
                    },
                        {
                            text: 'Volver',
                            onPress: () => {
                                // Lógica para cancelar la acción
                            },
                            style: 'cancel', // Establece este botón como el de cancelar
                        },
                    ],
                { cancelable: false } // Evita cerrar la alerta al tocar fuera de ella
            );

            setShowAlert(false);
        }
    }, [showAlert]);

    useFocusEffect(useCallback(()=>{
        const token = SecureStore.getItem("bearerToken")
        if(token)
        {
            const payload = jwtDecode(token)
            // @ts-ignore
            const rol = payload["rol"]
            setEsVecino(rol == "vecino")
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
    }, []))

    
    return (
        <SafeAreaView style={PrincipalStyle.principalContainer}>{/* <SafeAreaView style={{flex: 1, width: "93%", margin: 'auto', justifyContent: 'center', alignItems: 'center'}}> */}
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
            {isLogged && esVecino && <View style={{  display: 'flex', justifyContent: 'center', backgroundColor: 'none', marginBottom: 25, position: 'absolute', bottom: 0, left: '5%', width: '90%' }}>{/* cambiar none por flex para ver el boton cargar publicacion */}
                    <FormButton action={()=> {router.push("publicacion/nueva_publicacion")}} title={'Cargar publicación'} />
                </View>}
        </SafeAreaView>
    );
}

export default Home;
