import {Stack} from 'expo-router'

const StackLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="profile" options={{title: 'Perfil', headerShown: true, headerTitleAlign: 'center', headerStyle: {backgroundColor: '#C7DCFF'}}} />
        </Stack>
    )
}
export default StackLayout
