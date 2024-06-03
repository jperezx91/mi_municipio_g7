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
import * as SecureStore from "expo-secure-store";
import {jwtDecode} from "jwt-decode";
import internal from "node:stream";
import {changePassword} from "@/app/networking/api";

const RecoveryValidateScreen = () => {
    const [codigo, setCodigo] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    interface Payload
    {
        sub: string
    }
    const handleChangePassword = async () =>
    {
        const token =  SecureStore.getItem("bearerToken")
        if(token)
        {
            const payload: Payload = jwtDecode(token)
            changePassword(password)
            .then((r) => {
                router.replace("(home)")
            })
            .catch((e) =>
            {
                console.log(e)
            })
        }

    }
    return (
            <SafeAreaView style={[PrincipalStyle.principalContainer, { width: '80%' }]}>
                {/* Logo */}
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25, gap: 15 }}>
                    <Image source={require('@/assets/images/logo.png')} />
                    <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Mi Municipio</Text>
                    <Text style={{ fontSize: 16 }}>Restablece tu contraseña</Text>
                </View>
                {/* Fin logo */}
                <View style={{display: 'flex', gap: 20, marginTop: 20}}>
                    <Text style={{fontSize: 16}}>Hemos validado tu código correctamente. Por favor genera una nueva contraseña:</Text>
                    <LoginFormInput showPass={[showPassword, setShowPassword]} valor={password} setValor={setPassword} tipo={"password"} title={"Contraseña"} placeholder={"Ingrese su nueva contraseña"} />
                    <LoginFormInput showPass={[showRePassword, setShowRePassword]} valor={repassword} setValor={setRePassword} tipo={"password"} title={"Confirmar contraseña"} placeholder={"Ingrese su nueva contraseña"} />
                </View>
                <View style={{height: 45}}></View>
                <FormButton action={handleChangePassword} title={"Confirmar"} />
            </SafeAreaView>

    );
};



export default RecoveryValidateScreen;
