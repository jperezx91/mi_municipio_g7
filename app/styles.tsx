import {StyleSheet} from "react-native";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";
const PrincipalStyle = StyleSheet.create(
    {
        principalContainer: {
            flex: 1,
            width: '93%',
            margin: 'auto', // o usar justify-content: center y usar otro view extra?

        }

    }
)
export {PrincipalStyle}
