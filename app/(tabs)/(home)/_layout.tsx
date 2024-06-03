import {router, Stack, useFocusEffect} from 'expo-router'
import HeaderComponent from "@/app/components/HeaderComponent";
import {Dimensions} from "react-native";
import {useCallback, useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import {jwtDecode} from "jwt-decode";
const StackLayout = () => {
    const [dataUser, setDataUser] = useState("");

    useFocusEffect(useCallback(()=> {
        const bearerToken =  SecureStore.getItem('bearerToken')
        console.log(bearerToken, "actual");
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
            <Stack.Screen name="publicacion/[id]" options={{title: 'Publicación', headerShown: true, headerTitleAlign: 'center',  headerStyle: {backgroundColor: '#C7DCFF'}}} />
        </Stack>
    )
}
export default StackLayout
