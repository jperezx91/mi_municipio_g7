import React from 'react';
import {ScrollView, View, Text, Dimensions, TextInput, TextInputProps, StyleProp, ViewStyle} from "react-native";
import {PrincipalStyle} from "@/app/styles";
import FormButton from "@/app/components/FormButton";
const { height } = Dimensions.get('window');

interface FormPublicacionTextInputProps {
    titulo?: string;
    placeholder?: string;
    obligatorio?: boolean;
    tipoKeyboard?: TextInputProps['keyboardType'];
    style?: StyleProp<ViewStyle>;
}
const FormPublicacionTextInput: React.FC<FormPublicacionTextInputProps>  = ({titulo="", placeholder="", obligatorio=true, tipoKeyboard="default", style={}}) =>
{
    return (
            <View style={[{display: 'flex', gap: 8, marginBottom: 8}, style]}>
                <Text>{obligatorio && "*"}{titulo}</Text>
                <TextInput keyboardType={tipoKeyboard}
                           placeholder={placeholder}
                           style={{
                               backgroundColor: "#F2F4F8",
                               padding: 10,
                               borderBottomWidth: 1,
                               borderBottomColor: "#C1C7CD"
                           }}/>
            </View>
    )
}
function NuevaPublicacion() {
    return (
        <ScrollView style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
            <View style={{marginTop: 15, padding: 20, paddingTop: 0, backgroundColor: 'white', height: Dimensions.get('window').height * 0.75}}>
                <FormPublicacionTextInput tipoKeyboard={"numeric"} titulo={"Comercio"} placeholder={"Ingrese el nombre de su comercio"} />
                <FormPublicacionTextInput titulo={"Dirección"} placeholder={"Ingrese la dirección de su comercio"} />
                <FormPublicacionTextInput titulo={"Horario"} placeholder={"Ingrese el horario de su comercio"} />
                <FormPublicacionTextInput tipoKeyboard={'numeric'} titulo={"Teléfono"} placeholder={"Ingrese el teléfono de su comercio"} />
                <FormPublicacionTextInput obligatorio={false} titulo={"Imágenes"} placeholder={"Si desea puede agregar una imagen"} />
                <FormPublicacionTextInput titulo={"Título"} placeholder={"Ingrese el título de su publicación"} />
                <FormPublicacionTextInput titulo={"Descripción"} placeholder={"Ingrese la descripción de su publicación"} />
            </View>
            <View style={{width: "70%", margin: 'auto', marginVertical: 10}}><FormButton title={"Cargar publicación"} /></View>
        </ScrollView>
    );
}

export default NuevaPublicacion;
