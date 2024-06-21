import React, {useState} from 'react';
import {ScrollView, View, Text, Dimensions, TextInput, TextInputProps, StyleProp, ViewStyle, TouchableOpacity, Image, Alert} from "react-native";
import {PrincipalStyle} from "@/app/styles";
import FormButton from "@/app/components/FormButton";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { crearSolicitudNuevaPublicacion } from '@/app/networking/api'; // Import the API function

const { height } = Dimensions.get('window');

// Restricciones en contenido de publicaciones
const MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS = 4;

// Interfaz para crear listado de imagenes cargadas hasta el momento
interface ImagenSeleccionada {
    id: number;
    base64: string;
  }
var idImagen = 0;

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

function NuevaPublicacion() {
    const [comercio, setComercio] = useState('');
    const [rubro, setRubro] = useState('');
    const [direccion, setDireccion] = useState('');
    const [horario, setHorario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [imagenes, setImagenes] = useState<ImagenSeleccionada[]>([]);

    const cargarFotosAdicionales = async () => {
        const cantidadImagenesCargadas = imagenes.length;
        const cantidadImagenesRestantesPermitidas = MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS - cantidadImagenesCargadas;
        if(cantidadImagenesRestantesPermitidas > 0){
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
                selectionLimit: cantidadImagenesRestantesPermitidas,
                orderedSelection: true
            });
        
            if (!result.canceled && result.assets) {
                const newImages: ImagenSeleccionada[] = result.assets
                .map((asset, index) => ({
                    id: idImagen + 1,
                    base64: asset.base64 as string,
                }))
                .filter((image) => image.base64 !== undefined) as ImagenSeleccionada[];
                idImagen++;
        
                if (cantidadImagenesCargadas + newImages.length > MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS) {
                    Alert.alert(`No se permite agregar más de ${MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS} imágenes.`);
                } else {
                    setImagenes([...imagenes, ...newImages]);
                }
            }
        } else {
            Alert.alert(`No se permite agregar más de ${MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS} imágenes adicionales.`);
        }
    };

    const cargarThumbnail = async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
            selectionLimit: 1
          });
          
          console.log(result);

          if (!result.canceled && result.assets && result.assets[0].base64) {
            setThumbnail(result.assets[0].base64);
        }
    }

    const eliminarImagen = (id: number) => {
        const imagenesActualizadas = imagenes.filter((image) => image.id !== id);
        setImagenes(imagenesActualizadas);
      };

    const eliminarThumbnail = () => setThumbnail(null);
    
    const validarCampos = () => {
        
        const camposObligatorios = [
          { valor: comercio, nombre: 'Nombre del Comercio' },
          { valor: rubro, nombre: 'Rubro' },
          { valor: horario, nombre: 'Horario de Atención' },
          { valor: telefono, nombre: 'Teléfono' },
          { valor: titulo, nombre: 'Título' },
          { valor: descripcion, nombre: 'Descripción' },
        ];
    
        for (let campo of camposObligatorios) {
          if (campo.valor == '' || campo.valor.trim() === '') {
            Alert.alert('Error', `El campo ${campo.nombre} es obligatorio.`);
            return false;
          }
        }

        return true;
      };

    const onSubmit = async () => {

        if(validarCampos()){
            const base64Strings = imagenes.map(imagen => imagen.base64);

            const datosPublicacion = {
            comercio,
            rubro,
            direccion,
            horario,
            telefono,
            titulo,
            descripcion,
            thumbnail,
            imagenes: base64Strings,
            };

            try {
                const response = await crearSolicitudNuevaPublicacion(datosPublicacion);
                if (response.status === 200) {
                    Alert.alert("Envío de solicitud exitoso", "Solicitud de nueva publicación creada exitosamente. Le informaremos cuando sea aprobada.");
                    // Reiniciar los campos después de una solicitud exitosa
                    setComercio('');
                    setRubro('');
                    setDireccion('');
                    setHorario('');
                    setTelefono('');
                    setTitulo('');
                    setDescripcion('');
                    setThumbnail(null);
                    setImagenes([]);
                } else {
                    Alert.alert("Error", "Error al crear la solicitud de nueva publicación");
                }
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Error al crear la solicitud de nueva publicación");
            }
        }
    }
    
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
            <View style={{marginTop: 15, padding: 20, paddingTop: 0}}>
                <Text style={{fontFamily:'outfit-bold', fontSize:20}}>
                    Crear una nueva publicación
                </Text>
                <Text style={{fontFamily:'outfit', fontSize:15, color:'gray', marginBottom:15}}>
                    Complete los campos necesarios para crear una nueva publicación. Una vez enviada, será 
                    revisada por nuestro equipo antes de ser publicada.
                </Text>
                <FormPublicacionTextInput
                    tipoKeyboard={"default"}
                    titulo={"Nombre del Comercio / Servicio"}
                    explicacion={
                        'Ingrese el nombre de su comercio, su nombre o el de su marca.'
                    }
                    placeholder={"Nombre del comercio, del profesional, o marca"}
                    value={comercio}
                    onChangeText={setComercio}
                    />
                <FormPublicacionTextInput
                    titulo={"Rubro"}
                    explicacion={
                        'Ingrese el/los rubro/s en el/los que se desempeña (ejemplo: "Restaurante", "Abogacía")'
                    }
                    placeholder={"Rubro"}
                    value={rubro}
                    onChangeText={setRubro}
                    />
                <FormPublicacionTextInput
                    titulo={"Dirección"}
                    explicacion={
                        'Ingrese la dirección de su comercio u oficina.'
                    }
                    obligatorio = {false}
                    placeholder={"Dirección"}
                    value={direccion}
                    onChangeText={setDireccion}
                    />
                <FormPublicacionTextInput
                    titulo={"Horario de Atención"}
                    explicacion={
                        'Ingrese los horarios de atención de su comercio/empresa.'
                    }
                    placeholder={"Horario"}
                    value={horario}
                    onChangeText={setHorario}
                    />
                <FormPublicacionTextInput
                    tipoKeyboard={'numeric'}
                    titulo={"Teléfono"}
                    explicacion={
                        'Ingrese un número de teléfono para que gente interesada pueda contactar su comercio/empresa.'
                    }
                    placeholder={"Teléfono"}
                    value={telefono}
                    onChangeText={setTelefono}
                    />
                <FormPublicacionTextInput
                    titulo={"Título"}
                    explicacion={
                        "Ingrese el título de su publicación. Elija un título claro y llamativo, que permita entender qué es lo que se promociona. Máximo: 50 caracteres."
                    }
                    placeholder={"Título"}
                    value={titulo}
                    onChangeText={setTitulo}
                    largoMaximo={50}
                    multiLinea={true}
                    />
                <FormPublicacionTextInput
                    largoMaximo={1000}
                    titulo={"Descripción (Máximo: 1.000 caracteres)"}
                    explicacion={
                        "Ingrese una descripción de su comercio, producto, servicio o promoción. Máximo: 1.000 caracteres."
                    }
                    placeholder={"Descripción"}
                    obligatorio={false}
                    multiLinea={true}
                    numeroLineas={4}
                    alineacionVertical={'top'}
                    value={descripcion}
                    onChangeText={setDescripcion}
                    />
                <TouchableOpacity onPress={()=>cargarThumbnail()}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop:10}}>
                        <Text style={{fontFamily:'outfit', fontSize:15}}>Cargar una imagen de portada</Text>
                        <AntDesign name="pluscircleo" size={24} color="black" />
                    </View>
                    <Text style={{fontFamily:'outfit', fontSize:12, marginTop: 5}}>Seleccione la imagen que mejor represente su publicación.</Text>
                </TouchableOpacity>

                {/* Mostrar humbnail cargado */}
                {thumbnail && (
                    <View style={{ marginTop: 10 }}>
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${thumbnail}` }}
                            style={{ width: '100%', height: 200, resizeMode: 'cover', borderRadius: 5, margin: 5}}
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
                            onPress={eliminarThumbnail}
                        >
                            <AntDesign name="close" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
                
                <TouchableOpacity onPress={()=>cargarFotosAdicionales()}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop:10}}>
                    <Text style={{fontFamily:'outfit', fontSize:15}}>Subir Imágenes adicionales</Text>
                    <AntDesign style={{height: '100%'}} name="pluscircleo" size={24} color="black" />
                    </View>
                    <Text style={{fontFamily:'outfit', fontSize:12, marginTop: 5}}>Puede seleccionar hasta 4 imagenes adicionales para su publicación.</Text>
                </TouchableOpacity>

                {/* Mostrar imagenes adicinales cargadas */}
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
                            onPress={() => eliminarImagen(image.id)}
                        >
                            <AntDesign name="close" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                    ))}
                </View>
            </View>

            

            <View style={{width: "70%", margin: 'auto', marginVertical: 10}}>
                <FormButton title={"Cargar publicación"} action={onSubmit} />
            </View>
        </ScrollView>
    );
}

export default NuevaPublicacion;
