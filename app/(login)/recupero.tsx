import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Image
} from "react-native";
import { PrincipalStyle } from "@/app/styles";
import { router } from "expo-router";
import FormButton from "@/app/components/FormButton";
import LoginFormInput from "@/components/LoginFormInput";
import {solicitarRecupero} from "@/app/networking/api";
// Generado con IA hacer de nuevo, no está bien
const PasswordRecoveryScreen = () => {
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [errorMSGEmail, setErrorMSGEmail] = useState("");
    const [errorMSGDni, setErrorMSGDni] = useState("");
    const handleRecupero = () =>
    {
        setErrorMSGEmail("");
        setErrorMSGDni("")
        const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const regexDni = /^[0-9]{4,9}$/;
        let error = false;
        if(!regexMail.test(email))
        {
            setErrorMSGEmail("E-mail inválido. Por favor ingrese uno válido.")
            error = true
        }
        if(!regexDni.test(dni))
        {
            setErrorMSGDni("Dni inválido. Por favor ingrese uno válido.")
            error = true
        }
        if(error)
            return; // no se sigue con la recuperación.
        solicitarRecupero(email, dni)
            .then((r) =>
            {
                router.replace("recupero_validar")
            })
            .catch((e)=>
            {
                console.log(e)
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
                <View style={{marginTop: 30, display: 'flex', gap: 10}}>
                    <LoginFormInput errorMSG={errorMSGEmail} valor={email} setValor={setEmail} title={"E-mail"} placeholder={"Ingrese su E-mail"} />
                    <LoginFormInput errorMSG={errorMSGDni} valor={dni} setValor={setDni} tipo={"numero"} title={"DNI"} placeholder={"Ingrese su DNI"} />
                </View>
                <View style={{height: 60}}></View>
                <FormButton action={handleRecupero} title={"Solicitar código"} />
            </SafeAreaView>

    );
};
/*


 */


export default PasswordRecoveryScreen;
