import React from 'react';
import {ScrollView, View, Text, Dimensions, TextInput, TextInputProps, StyleProp, ViewStyle, TouchableOpacity, Image} from "react-native";
import {PrincipalStyle} from "@/app/styles";
import FormButton from "@/app/components/FormButton";
const { height } = Dimensions.get('window');
import * as ImagePicker from 'expo-image-picker';


interface FormPublicacionTextInputProps {
    titulo?: string;
    placeholder?: string;
    obligatorio?: boolean;
    tipoKeyboard?: TextInputProps['keyboardType'];
    style?: StyleProp<ViewStyle>;
    font?:'outfit';
}
const FormPublicacionTextInput: React.FC<FormPublicacionTextInputProps>  = ({titulo="", placeholder="", obligatorio=true, tipoKeyboard="default", style={}}) =>
{
    return (
            <View style={[{display: 'flex', gap: 8, marginBottom: 8}, style]}>
                <Text style={{                            fontFamily:'outfit',
                            fontSize:15}}>{obligatorio && "*"}{titulo}</Text>
                <TextInput keyboardType={tipoKeyboard}
                           placeholder={placeholder}
                           style={{
                            padding:10,
                            borderWidth:1,
                            borderRadius:5,
                            backgroundColor:'white',

                            borderColor:'gray',
                            fontFamily:'outfit',
                            fontSize:15
                           }}/>
            </View>
    )
}
function NuevaPublicacion() {

    const onImage=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          console.log(result);
    }

    return (
        <ScrollView style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
            <View style={{marginTop: 15, padding: 20, paddingTop: 0}}>
                <Text style={{fontFamily:'outfit-bold', fontSize:20}}> 
                    Crea una nueva publicación
                </Text>
                <Text style={{fontFamily:'outfit', fontSize:15, color:'gray', marginBottom:15}}> 
                    Completa los campos necesarios para crear una nueva publicación. 
                </Text>
                <FormPublicacionTextInput tipoKeyboard={"numeric"} titulo={"Comercio"} placeholder={"Ingrese el nombre de su comercio"} />
                <FormPublicacionTextInput titulo={"Dirección"} placeholder={"Ingrese la dirección de su comercio"} />
                <FormPublicacionTextInput titulo={"Horario"} placeholder={"Ingrese el horario de su comercio"} />
                <FormPublicacionTextInput tipoKeyboard={'numeric'} titulo={"Teléfono"} placeholder={"Ingrese el teléfono de su comercio"} />
                <FormPublicacionTextInput titulo={"Título"} placeholder={"Ingrese el título de su publicación"} />
                <FormPublicacionTextInput titulo={"Descripción"} placeholder={"Ingrese la descripción de su publicación"} />
                <Text style={{                            fontFamily:'outfit',
                            fontSize:15}}>Imágenes</Text>
                <TouchableOpacity 
                    style={{margin:20}}
                    onPress={()=>onImage()}
                >
                    <Image 
                    source={require('../../../../assets/images/publicacion_place_holder.png')}
                    style={{width:20,height:20}}
                    />
                </TouchableOpacity>
            </View>
            <View style={{width: "70%", margin: 'auto', marginVertical: 10}}><FormButton title={"Cargar publicación"}/></View>
        </ScrollView>
    );
}

export default NuevaPublicacion;
