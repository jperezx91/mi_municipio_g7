import React from 'react';
import {ScrollView, View, Text, Dimensions, TextInput, TextInputProps, StyleProp, ViewStyle, TouchableOpacity, Image, SafeAreaView, FlatList} from "react-native";
import {PrincipalStyle} from "@/app/styles";
import StyleHome from "@/app/(tabs)/(home)/styles";



function Seguimiento() {

    const mockup_data_publicacion =
    [
        {
            id: "1",
            title: 'Pizzería Los hornos',
            imgUrl: 'lxd',
            desc: '¡Promo imperdible!'

        },
        {
            id: "2",
            title: 'Escribanía Flores Hnos.',
            imgUrl: 'lxd',
            desc: 'Servicios de escribanía de la mejor calidad.'
        },
        {
            id: "3",
            title: 'Negocio A',
            imgUrl: 'lxd',
            desc: 'Esto es una descripcion A'
        },
        {
            id: "4",
            title: 'Negocio B',
            imgUrl: 'lxd',
            desc: 'Esto es una descripcion B'
        },

        {
            id: "5",
            title: 'Negocio C',
            imgUrl: 'lxd',
            desc: 'Esto es una descripcion C'
        }

    ]


    return (
        <SafeAreaView style={PrincipalStyle.principalContainer}>{/* <SafeAreaView style={{flex: 1, width: "93%", margin: 'auto', justifyContent: 'center', alignItems: 'center'}}> */}
                <FlatList
                    style={StyleHome.flatListContainer}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View>
                            <Text>Seguimiento</Text>
                        </View>
                    }data={[]} renderItem={()=> (<></>)}>
                </FlatList>
        </SafeAreaView>
    );
}

export default Seguimiento;