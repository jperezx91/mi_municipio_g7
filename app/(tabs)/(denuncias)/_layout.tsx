import {Stack} from 'expo-router'

const StackLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="index" options={{title: 'Denuncias', headerShown: false}} />
        </Stack>
    )
}
export default StackLayout
