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
    Image, ScrollView
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
import {changePassword, changePasswordProfile} from "@/app/networking/api";

const NuevaPassPerfil = () => {
    const [password, setPassword] = useState('');
    const [oldpassword, setOldPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [showErrorMSGPassword, setShowErrorMSGPassword] = useState("");
    const [showErrorMSGOldPassword, setShowErrorMSGOldPassword] = useState("");
    const [showErrorMSGRePassword, setShowErrorMSGRePassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    interface Payload
    {
        sub: string
    }
    const handleChangePassword = async () =>
    {
        const token =  SecureStore.getItem("bearerToken")
        setShowErrorMSGPassword("")
        setShowErrorMSGOldPassword("")
        setShowErrorMSGRePassword("")
        const regexPass = /^.{4,16}$/;
        let error = false;
        if(!regexPass.test(password)){
            setShowErrorMSGPassword("Contraseña inválida. Debe tener mínimo 4 caracteres.")
            error = true
        }
        if(!regexPass.test(repassword)){
            setShowErrorMSGRePassword("Contraseña inválida. Debe tener mínimo 4 caracteres.")
            error = true
        }

        if(password != repassword && !error)
        {
            setShowErrorMSGRePassword("No coinciden las contraseñas")
            error = true
        }
        if(error)
            return; // no se continua porque hay un error.

        if(token)
        {
            const payload: Payload = jwtDecode(token)
            changePasswordProfile(oldpassword, password)
            .then((r) => {
                router.replace("(home)")
            })
            .catch((e) =>
            {
                setShowErrorMSGOldPassword("No coincide con su contraseña actual.")
            })
        }

    }
    return (

                <KeyboardAvoidingView behavior={'height'} style={[PrincipalStyle.principalContainer, { width: '80%' }]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Logo */}
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25, gap: 15 }}>
                            <Image source={require('@/assets/images/logo.png')} />
                            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Mi Municipio</Text>
                            <Text style={{ fontSize: 16 }}>Restablece tu contraseña</Text>
                        </View>
                        {/* Fin logo */}
                        <View style={{display: 'flex', gap: 20, marginTop: 20}}>
                            <Text style={{fontSize: 16}}>Escribe tu contraseña original y luego elige tu nueva contraseña:</Text>
                            <LoginFormInput errorMSG={showErrorMSGOldPassword} showPass={[showOldPassword, setShowOldPassword]} valor={oldpassword} setValor={setOldPassword} tipo={"password"} title={"Contraseña actual"} placeholder={"Ingrese su contraseña actual"} />
                            <LoginFormInput errorMSG={showErrorMSGPassword} showPass={[showPassword, setShowPassword]} valor={password} setValor={setPassword} tipo={"password"} title={"Contraseña"} placeholder={"Ingrese su nueva contraseña"} />
                            <LoginFormInput errorMSG={showErrorMSGRePassword} showPass={[showRePassword, setShowRePassword]} valor={repassword} setValor={setRePassword} tipo={"password"} title={"Confirmar contraseña"} placeholder={"Ingrese su nueva contraseña"} />
                        </View>
                        <View style={{height: 45}}></View>
                        <FormButton action={handleChangePassword} title={"Confirmar"} />
                    </ScrollView>
                </KeyboardAvoidingView>



    );
};



export default NuevaPassPerfil;
