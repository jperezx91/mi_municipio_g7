import React, { useState } from 'react';
import {Pressable, SafeAreaView, Text, TextInput, View, KeyboardAvoidingView, Platform, Image} from "react-native";
import { PrincipalStyle } from "@/app/styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import FormButton from "@/app/components/FormButton";
import LoginFormInput from "@/components/LoginFormInput";


const LoginScreen = () => {


    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    return (
            <SafeAreaView style={[PrincipalStyle.principalContainer, { width: '80%' }]}>
                {/* Logo */}
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25, gap: 15 }}>
                    <Image source={require('@/assets/images/logo.png')} />
                    <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Mi Municipio</Text>
                    <Text style={{ fontSize: 15 }}>Por favor ingrese sus datos para continuar</Text>
                </View>
                {/* Fin logo */}
                {/* Login form */}
                <View style={{ marginTop: 10, display: 'flex', gap: 10 }}>
                    <LoginFormInput
                        title={"E-mail o legajo"}
                        placeholder={"Ingrese su E-mail o legajo"}
                        tipo={'mail'}
                        valor={email}
                        setValor={setEmail}
                    />
                    <LoginFormInput
                        valor={password}
                        setValor={setPassword}
                        title={"Contraseña"}
                        placeholder={"Ingrese su contraseña"}
                        tipo={'password'}
                        showPass={[showPassword, setShowPassword]}
                    />
                    <Pressable onPress={()=>{router.push("recupero")}} style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                        <Text style={{ color: '#0F62FE' }}>¿Olvidaste tu contraseña?</Text>
                    </Pressable>
                    <FormButton title={"Ingresar"} />
                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#525252', height: 20 }}></View>
                    <View style={{ display: 'flex', marginTop: 10 }}>
                        <Pressable onPress={() => {router.push("registro")}}>
                            <Text style={{ color: '#0F62FE', textAlign: 'center', marginBottom: 40 }}>¿Aún no tienes cuenta? Solicitar aquí</Text>
                        </Pressable>
                        <FormButton title={"Soy un invitado"} invertStyle={true} action={() => { router.back() }} />
                    </View>
                </View>
            </SafeAreaView>
    );
};

export default LoginScreen;
