import {View, Text, Alert, StatusBar, SafeAreaView, FlatList} from 'react-native';
import {useEffect} from "react";

import {router} from "expo-router";
import {useAlert} from "@/app/alertProvider";
import {PrincipalStyle} from "@/app/styles";
import PublicacionComponente from "@/app/components/PublicacionComponente";


const Home = () => {
    const { showAlert, setShowAlert } = useAlert();


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
                title: 'Box 3',
                imgUrl: 'lxd',
                desc: 'Esto es una descripcion C'
            },
            {
                id: "4",
                title: 'Box 4',
                imgUrl: 'lxd',
                desc: 'Esto es una descripcion D'
            },

            {
                id: "5",
                title: 'Box 5',
                imgUrl: 'lxd',
                desc: 'Esto es una descripcion E'
            }

        ]
    // @ts-ignore
    const renderItemPublicaion = ({item}) => (
        <PublicacionComponente title={item.title} desc={item.desc} goToPublicacion={(itemx: any) => {
            const idItem = item.id
            router.push(`publicacion/${idItem}`)
        }} />
    )
    useEffect(() => {
        if (showAlert) {
            Alert.alert('Sesión', "Inicia sesión para ver esta sección",
                    [
                    {
                        text: 'Aceptar',
                        onPress: () => {
                            // Lógica para aceptar la acción
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
    return (
        <SafeAreaView style={{flex: 1, width: "93%", margin: 'auto', justifyContent: 'center', alignItems: 'center'}}>
                <FlatList
                    numColumns={2}
                    style={{flex: 1, flexDirection: 'column', width: "100%", marginTop: 10}}
                    data={mockup_data_publicacion}
                    renderItem={renderItemPublicaion}
                    keyExtractor={item => item.id}
                    columnWrapperStyle={{justifyContent: 'space-between'}}


                >
                </FlatList>
            {/*
                <Text onPress={goToExtra}>
                    Click aqui para ejemplo de cambio de pantalla. Esto es un texto largo para probar el ancho.
                </Text>
            */}
        </SafeAreaView>
    );
}

export default Home;
