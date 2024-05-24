import {Stack} from 'expo-router'
import HeaderComponent from "@/app/components/HeaderComponent";
import {Dimensions} from "react-native";
const StackLayout = () => {

    return(
        <Stack>
            { /*<Stack.Screen name="index" options={{title: 'Home', headerShown: true}} /> */ }
            <Stack.Screen
                name="index"
                options={{
                    title: 'Home',
                    header: (props) => <HeaderComponent />
                }}
            />
            <Stack.Screen name="publicacion/[id]" options={{title: 'Publicacion', headerShown: true}} />
            <Stack.Screen name="login" options={{title: 'Login', headerShown: true}} />
        </Stack>
    )
}
export default StackLayout
