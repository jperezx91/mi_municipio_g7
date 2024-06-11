import {Stack} from 'expo-router'

const StackLayoutDenuncias = () => {
    return(
        <Stack>
            <Stack.Screen name="denuncias" options={{title: 'Denuncias', headerShown: true, headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            <Stack.Screen name="denunciasRecibidas" options={{title: 'Denuncias Recibidas', headerShown: true, headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            <Stack.Screen name="denuncia/[id]" options={{title: 'Denuncia', headerShown: true, headerTitleAlign: 'center',  headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />

        </Stack>
    )
}
export default StackLayoutDenuncias
