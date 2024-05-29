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
const RecoveryValidateScreen = () => {
    const [codigo, setCodigo] = useState('');

    return (
            <SafeAreaView style={[PrincipalStyle.principalContainer, { width: '80%' }]}>
                {/* Logo */}
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25, gap: 15 }}>
                    <Image source={require('@/assets/images/logo.png')} />
                    <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Mi Municipio</Text>
                    <Text style={{ fontSize: 16 }}>¿Olvidaste tu contraseña?</Text>
                </View>
                {/* Fin logo */}
                <View style={{display: 'flex', gap: 20, marginTop: 20}}>
                    <Text style={{fontSize: 16}}>Hemos enviado un código a tu casilla de email registrada para la recuperación de tu contraseña. Por favor ingresa el mismo más abajo:</Text>
                    <LoginFormInput valor={codigo} setValor={setCodigo} tipo={"numero"} title={"Código de recuperación"} placeholder={"Ingrese el código enviado"} />
                </View>
                <View style={{height: 45}}></View>
                <FormButton action={() => router.push("nueva_pass")} title={"Validar código"} />
            </SafeAreaView>

    );
};



export default RecoveryValidateScreen;
