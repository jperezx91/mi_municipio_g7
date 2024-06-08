import {Stack} from 'expo-router'

const StackLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="login" options={{title: 'Iniciar sesión', headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            <Stack.Screen name="recupero" options={{title: 'Recuperar contraseña', headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            <Stack.Screen name="recupero_validar" options={{title: 'Recuperar contraseña', headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            <Stack.Screen name="nueva_pass" options={{title: 'Nueva contraseña', headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            <Stack.Screen name="nueva_pass_perfil" options={{title: 'Cambiar contraseña', headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            <Stack.Screen name="registro" options={{title: 'Registro', headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
        </Stack>
    )
}
export default StackLayout
