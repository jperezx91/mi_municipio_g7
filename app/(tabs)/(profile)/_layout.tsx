import {Stack} from 'expo-router'

const StackLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="profile" options={{title: 'Perfil', headerShown: true, headerTitleAlign: 'center', headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />
            <Stack.Screen name="misPublicaciones" options={{title: 'Mis publicaciones', headerShown: true, headerTitleAlign: 'center',  headerStyle: {backgroundColor: '#4891c7'}, headerTintColor:'white', headerTitleStyle:{fontFamily:'outfit', fontSize:20}}} />

        </Stack>
    )
}
export default StackLayout
