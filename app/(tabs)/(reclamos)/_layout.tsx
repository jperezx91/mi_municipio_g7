import {Stack} from 'expo-router'

const StackLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="index" options={{title: 'Reclamos', headerShown: true}} />
        </Stack>
    )
}
export default StackLayout
