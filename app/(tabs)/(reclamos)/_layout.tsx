import {Stack} from 'expo-router'

const StackLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="reclamos" options={{title: 'Reclamos', headerShown: true, headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            <Stack.Screen name="reclamo/[id]" options={{title: 'Reclamo', headerShown: true, headerTitleAlign: 'center',  headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            <Stack.Screen name="reclamo/seguimiento" options={{title: 'Seguimiento', headerShown: true, headerTitleAlign: 'center',  headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            <Stack.Screen name="misReclamos" options={{title: 'Mis Reclamos', headerShown: true, headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />

        </Stack>
    )
}
export default StackLayout
