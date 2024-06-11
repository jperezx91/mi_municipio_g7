import React, { useState } from 'react';
import {
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Image, Alert
} from "react-native";
import { PrincipalStyle } from "@/app/styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import FormButton from "@/app/components/FormButton";
import LoginFormInput from "@/components/LoginFormInput";
import {verificarCodigo} from "@/app/networking/api";
import {setToken} from "@/app/networking/auth_utils"
// Generado con IA hacer de nuevo, no está bien
const RecoveryValidateScreen = () => {
    const [codigo, setCodigo] = useState('');
    const [errorMSGCodigo, setErrorMSGCodigo] = useState('');
    const handleVerificar = () =>
    {
        setErrorMSGCodigo("")
        const regexCodigo =  /^[0-9]{4,8}$/;
        let error = false;
        if(!regexCodigo.test(codigo)){
            error = true
            setErrorMSGCodigo("Código inválido. Mínimo 4 dígitos.")
        }
        if(error)
            return;
        verificarCodigo(codigo)
        .then((r) =>{
            setToken(r.data.token)
                .then((rx) =>
                {
                    router.replace("nueva_pass")
                })
        })
            .catch((e)=>{
                switch(e.response.status)
                {
                    case 404:
                        Alert.alert("Código incorrecto", "El código es incorrecto.")
                        break;
                    default:
                        Alert.alert("Desconocido", "Se produjo un error desconocido.")
                }
            })
    }
    return (
            <SafeAreaView style={[PrincipalStyle.principalContainer, { width: '80%' }]}>
                {/* Logo */}
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25, gap: 15 }}>
                    <Image source={require('@/assets/images/logo.png')} />
                    <Text style={{ fontSize: 32, fontFamily:'outfit-bold' }}>Mi Municipio</Text>
                    <Text style={{ fontSize: 15, fontFamily:'outfit', marginTop:-15 }}>¿Olvidaste tu contraseña?</Text>
                </View>
                {/* Fin logo */}
                <View style={{display: 'flex', gap: 20, marginTop: 20}}>
                    <Text style={{fontSize: 16, fontFamily:'outfit'}}>Hemos enviado un código a tu casilla de email registrada para la recuperación de tu contraseña. Por favor ingresa el mismo más abajo:</Text>
                    <LoginFormInput errorMSG={errorMSGCodigo} valor={codigo} setValor={setCodigo} tipo={"numero"} title={"Código de recuperación"} placeholder={"Ingrese el código enviado"} />
                </View>
                <View style={{height: 45}}></View>
                <FormButton action={handleVerificar} title={"Validar código"} />
            </SafeAreaView>

    );
};



export default RecoveryValidateScreen;
