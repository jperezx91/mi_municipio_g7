import React from 'react';
import {Pressable, SafeAreaView, Text, TextInput, View} from "react-native";
import {PrincipalStyle} from "@/app/styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {router} from "expo-router";
import FormButton from "@/app/components/FormButton";
const LoginScreen = () => {
    const LoginFormInput = ({title="", placeholder="", tipo="email"}) =>
    {
        return (
        <View style={{width: "95%"}}>
            <Text style={{paddingBottom: 10}}>{title}</Text>
            <View style={{display: 'flex', flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#525252', justifyContent: 'space-between', alignItems: 'center'}}>

                <TextInput maxLength={tipo == "mail" ? 42 : 26} secureTextEntry={tipo == "password"} inputMode={(tipo == 'mail' ? "email" : "text")} placeholder={placeholder} style={{paddingHorizontal: 15, paddingBottom: 10, overflow: 'hidden'}}/>
                {tipo == "password"?<Pressable style={{paddingHorizontal: 10}}>
                    <FontAwesome5 name="eye" size={16} color="#171717" />
                </Pressable> : null}
            </View>
        </View>)
    }

    return (
        <SafeAreaView style={[PrincipalStyle.principalContainer, {width: '80%'}]}>
            {/* Logo */}
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25, gap: 15}}>
                <FontAwesome5 name="building" size={68} color="#171717" />
                <Text style={{fontSize: 32, fontWeight: 'bold'}}>Mi Municipio</Text>
                <Text style={{fontSize: 15}}>Por favor ingrese sus datos para continuar</Text>
            </View>
            {/* Login form */}
            <View style={{marginTop: 10, display: 'flex', gap: 10}}>
                <LoginFormInput title={"E-mail o legajo"} placeholder={"Ingrese su E-mail o legajo"} tipo={'mail'} />
                <LoginFormInput title={"Contraseña"} placeholder={"Ingrese su contraseña"} tipo={'password'} />
                <View style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 10, marginTop: 10}}><Text style={{color: '#0F62FE'}}>¿Olvidó su contraseña?</Text></View>
                <FormButton title={"Ingresar"} />
                <View style={{borderBottomWidth: 0.5, borderBottomColor: '#525252', height: 20}}></View>
                <View style={{display: 'flex',  marginTop: 10}}>
                    <Pressable><Text style={{color: '#0F62FE', textAlign: 'center', marginBottom: 40}}>¿Aún no tienes cuenta? Solicitar aquí</Text></Pressable>
                    <FormButton title={"Soy un invitado"} invertStyle={true} action={() => { router.back()}} />
                </View>
            </View>

        </SafeAreaView>
    );
};

export default LoginScreen;
