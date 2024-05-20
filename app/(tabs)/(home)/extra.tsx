import React from 'react';
import {View, Text} from "react-native";
import {router} from "expo-router";

const Extra = () => {
    const irAtras = () =>
    {
        router.back()
    }
    return (
        <View>
            <Text onPress={irAtras}>
                atras
            </Text>
        </View>
    );
};

export default Extra;
