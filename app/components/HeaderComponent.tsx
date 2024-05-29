import React, { useEffect } from 'react';
import {View, Text, Pressable, StyleSheet, StatusBar, SafeAreaView, Image} from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StyleHeaderComponent } from "@/app/components/styles";

interface HeaderComponentProps {
    pressLogin: () => void;  // Definir el tipo de la función pressLogin
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ pressLogin }) => {
    useEffect(() => {
        // Efecto secundario vacío
    }, []);

    return (
        <SafeAreaView>
            <View style={StyleHeaderComponent.headerViewContainer}>
                <View style={StyleHeaderComponent.headerViewItemLeft}>
                    <Image style={{width: 30, height: 30, objectFit: 'cover'}} source={require('@/assets/images/logo.png')} />
                    <Text>Mi municipio</Text>
                </View>
                <View style={StyleHeaderComponent.headerViewItemRight}>
                    <Pressable
                        onPress={pressLogin}
                        style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}
                    >
                        <Text>Ingresar</Text>
                        <FontAwesome5 name="user-circle" size={24} color="black" />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default HeaderComponent;
