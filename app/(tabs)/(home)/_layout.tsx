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
            <Stack.Screen name="extra" options={{title: 'Extra', headerShown: true}} />
        </Stack>
    )
}
export default StackLayout
