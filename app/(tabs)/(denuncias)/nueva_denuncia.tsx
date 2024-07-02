import React, {useState} from 'react';
import {
    ScrollView,
    View,
    Text,
    Dimensions,
    TextInput,
    TextInputProps,
    StyleProp,
    ViewStyle,
    TouchableOpacity,
    Image,
    Alert,
    Pressable
} from "react-native";
import {PrincipalStyle} from "@/app/styles";
import FormButton from "@/app/components/FormButton";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import {crearDenuncia, crearSolicitudNuevaPublicacion} from '@/app/networking/api';
import {router, useFocusEffect, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import {useCoordState} from "@/app/networking/context";
import {Checkbox} from "expo-checkbox";
import * as Network from 'expo-network';
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { ImagenSeleccionada, cargarImagenes, eliminarImagen } from '@/app/utils/cargar_fotos';

const { height } = Dimensions.get('window');

// Restricciones en contenido de publicaciones
const MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS = 10;


interface FormPublicacionTextInputProps {
    titulo?: string;
    placeholder?: string;
    explicacion?: string;
    obligatorio?: boolean;
    tipoKeyboard?: TextInputProps['keyboardType'];
    style?: StyleProp<ViewStyle>;
    font?:'outfit';
    largoMaximo?: number;
    multiLinea?: boolean;
    numeroLineas?: number;
    alineacionVertical?: 'auto' | 'top' | 'bottom' | 'center';
    value: string;
    onChangeText: (text: string) => void;
}


const FormPublicacionTextInput: React.FC<FormPublicacionTextInputProps>  = ({
                                                                                titulo="",
                                                                                placeholder="",
                                                                                explicacion="",
                                                                                obligatorio=true,
                                                                                tipoKeyboard="default",
                                                                                style={},
                                                                                largoMaximo,
                                                                                multiLinea = false,
                                                                                numeroLineas = 1,
                                                                                alineacionVertical = 'center',
                                                                                value,
                                                                                onChangeText
                                                                            }) => {



    return (
        <View style={[{display: 'flex', gap: 8, marginBottom: 8}, style]}>
            <Text style={{fontFamily:'outfit', fontSize:15}}>{obligatorio && "*"}{titulo}</Text>
            <Text style={{fontFamily:'outfit', fontSize:12}}>{explicacion}</Text>
            <TextInput
                keyboardType={tipoKeyboard}
                placeholder={placeholder}
                style={{
                    padding:10,
                    borderWidth:1,
                    borderRadius:5,
                    backgroundColor:'white',

                    borderColor:'gray',
                    fontFamily:'outfit',
                    fontSize:15,
                    textAlignVertical: alineacionVertical,
                }}
                maxLength = {largoMaximo}
                multiline = {multiLinea}
                numberOfLines={numeroLineas}
                value = {value}
                onChangeText = {onChangeText}
            />

        </View>
    )
}

function NuevaDenuncia() {
    const {location, setLocation} = useCoordState()
    const [direccion, setDireccion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenes, setImagenes] = useState<ImagenSeleccionada[]>([]);
    const [declaracion, setDeclaracion] = useState(false) // si acepta o no la declaración jurada

    // Funciones de gestión de imágenes
    const cargarImagenesAdicionales = async () => {
        setImagenes(await cargarImagenes(imagenes.length, imagenes, MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS, false));
    };
    const triggerEliminarImagen = (idImagen: number) => {
        setImagenes(eliminarImagen(idImagen, imagenes));
    }

    const validarCampos = () => {

        const camposObligatorios = [
            { valor: descripcion, nombre: 'Descripcion' },
        ];

        for (let campo of camposObligatorios) {
            if (campo.valor == '' || campo.valor.trim() === '') {
                Alert.alert('Error', `El campo ${campo.nombre} es obligatorio.`);
                return false;
            }
        }

        return true;
    };
    // @ts-ignore
    const cargarDenunciaOnline = async (datosDenuncia)=>
    {
        try {
            const response = await crearDenuncia(datosDenuncia);
            if (response.status === 200) {
                Alert.alert("Denuncia creada", "Su denuncia fue registrada correctamente.");
                // Reiniciar los campos después de una solicitud exitosa
                setDireccion('');
                setDescripcion('');
                setImagenes([]);
                router.back()
            } else {
                Alert.alert("Error", "Error al crear la solicitud de nueva publicación");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Error al crear la solicitud de nueva publicación");
        }
    }
    const onSubmit = async () => {
        if(!declaracion)
        {
            Alert.alert("Error", "Debe de aceptar esta denuncia como una declaración jurada.")
            return
        }
        if(validarCampos()){
            const base64Strings = imagenes.map(imagen => imagen.base64);
            const calle = "Calle"
            const numero = "123"
            // @ts-ignore
            const latitud = location.latitude
            // @ts-ignore
            const longitud = location.longitude

            const datosDenuncia = {
                latitud,
                longitud,
                calle,
                numero,
                descripcion,
                imagenes: base64Strings,
            };
            const estadoRed = await Network.getNetworkStateAsync()
            let subidaOffline = false;
            if(estadoRed.type != "WIFI"){ // No estamos conectados por WiFi, debemos de preguntar si quiere subir esto o no.
                Alert.alert("Denuncia pendiente", "Hemos detectado que no estás conectado por WiFi. ¿Desea usar sus datos y continuar con la carga, o que cargue cuando esté con conexión WiFi?", [
                    {
                        text: 'Continuar y usar datos',
                        onPress: ()=>
                        {
                            cargarDenunciaOnline(datosDenuncia)
                            router.back()
                        },
                    },
                    {
                        text: 'Cargar luego',
                        onPress: async ()=>
                        {
                            let denuncias: string | null | [] = await asyncStorage.getItem("denuncias_datos")
                            let denunciaData = []
                            if(denuncias != null)
                            {
                                denunciaData = JSON.parse(denuncias);
                            }
                            denunciaData.push(datosDenuncia)
                            await asyncStorage.setItem("denuncias_datos", JSON.stringify(denunciaData));
                            router.back()
                        },
                    }

                ])
            }else{
                cargarDenunciaOnline(datosDenuncia)
            }


        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
            <View style={{marginTop: 15, padding: 20, paddingTop: 0}}>
                <Text style={{fontFamily:'outfit-bold', fontSize:20}}>
                    Cargar una denuncia
                </Text>
                <Text style={{fontFamily:'outfit', fontSize:15, color:'gray', marginBottom:15}}>
                    Complete los campos necesarios para cargar la denuncia.
                </Text>

                <FormPublicacionTextInput
                    largoMaximo={1000}
                    titulo={"Descripción (Máximo: 1.000 caracteres)"}
                    explicacion={
                        "Ingrese una descripción de la denuncia que desea realizar."
                    }
                    placeholder={"Descripción"}
                    obligatorio={true}
                    multiLinea={true}
                    numeroLineas={4}
                    alineacionVertical={'top'}
                    value={descripcion}
                    onChangeText={setDescripcion}
                />


                <TouchableOpacity onPress={()=>cargarImagenesAdicionales()}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop:10}}>
                        <Text style={{fontFamily:'outfit', fontSize:15}}>Subir Imágenes de la denuncia</Text>
                        <AntDesign style={{height: '100%'}} name="pluscircleo" size={24} color="black" />
                    </View>
                    <Text style={{fontFamily:'outfit', fontSize:12, marginTop: 5}}>Seleccione las imágenes relacionada con su denuncia.</Text>
                </TouchableOpacity>

                {/* Mostrar imagenes de la denuncia */}
                <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    {imagenes.map((image) => (
                        <View key={image.id}>
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${image.base64}` }}
                                style={{ width: 75, height: 75, resizeMode: 'cover', borderRadius: 5, margin: 5}}
                            />
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: 5,
                                    right: 5,
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    borderRadius: 12,
                                    width: 24,
                                    height: 24,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => triggerEliminarImagen(image.id)}
                            >
                                <AntDesign name="close" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <TouchableOpacity onPress={()=> { router.push("denuncia/cargar_mapa")}}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop:10}}>
                        <Text style={{fontFamily:'outfit', fontSize:15}}>Cargar ubicación de la denuncia</Text>
                        <AntDesign style={{height: '100%'}} name="enviromento" size={24} color="black" />
                    </View>
                    <Text style={{fontFamily:'outfit', fontSize:12, marginTop: 5}}>Seleccione la ubicación de la denuncia en el mapa.</Text>
                </TouchableOpacity>
                <Pressable onPress={()=>{ setDeclaracion(!declaracion)}} style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 20}}>
                    <Checkbox color={'#0d3f6e'} value={declaracion} onValueChange={setDeclaracion} /><Text>Acepto que ésta denuncia es una declaración jurada.</Text>
                </Pressable>
            </View>



            <View style={{width: "70%", margin: 'auto', marginVertical: 10}}>
                <FormButton title={"Cargar denuncia"} action={onSubmit} />
            </View>
        </ScrollView>
    );
}

export default NuevaDenuncia;
