import {Stack} from 'expo-router'

const StackLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="reclamos" options={{title: 'Reclamos', headerShown: true}} />
        </Stack>
    )
}
export default StackLayout
