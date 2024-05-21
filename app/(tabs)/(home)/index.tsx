import {View, Text, Alert, StatusBar, SafeAreaView} from 'react-native';
import {useEffect} from "react";

import {router} from "expo-router";
import {useAlert} from "@/app/alertProvider";


const Home = () => {
    const { showAlert, setShowAlert } = useAlert();

    const goToExtra = (e: any) =>
    {
        router.push("extra")
    }
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
        <SafeAreaView style={{flex: 1, width: "93%", margin: 'auto'}}>
            <Text onPress={goToExtra}>
                Click aqui para ejemplo de cambio de pantalla. Esto es un texto largo para probar el ancho.
            </Text>
        </SafeAreaView>
    );
}

export default Home;
