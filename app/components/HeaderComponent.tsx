import React, { useEffect } from 'react';
import {View, Text, Pressable, StyleSheet, StatusBar, SafeAreaView} from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StyleHeaderComponent } from "@/app/components/styles";

function HeaderComponent() {
    useEffect(() => {
    }, []);

    return (
        <SafeAreaView>

            <View style={StyleHeaderComponent.headerViewContainer}>
                <View style={StyleHeaderComponent.headerViewItemLeft}>
                    <FontAwesome5 name="building" size={24} color="black" />
                    <Text>Mi municipio</Text>
                </View>
                <View style={StyleHeaderComponent.headerViewItemRight}>
                    <Pressable>
                        <Text>Ingresar</Text>
                    </Pressable>
                    <FontAwesome5 name="user-circle" size={24} color="black" />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default HeaderComponent;
