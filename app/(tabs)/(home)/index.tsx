import {View, Text, Alert, StatusBar} from 'react-native';
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
        <View style={{ marginTop: StatusBar.currentHeight || 0 }}>
            <Text onPress={goToExtra}>
                Click aqui para ejemplo de cambio de pantalla
            </Text>
        </View>
    );
}

export default Home;
