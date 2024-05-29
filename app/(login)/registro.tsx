import React, { useState } from 'react';
import {Pressable, SafeAreaView, Text, TextInput, View, KeyboardAvoidingView, Platform, Image} from "react-native";
import { PrincipalStyle } from "@/app/styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import FormButton from "@/app/components/FormButton";
import LoginFormInput from "@/components/LoginFormInput";


const RegistroScreen = () => {


    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');

    return (
            <SafeAreaView style={[PrincipalStyle.principalContainer, { width: '80%' }]}>
                {/* Logo */}
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25, gap: 15 }}>
                    <Image source={require('@/assets/images/logo.png')} />
                    <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Mi Municipio</Text>
                    <Text style={{ fontSize: 15 }}>Solicitud de registro</Text>
                </View>
                {/* Fin logo */}
                {/* Login form */}
                <View style={{ marginTop: 10, display: 'flex', gap: 10 }}>
                    <LoginFormInput
                        title={"E-mail"}
                        placeholder={"Ingrese su E-mail"}
                        tipo={'mail'}
                        valor={email}
                        setValor={setEmail}
                    />
                    <LoginFormInput
                        valor={dni}
                        setValor={setDni}
                        title={"DNI"}
                        placeholder={"Ingrese su DNI"}
                        tipo={'numero'}
                    />
                    <FormButton title={"Solicitar registro"} />
                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#525252', height: 20 }}></View>
                    <View style={{ display: 'flex', marginTop: 10 }}>
                        <Pressable onPress={()=>{router.navigate("login")}}>
                            <Text style={{ color: '#0F62FE', textAlign: 'center', marginBottom: 40 }}>¿Ya tienes una cuenta? Ingresar aquí</Text>
                        </Pressable>
                        <FormButton title={"Soy un invitado"} invertStyle={true} action={() => { router.replace("(home)") }} />
                    </View>
                </View>
            </SafeAreaView>
    );
};

export default RegistroScreen;
