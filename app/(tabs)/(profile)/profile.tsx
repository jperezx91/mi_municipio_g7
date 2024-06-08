import {View, Text, SafeAreaView, Pressable, Dimensions, Image} from 'react-native';
import * as SecureStore from "expo-secure-store";
import {router, useFocusEffect} from "expo-router";
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
                <Text style={{marginTop: 20, fontFamily:'outfit-bold', fontSize:18}}>{title}:</Text>
                <Text style={{
                            padding:10,
                            borderWidth:1,
                            borderRadius:5,
                            backgroundColor:'white',
                            borderColor:'gray',
                            fontFamily:'outfit',
                            fontSize:15,
                            marginTop:5
                           }}>{value}</Text>
            </View>
        )
    }
    const cerrarSesion = () =>
    {
        SecureStore.deleteItemAsync("bearerToken")
            .then((r)=>{
                if(router.canDismiss())
                    router.dismissAll()
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
            <View style={{marginTop: 15, padding: 20, paddingTop: 0, backgroundColor: '#F2F4F8', height: Dimensions.get('window').height * 0.80}}>
                <Text style={{fontSize: 32, fontFamily:'outfit-bold', textAlign: 'center', marginTop: 10}}>{profileInfo.nombre},{'\n'} ¡Bienvenido!</Text>
                { /* Caja de datos de perfil */}
                <View style={{marginTop: 14}}>
                    <ItemProfile title={regexNum.test(profileInfo.email) ? "Legajo" : "E-mail"} value={profileInfo.email} />
                    <ItemProfile title={"DNI"} value={profileInfo.documento} />
                    <ItemProfile title={"Dirección"} value={profileInfo.direccion ? profileInfo.direccion : "No informa"} />
                    <ItemProfile title={"Barrio"} value={profileInfo.barrio ? profileInfo.barrio : "No informa"} />
                </View>
                { /* Fin Caja de datos de perfil */}
                {/* Botón Mis publicaciones */}
                <Pressable style={{backgroundColor: '#C1C7CD', padding: 14, marginTop: 25, borderRadius:5, borderColor:'#747375',borderWidth:1}} onPress={()=> {router.push("publicacion/nueva_publicacion")}}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontFamily:'outfit', fontSize:15}}>Mis publicaciones</Text>
                        <Image source={require('@/assets/images/arrow.png')} />
                    </View>
                </Pressable>
                {/* Fin botón Mis publicaciones */}
                <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-around', marginTop: 25, alignItems: 'center'}}>
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

