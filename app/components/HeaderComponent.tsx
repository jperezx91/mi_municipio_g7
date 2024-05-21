import React, {useEffect} from 'react';
import {View, Text, Pressable, StyleSheet} from "react-native";
import {Dimensions} from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {StyleHeaderComponent} from "@/app/components/styles";
function HeaderComponent(props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {
    useEffect(() => {
        console.log(props)
    }, []);
    return (
        <View>
            <View style={StyleHeaderComponent.headerViewContainer}>
                <View style={StyleHeaderComponent.headerViewItem}>
                    <Text><FontAwesome5 name="building" size={24} color="black" /></Text><Text>Mi municipio</Text>
                </View>
                <View style={[StyleHeaderComponent.headerViewItem, {justifyContent: 'flex-end'}]}>{ /* Flex comportandose raro */}
                    <Pressable ><Text>Ingresar</Text></Pressable><Text><FontAwesome5 name="user-circle" size={24} color="black" /></Text>
                </View>
            </View>

        </View>
    );
}

export default HeaderComponent;
