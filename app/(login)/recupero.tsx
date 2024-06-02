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
    Image
} from "react-native";
import { PrincipalStyle } from "@/app/styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import FormButton from "@/app/components/FormButton";
import LoginFormInput from "@/components/LoginFormInput";
// Generado con IA hacer de nuevo, no está bien
const PasswordRecoveryScreen = () => {
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');

    return (
            <SafeAreaView style={[PrincipalStyle.principalContainer, { width: '80%' }]}>
                {/* Logo */}
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25, gap: 15 }}>
                    <Image source={require('@/assets/images/logo.png')} />
                    <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Mi Municipio</Text>
                    <Text style={{ fontSize: 15 }}>¿Olvidaste tu contraseña?</Text>
                </View>
                {/* Fin logo */}
                <View style={{display: 'flex', gap: 10}}>
                    <LoginFormInput valor={email} setValor={setEmail} title={"E-mail"} placeholder={"Ingrese su E-mail"} />
                    <LoginFormInput valor={dni} setValor={setDni} tipo={"numero"} title={"DNI"} placeholder={"Ingrese su DNI"} />
                </View>
                <View style={{height: 75}}></View>
                <FormButton action={()=> router.push("recupero_validar")} title={"Solicitar código"} />
            </SafeAreaView>

    );
};
/*


 */


export default PasswordRecoveryScreen;
