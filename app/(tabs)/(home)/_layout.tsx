import {router, Stack, useFocusEffect} from 'expo-router'
import HeaderComponent from "@/app/components/HeaderComponent";
import {Dimensions} from "react-native";
import {useCallback, useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import {jwtDecode} from "jwt-decode";
const StackLayoutHome = () => {
    const [dataUser, setDataUser] = useState("");

    useFocusEffect(useCallback(()=> {
        const bearerToken =  SecureStore.getItem('bearerToken')
        if(bearerToken)
        {
            const payload = jwtDecode(bearerToken)
            // @ts-ignore
            setDataUser(payload["nombre"])
        }else{
            setDataUser("")
        }
    }, []))
    return(
        <Stack>
            { /*<Stack.Screen name="index" options={{title: 'Home', headerShown: true}} /> */ }
            <Stack.Screen
                name="index"
                options={{
                    title: 'Home',
                    header: (props) => <HeaderComponent dataUser={dataUser} pressLogin={() => { router.push("login")}} />
                }}
            />
            <Stack.Screen name="publicacion/[id]" options={{title: 'Publicación', headerShown: true, headerTitleAlign: 'center',  headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            <Stack.Screen name="publicacion/nueva_publicacion" options={{title: 'Nueva publicación', headerShown: true, headerTitleAlign: 'center',  headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            <Stack.Screen name="notificaciones" options={{title: 'Notificaciones', headerShown: true, headerTitleAlign: 'center',  headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />

        </Stack>
    )
}
export default StackLayoutHome
