import {Stack} from 'expo-router'
import {CoordStateProvider} from "@/app/networking/context";

const StackLayoutDenuncias = () => {
    return(
        <CoordStateProvider>
            <Stack>
                <Stack.Screen name="denuncias" options={{title: 'Denuncias', headerShown: true, headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
                <Stack.Screen name="denuncias_recibidas" options={{title: 'Denuncias recibidas', headerShown: true, headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
                <Stack.Screen name="nueva_denuncia" options={{title: 'Nueva denuncia', headerShown: true, headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
                <Stack.Screen name="denuncia/cargar_mapa" options={{title: 'Seleccionar ubicación', headerShown: true, headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
                <Stack.Screen name="denuncia/[id]" options={{title: 'Denuncia', headerShown: true, headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            </Stack>
        </CoordStateProvider>
    )
}
export default StackLayoutDenuncias
