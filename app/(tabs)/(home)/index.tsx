import {Alert, SafeAreaView, FlatList, View} from 'react-native';
import {useCallback, useEffect, useState} from "react";

import {router, useFocusEffect} from "expo-router";
import {useAlert} from "@/app/alertProvider";
import {PrincipalStyle} from "@/app/styles";
import PublicacionComponente from "@/app/components/PublicacionComponente";
import StyleHome from "@/app/(tabs)/(home)/styles";
import FormButton from "@/app/components/FormButton";
import * as SecureStore from 'expo-secure-store';
import {jwtDecode} from "jwt-decode";

const Home = () => {
    const { showAlert, setShowAlert } = useAlert();
    const [isLogged, setIsLogged] = useState(false);
    const [esVecino, setEsVecino] = useState<boolean>(true);
    const mockup_data_publicacion =
        [
            {
                id: "1",
                title: 'Pizzería Los hornos',
                imgUrl: 'lxd',
                desc: '¡Promo imperdible!'

            },
            {
                id: "2",
                title: 'Escribanía Flores Hnos.',
                imgUrl: 'lxd',
                desc: 'Servicios de escribanía de la mejor calidad.'
            },
            {
                id: "3",
                title: 'Negocio A',
                imgUrl: 'lxd',
                desc: 'Esto es una descripcion A'
            },
            {
                id: "4",
                title: 'Negocio B',
                imgUrl: 'lxd',
                desc: 'Esto es una descripcion B'
            },

            {
                id: "5",
                title: 'Negocio C',
                imgUrl: 'lxd',
                desc: 'Esto es una descripcion C'
            }

        ]
    // @ts-ignore
    const renderItemPublicaion = ({item}) => (
        <PublicacionComponente title={item.title} desc={item.desc} goToPublicacion={() => {
            const idItem : string = item.id
            router.push(`publicacion/${idItem}`)
        }} />
    )
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
        }else{
            setIsLogged(false)
        }
    }, []))
    return (
        <SafeAreaView style={PrincipalStyle.principalContainer}>{/* <SafeAreaView style={{flex: 1, width: "93%", margin: 'auto', justifyContent: 'center', alignItems: 'center'}}> */}
                <FlatList
                    numColumns={2}
                    ListFooterComponent={<View style={{height: 150}}></View>}
                    style={StyleHome.flatListContainer}
                    data={mockup_data_publicacion}
                    renderItem={renderItemPublicaion}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    columnWrapperStyle={{justifyContent: 'space-between'}}>
                </FlatList>
            {isLogged && esVecino && <View style={{  display: 'flex', justifyContent: 'center', backgroundColor: 'none', marginBottom: 25, position: 'absolute', bottom: 0, left: '5%', width: '90%' }}>{/* cambiar none por flex para ver el boton cargar publicacion */}
                    <FormButton action={()=> {router.push("publicacion/nueva_publicacion")}} title={'Cargar publicación'} />
                </View>}
        </SafeAreaView>
    );
}

export default Home;
