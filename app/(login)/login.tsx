import React, { useState } from 'react';
import {
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    Image,
    ScrollView
} from "react-native";
import { PrincipalStyle } from "@/app/styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import FormButton from "@/app/components/FormButton";
import LoginFormInput from "@/components/LoginFormInput";
import {loginMunicipal, loginVecino} from "@/app/networking/api";
import {setToken} from "@/app/networking/auth_utils"

const LoginScreen = () => {


    const [showPassword, setShowPassword] = useState(false);
    const [errorMSG, setErrorMSG] = useState<string>("");
    const [password, setPassword] = useState('');
    const [usuario, setUsuario] = useState('');
    const [loading, setLoading] = useState(false);
    const handleLogin = () =>
    {
        const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // TODO: ubicar en una función todos los regex
        const regexNum = /^[0-9]{1,10}$/; // ahora acepta LEGAJOS que tengan un dígito o 2.

        if(usuario.length > 0)
        {
            setLoading(true)
            let error = false
            let esVecino = true
            if(!regexMail.test(usuario))
            {
                error = true
                esVecino = false
            }
            if(!regexNum.test(usuario) && error) //si no es email y tampoco número
            {
                setErrorMSG("Ingrese un e-mail o legajo válido")
                setLoading(false)
                return
            }
            if(esVecino)
            {
                loginVecino(usuario, password).then((r) =>{
                    const token : string = r.data.token
                    const ftime : boolean = r.data.ftime

                    setErrorMSG("")
                    setToken(token).then((r) =>
                    {
                        setUsuario("")
                        setPassword("")
                        if(!ftime)
                        {
                            router.navigate("(home)")
                        }else{
                            router.replace("nueva_pass")
                        }
                    })

                })
                    .catch((error) =>
                    {
                        if(error == undefined)
                        {
                            setErrorMSG("Sin conexión.")
                            return;
                        }
                        switch(error.response.status)
                        {
                            case 404:
                            {
                                setErrorMSG(error.response.data.msg)
                                break
                            }
                            case 403:
                            {
                                setErrorMSG(error.response.data.msg)
                                break
                            }
                            default:
                            {
                                setErrorMSG("Desconocido " + error.response.status)
                                break
                            }
                        }
                    })
                    .finally(() => {
                        setLoading(false)
                    });
            }else{
                loginMunicipal(usuario, password).then((r) =>{
                    const token : string = r.data.token
                    const ftime : boolean = r.data.ftime

                    setErrorMSG("")
                    setToken(token).then((r) =>
                    {
                        setUsuario("")
                        setPassword("")
                        router.navigate("(home)")
                    })

                })
                    .catch((error) =>
                    {
                        switch(error.response.status)
                        {
                            case 404:
                            {
                                setErrorMSG(error.response.data.msg)
                                break
                            }
                            case 403:
                            {
                                setErrorMSG(error.response.data.msg)
                                break
                            }
                            default:
                            {
                                setErrorMSG("Desconocido")
                                break
                            }
                        }
                    })
                    .finally(() => {
                        setLoading(false)
                    });
            }


        }

    }
    return (
            <ScrollView showsVerticalScrollIndicator={false} style={[PrincipalStyle.principalContainer, { width: '80%' }]}>
                {/* Logo */}
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25, gap: 15 }}>
                    <Image source={require('@/assets/images/logo.png')} />
                    <Text style={{ fontSize: 32, fontFamily:'outfit-bold' }}>Mi Municipio</Text>
                    <Text style={{ fontSize: 15, fontFamily:'outfit', marginTop:-15 }}>Por favor ingrese sus datos para continuar</Text>
                </View>
                {/* Fin logo */}
                {/* Login form */}
                <View style={{ marginTop: 30, display: 'flex', gap: 10 }}>
                    <LoginFormInput
                        title={"E-mail o legajo"}
                        placeholder={"Ingrese su E-mail o legajo"}
                        tipo={'mail'}
                        valor={usuario}
                        setValor={setUsuario}
                    />
                    <LoginFormInput
                        valor={password}
                        setValor={setPassword}
                        title={"Contraseñaa"}
                        placeholder={"Ingrese su contraseña"}
                        tipo={'password'}
                        showPass={[showPassword, setShowPassword]}
                    />
                    {errorMSG && <Text style={{color: 'red'}}>{errorMSG}</Text>}
                    <Pressable onPress={()=>{router.push("recupero")}} style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                        <Text style={{ color: '#4891c7',fontFamily:'outfit', fontSize:15 }}>¿Olvidaste tu contraseña?</Text>
                    </Pressable>
                    <FormButton  disabeled={loading} action={handleLogin} title={"Ingresar"} />
                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#525252', height: 20 }}></View>
                    <View style={{ display: 'flex', marginTop: 10 }}>
                        <Pressable onPress={() => {router.push("registro")}}>
                            <Text style={{ color: '#4891c7', textAlign: 'center', marginBottom: 40,fontFamily:'outfit', fontSize:17 }}>¿Aún no tienes cuenta? Solicitar aquí</Text>
                        </Pressable>
                        <FormButton title={"Soy un invitado"} invertStyle={true} action={() => { router.navigate("(home)") }} />
                    </View>
                </View>
            </ScrollView>
    );
};

export default LoginScreen;
