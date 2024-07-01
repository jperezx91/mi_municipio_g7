import {Stack} from 'expo-router'
import {CoordStateProvider} from "@/app/networking/context";

const StackLayout = () => {
    return(
        <CoordStateProvider>
            <Stack>
                <Stack.Screen name="reclamos" options={{title: 'Reclamos', headerShown: true, headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
                <Stack.Screen name="misReclamos" options={{title: 'Mis Reclamos', headerShown: true, headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
                <Stack.Screen name="reclamo/[id]" options={{title: 'Reclamo', headerShown: true, headerTitleAlign: 'center',  headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
                <Stack.Screen name="reclamo/[id]/seguimiento" options={{title: 'Seguimiento', headerShown: true, headerTitleAlign: 'center',  headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
                <Stack.Screen name="reclamo/nuevo_reclamo" options={{title: 'Nuevo Reclamo', headerShown: true, headerTitleAlign: 'center',  headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
                <Stack.Screen name="reclamo/cargar_mapa" options={{title: 'Seleccionar Ubicación', headerShown: true, headerTitleAlign: 'center',  headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            </Stack>
        </CoordStateProvider>
    )
}
export default StackLayout
