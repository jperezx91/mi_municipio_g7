import {Stack} from 'expo-router'

const StackLayoutDenuncias = () => {
    return(
        <Stack>
            <Stack.Screen name="denuncias" options={{title: 'Denuncias', headerShown: false}} />
        </Stack>
    )
}
export default StackLayoutDenuncias
