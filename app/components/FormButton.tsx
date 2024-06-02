import React from 'react';
import {Pressable, Text} from "react-native";

const FormButton = ({disabeled=false, title="", invertStyle=false, action=(()=> {})}) => {
    return (
        <Pressable disabled={disabeled} style={{
            backgroundColor: !invertStyle ? '#0F62FE' : 'white',
            paddingVertical: 15,
            borderWidth: (invertStyle ? 1 : 0),
            borderColor: invertStyle ? '#0F62FE' : ''
        }} onPress={action}><Text
            style={{color: !invertStyle ? 'white' : '#0F62FE', textAlign: 'center', fontWeight: 'bold'}}>{title}</Text></Pressable>
    )
}
export default FormButton
