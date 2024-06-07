import React, { useEffect } from 'react';
import {View, Text, Pressable, StyleSheet, StatusBar, SafeAreaView, Image} from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StyleHeaderComponent } from "@/app/components/styles";
import * as SecureStore from 'expo-secure-store';
import {router} from "expo-router";

interface HeaderComponentProps {
    pressLogin: () => void;
    dataUser: string// Definir el tipo de la función pressLogin
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ pressLogin, dataUser }) => {
    useEffect(() => {
        // Efecto secundario vacío
    }, []);

    return (
        <SafeAreaView>
            <View style={StyleHeaderComponent.headerViewContainer}>
                <View style={StyleHeaderComponent.headerViewItemLeft}>
                    <Image style={{width: 30, height: 30, objectFit: 'cover'}} source={require('@/assets/images/logo.png')} />
                    <Text style={{fontFamily:'outfit', fontSize:20, color:"white"}}>Mi municipio</Text>
                </View>
                <View style={StyleHeaderComponent.headerViewItemRight}>
                    {dataUser == "" ?
                        <>
                            <Pressable
                            onPress={pressLogin}
                            style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <Text style={{fontFamily:'outfit', fontSize:20}}>Ingresar</Text>
                                <FontAwesome5 name="user-circle" size={24} color="white" />
                            </Pressable>
                        </>:
                        <>
                            <Pressable style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', position: 'relative' }} onPress={() => {router.navigate("profile")}}>

                                <FontAwesome5 style={{marginRight: 10}} name="bell" size={24} color="white" />
                                <View style={{position: 'absolute', bottom: 10, left: 10}}>
                                    <View style={{backgroundColor: 'red', width: 23, height: 23, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Text style={{color: 'white'}}>5</Text></View>
                                </View>
                                <Text style={{fontFamily:'outfit-bold', fontSize:18, color: 'white'}}>{dataUser}</Text>
                                <FontAwesome5 name="user-circle" size={24} color="white" />
                            </Pressable>
                        </>
                    }


                </View>
            </View>
        </SafeAreaView>
    );
}

export default HeaderComponent;
