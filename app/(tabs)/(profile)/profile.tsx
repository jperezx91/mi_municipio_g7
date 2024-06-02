import {View, Text, SafeAreaView, Pressable} from 'react-native';
import * as SecureStore from "expo-secure-store";
import {router} from "expo-router";

export default function HomeScreen() {
    return (
        <SafeAreaView>
            <Pressable onPress={()=> {
                SecureStore.deleteItemAsync("bearerToken")
                    .then((r)=>{
                        router.replace("login")
                    })
            }}><Text>Cerrar sesion</Text></Pressable>
        </SafeAreaView>
    );
}

