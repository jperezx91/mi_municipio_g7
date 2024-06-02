import {Stack} from 'expo-router'

const StackLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="profile" options={{title: 'Perfil', headerShown: true, headerTitleAlign: 'center'}} />
        </Stack>
    )
}
export default StackLayout
