import React from 'react';
import {ScrollView, View, Text, Dimensions, TextInput, TextInputProps, StyleProp, ViewStyle, TouchableOpacity, Image} from "react-native";
import {PrincipalStyle} from "@/app/styles";

function MisPublicaciones() {

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
                <Text style={{fontFamily:'outfit-bold', fontSize:20}}>
                    Mis publicaciones
                </Text>
        </ScrollView>
    );
}

export default MisPublicaciones;