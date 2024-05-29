import {router, Stack} from 'expo-router'
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
                    header: (props) => <HeaderComponent pressLogin={() => { router.push("login")}} />
                }}
            />
            <Stack.Screen name="publicacion/[id]" options={{title: 'Publicación', headerShown: true, headerTitleAlign: 'center',  headerStyle: {backgroundColor: '#C7DCFF'}}} />
        </Stack>
    )
}
export default StackLayout
