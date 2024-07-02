import React, { useState } from 'react';
import {
    Pressable,
    SafeAreaView,
    Text,
    View,
    Image,
    Alert
} from "react-native";
import { PrincipalStyle } from "@/app/styles";
import { router } from "expo-router";
import FormButton from "@/app/components/FormButton";
import LoginFormInput from "@/components/LoginFormInput";
import {registroVecino} from "@/app/networking/api";


const RegistroScreen = () => {


    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [errorMSGEmail, setErrorMSGEmail] = useState("");
    const [errorMSGDNI, setErrorMSGDNI] = useState("");
    const handleRegistro = () =>
    {
        const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const regexDNI = /^[a-zA-Z0-9._-]{4,12}$/;
        let error = false
        setErrorMSGEmail("")
        setErrorMSGDNI("")

        if(!regexMail.test(email)){
            setErrorMSGEmail("Ingrese un e-mail válido por favor.");
            error = true
        }

        if(!regexDNI.test(dni))
        {
            setErrorMSGDNI("Ingrese un DNI válido por favor.")
            error = true
        }
        if(error) // ocurrió un error en los datos, no seguimos
            return

        registroVecino(email, dni)
        .then((r) =>
        {
            Alert.alert("Se envió correctamente su solicitud de registro", "El municipio le informará el resultado de su solicitud.")
            router.replace("(home)")

        })
        .catch((err)=>
        {
                switch(err.response.status)
                {
                    case 404:
                        Alert.alert("No existe el DNI.", "Por favor ingrese un DNI de un vecino existente")
                        break
                    case 409:
                        Alert.alert("Usuario ya registrado", "Ya existe un usuario registrado con ese DNI.")
                        break
                    default:
                        Alert.alert("Error desconocido.")
                        break
                }
        })
    }
    return (
            <SafeAreaView style={[PrincipalStyle.principalContainer, { width: '80%' }]}>
                {/* Logo */}
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25, gap: 15 }}>
                    <Image source={require('@/assets/images/logo.png')} />
                    <Text style={{ fontSize: 32, fontFamily:'outfit-bold' }}>Mi Municipio</Text>
                    <Text style={{ fontSize: 15, fontFamily:'outfit', marginTop:-15 }}>Solicitud de registro</Text>
                </View>
                {/* Fin logo */}
                {/* Login form */}
                <View style={{ marginTop: 30, display: 'flex', gap: 10 }}>
                    <LoginFormInput
                        title={"E-mail"}
                        placeholder={"Ingrese su E-mail"}
                        tipo={'mail'}
                        valor={email}
                        setValor={setEmail}
                        errorMSG={errorMSGEmail}
                    />
                    <LoginFormInput
                        valor={dni}
                        setValor={setDni}
                        title={"DNI"}
                        placeholder={"Ingrese su DNI"}
                        tipo={'numero'}
                        errorMSG={errorMSGDNI}
                    />
                    <Text style={{ color: '#F2F4F8',fontFamily:'outfit', fontSize:15, marginBottom: 10, marginTop: 10  }}>¿Olvidaste tu contraseña?</Text>
                    <FormButton action={handleRegistro} title={"Solicitar registro"} />
                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#525252', height: 20 }}></View>
                    <View style={{ display: 'flex', marginTop: 10 }}>
                        <Pressable onPress={()=>{router.navigate("login")}}>
                            <Text style={{ color: '#4891c7', textAlign: 'center', marginBottom: 40,fontFamily:'outfit', fontSize:17 }}>¿Ya tienes una cuenta? Ingresar aquí</Text>
                        </Pressable>
                        <FormButton title={"Soy un invitado"} invertStyle={true} action={() => { router.replace("(home)") }} />
                    </View>
                </View>
            </SafeAreaView>
    );
};

export default RegistroScreen;
