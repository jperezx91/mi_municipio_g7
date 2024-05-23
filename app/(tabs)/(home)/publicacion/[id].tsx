import React from 'react';
import {View, Text} from "react-native";
import {router, useGlobalSearchParams} from "expo-router";
import { ExpoRoot } from 'expo-router';


const Id = () => {
    const irAtras = () =>
    {
        router.back()
    }
    const { id } = useGlobalSearchParams()
    return (
        <View>
            <Text onPress={irAtras}>
                {id}
            </Text>
        </View>
    );
};

export default Id;
