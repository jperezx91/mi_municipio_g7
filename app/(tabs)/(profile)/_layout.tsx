import {Stack} from 'expo-router'

const StackLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="profile" options={{title: 'Perfil', headerShown: false}} />
        </Stack>
    )
}
export default StackLayout
