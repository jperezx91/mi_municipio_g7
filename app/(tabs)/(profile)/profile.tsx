import {View, Text, SafeAreaView, Pressable, Dimensions, Image} from 'react-native';
import * as SecureStore from "expo-secure-store";
import {router} from "expo-router";
import {PrincipalStyle} from "@/app/styles";
import {FontAwesome} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import FormButton from "@/app/components/FormButton";
import {verPerfil} from "@/app/networking/api";

export default function HomeScreen() {
    const regexNum = /^[0-9]{4,10}$/;

    const [profileInfo, setProfileInfo] = useState({
        'nombre': '',
        'documento': '',
        'direccion': '',
        'barrio': '',
        'email': ''
    })
    const ItemProfile = ({title="", value=""}) =>
    {
        return(
            <View>
                <Text style={{marginTop: 10}}>{title}:</Text>
                <Text style={{borderWidth: 0.5, padding: 14, marginTop: 10, marginBottom: 10}}>{value}</Text>
            </View>
        )
    }
    const cerrarSesion = () =>
    {
        SecureStore.deleteItemAsync("bearerToken")
            .then((r)=>{
                router.replace("login")
            })
    }

    useEffect(() => {
        verPerfil()
            .then((r) =>
            {
                setProfileInfo({
                    'nombre': r.data.nombre,
                    'documento': r.data.documento,
                    'direccion': r.data.direccion,
                    'barrio': r.data.barrio,
                    'email': r.data.email

                })
            })
            .catch((e) =>
            {
                console.log(e)
            })
    }, []);
    return (
        <SafeAreaView style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
            <View style={{marginTop: 15, padding: 20, paddingTop: 0, backgroundColor: 'white', height: Dimensions.get('window').height * 0.80}}>
                <Text style={{fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginTop: 10}}>{profileInfo.nombre},{'\n'} ¡Bienvenido!</Text>
                { /* Caja de datos de perfil */}
                <View style={{marginTop: 14}}>
                    <ItemProfile title={regexNum.test(profileInfo.email) ? "Legajo" : "E-mail"} value={profileInfo.email} />
                    <ItemProfile title={"DNI"} value={profileInfo.documento} />
                    <ItemProfile title={"Dirección"} value={profileInfo.direccion ? profileInfo.direccion : "No informa"} />
                    <ItemProfile title={"Barrio"} value={profileInfo.barrio ? profileInfo.barrio : "No informa"} />
                </View>
                { /* Fin Caja de datos de perfil */}
                {/* Botón Mis publicaciones */}
                <Pressable style={{backgroundColor: '#C1C7CD', padding: 14, marginTop: 10}}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text>Mis publicaciones</Text>
                        <Image source={require('@/assets/images/arrow.png')} />
                    </View>
                </Pressable>
                {/* Fin botón Mis publicaciones */}
                <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-around', marginTop: 15, alignItems: 'center'}}>
                    <View style={{width: "45%"}}>
                        <FormButton action={() => {router.push("nueva_pass_perfil")}} title={"Cambiar contraseña"} />
                    </View>
                    <View style={{width: "45%"}}>
                        <FormButton action={cerrarSesion} title={"Cerrar sesión"} invertStyle={true} />
                    </View>

                </View>
                {/*
                <Pressable onPress={()=> {
                    SecureStore.deleteItemAsync("bearerToken")
                        .then((r)=>{
                            router.replace("login")
                        })
                }}><Text>Cerrar sesion</Text></Pressable>*/}
            </View>
        </SafeAreaView>
    );
}

