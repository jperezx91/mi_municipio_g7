import React, {useCallback, useEffect, useState} from 'react';
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
    Pressable,
} from "react-native";
import {PrincipalStyle} from "@/app/styles";
import FormButton from "@/app/components/FormButton";
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';
import {crearReclamo, obtenerCategorias, obtenerDesperfectos, obtenerSitios} from '@/app/networking/api';
import {router, useFocusEffect, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { useCoordState } from '../../../networking/context';
import {Checkbox} from "expo-checkbox";
import * as Network from 'expo-network';
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { jwtDecode } from 'jwt-decode';
import ModalDropdown from 'react-native-modal-dropdown';
import { Picker } from '@react-native-picker/picker';

// Restricciones en contenido de reclamos
const MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS = 7; // Sólo para vecinos

// Interfaz para crear listado de imagenes cargadas hasta el momento
interface ImagenSeleccionada {
    id: number;
    base64: string;
}
var idImagen = 0;

// Configuración de campos para el ingreso de texto
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

function NuevoReclamo() {

    const {location, setLocation} = useCoordState();
    const [idSitio, setIdSitio] = useState('');
    const [idDesperfecto, setIdDesperfecto] = useState('');
    const [calle, setCalle] = useState('');
    const [numero, setNumero] = useState('');
    const [entreCalleA, setEntreCalleA] = useState('');
    const [entreCalleB, setEntreCalleB] = useState('');
    const [descripcionSitio, setDescripcionSitio] = useState('');
    const [aCargoDe, setACargoDe] = useState('');
    const [apertura, setApertura] = useState('');
    const [cierre, setCierre] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [descripcionReclamo, setDescripcionReclamo] = useState('');
    const [imagenes, setImagenes] = useState<ImagenSeleccionada[]>([]);

    // Código para determinar si el usuario es vecino o inspector

    const [esInspector, setEsInspector] = useState<boolean>(false)

    const obtenerRol = () => {
        const token = SecureStore.getItem("bearerToken")
        if(token){
            const payload = jwtDecode(token)
            // @ts-ignore
            const rol = payload["rol"]
            setEsInspector(rol == "municipal")
        }
    }

    // Funciones para agregar imagenes al reclamo
    const seleccionarImagenDeGaleria = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
            orderedSelection: true
        });
    
        if (!result.canceled) {
            return result.assets;
        }
    };
    
    const tomarFoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });
    
        if (!result.canceled) {
            return result.assets;
        }
    };

    const manejarSeleccionDeImagen = async () => {
        let seleccion;
        await new Promise(resolve => {
            Alert.alert(
                'Seleccionar Fuente de Imagen',
                'Elija una opción para seleccionar una imagen',
                [
                    {
                        text: 'Galería',
                        onPress: () => {
                            seleccion = 'galeria';
                            resolve(undefined);
                        },
                    },
                    {
                        text: 'Tomar Foto',
                        onPress: () => {
                            seleccion = 'camara';
                            resolve(undefined);
                        },
                    },
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                        onPress: () => resolve(undefined),
                    },
                ],
                { cancelable: false }
            );
        });
    
        let resultado;
        if(seleccion === 'galeria'){
            resultado = await seleccionarImagenDeGaleria();
        } else if (seleccion === 'camara'){
            resultado = await tomarFoto();
        }
        if(resultado){
            const imagenesNuevas: ImagenSeleccionada[] = resultado.map((asset: any) => ({
                id: idImagen + 1,
                base64: asset.base64 as string,
            })).filter((imagen) => imagen.base64 !== undefined) as ImagenSeleccionada[];
            
            idImagen++;
    
            return imagenesNuevas;
        }
    };
    
    const cargarFotosAdicionales = async () => {
        const cantidadImagenesCargadas = imagenes.length;
        const cantidadImagenesRestantesPermitidas = MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS - cantidadImagenesCargadas;
        if(cantidadImagenesRestantesPermitidas > 0 || esInspector){
            try {
                let imagenesNuevas = await manejarSeleccionDeImagen();
                
                if (imagenesNuevas) {
                    if (cantidadImagenesCargadas + imagenesNuevas.length > MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS) {
                        Alert.alert(`No se permite agregar más de ${MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS} imágenes.`);
                    } else {
                        setImagenes([...imagenes, ...imagenesNuevas]);
                    }
                }
            } catch (error) {
                console.log(error);
                Alert.alert('Error al seleccionar la imagen', 'Ocurrió un error al seleccionar la imagen.');
            }
        } else {
            Alert.alert(`No se permite agregar más de ${MAXIMAS_IMAGENES_ADICIONALES_PERMITIDAS} imágenes adicionales.`);
        }
    };

    const eliminarImagen = (id: number) => {
        const imagenesActualizadas = imagenes.filter((image) => image.id !== id);
        setImagenes(imagenesActualizadas);
    };

    // Datos de categorías y desperfectos
    const [categorias, setCategorias] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Seleccionar categoría")
    const cargarCategorias = async () => {
        try{
            const respuesta = await obtenerCategorias(esInspector);
            setCategorias(respuesta.data);
            setCategoriaSeleccionada("Seleccionar categoría")
        } catch (e) {
            console.log(e)
        }
    }

    const cambioDeCategoriaSeleccionada = (categoria: string, id: string) => {
        setCategoriaSeleccionada(categoria);
        setDesperfectoSeleccionado("Seleccionar categoría primero");
        cargarDesperfectos(id);
    }

    const [desperfectos, setDesperfectos] = useState([])
    const [desperfectoSeleccionado, setDesperfectoSeleccionado] = useState('Seleccionar categoría primero')
    const cargarDesperfectos = async (idCategoria: string) => {
        if(idCategoria){
            try{
                const respuesta = await obtenerDesperfectos(idCategoria);
                setDesperfectos(respuesta.data);
            } catch (e) {
                console.log(e)
            }
        }
    }
    
    const cambioDeDesperfectoSeleccionado = (idDesperfectoSeleccionado: string, index: string) => {
        setDesperfectoSeleccionado(idDesperfectoSeleccionado);
        console.log("Desperfecto seleccionado es: " + desperfectoSeleccionado);
        
        setIdDesperfecto(idDesperfectoSeleccionado);
        console.log("idDesperfecto es: " + String(idDesperfectoSeleccionado));
    }

    useEffect(() => {
        cargarCategorias();
        obtenerRol();
    }, []);

    // Obtener sitio en base a las coordenadas obtenidas del mapa
    // Pendiente de hacerlo funcionar, no se pueden obtener buenas coordenadas desde el emulador
    const [sitios, setSitios] = useState([]);
    const [sitioSeleccionado, setSitioSeleccionado] = useState('')
    const cargarSitios = async () => {
        try{
            const respuesta = await obtenerSitios(location.longitude, location.latitude);
            if (respuesta.data.length > 0){
                setSitios(respuesta.data);
            }
        } catch(e) {
            console.log(e)
        }
    }

    useFocusEffect(useCallback(()=>{
        cargarSitios();
    }, []))

    // Validar que el usuario haya completado los campos obligatorios
    const validarCampos = () => {

        const camposObligatorios = [
            { valor: descripcionReclamo, nombre: 'Descripcion' },
            { valor: categoriaSeleccionada, nombre: 'Categoría' },
            { valor: idDesperfecto, nombre: 'Desperfecto' },
            { valor: calle, nombre: 'Calle' },
            { valor: numero, nombre: 'Número' },
            { valor: descripcionSitio, nombre: 'Descripción del lugar' }

        ];

        for (let campo of camposObligatorios) {
            if (campo.valor == '') {
                Alert.alert('Error', `El campo ${campo.nombre} es obligatorio.`);
                return false;
            }
        }

        return true;
    };

    // Procesar la carga de reclamo
    // @ts-ignore
    const cargarReclamoOnline = async (datosReclamo)=>
    {
        try {
            const response = await crearReclamo(datosReclamo);
            if (response.status === 200) {
                const idReclamo = response.data.idSolicitud;
                Alert.alert("Reclamo creado", `Su reclamo fue registrado correctamente con el número #${idReclamo}.`);
                // Reiniciar los campos después de una solicitud exitosa
                setIdSitio('')
                setIdDesperfecto('');
                setCalle('');
                setNumero('');
                setEntreCalleA('');
                setEntreCalleB('');
                setDescripcionSitio('');
                setACargoDe('');
                setApertura('');
                setCierre('');
                setComentarios('');
                setImagenes([]);
                router.back()
            } else {
                Alert.alert("Error", "Error al crear la solicitud de nuevo reclamo");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Error al crear la solicitud de nuevo reclamo");
        }
    }

    // Manejador del evento de envío del formulario
    const onSubmit = async () => {
        if(validarCampos()){
            const base64Strings = imagenes.map(imagen => imagen.base64);
            // @ts-ignore
            const latitud = location.latitude
            // @ts-ignore
            const longitud = location.longitude

            const datosReclamo = {
                idSitio,
                idDesperfecto,
                'datosSitio': {
                    latitud,
                    longitud,
                    calle,
                    numero,
                    entreCalleA,
                    entreCalleB,
                    descripcionSitio,
                    aCargoDe,
                    apertura,
                    cierre,
                    comentarios
                },
                descripcionReclamo,
                imagenes: base64Strings,
            };

            const estadoRed = await Network.getNetworkStateAsync()
            let subidaOffline = false;
            
            if (estadoRed.type != "WIFI"){ // No estamos conectados por WiFi, debemos de preguntar si quiere subir esto o no.
                Alert.alert("Reclamo pendiente",
                    "Hemos detectado que no está conectado por WiFi." +
                    "¿Desea usar sus datos y continuar con la carga, "+
                    "o que cargue cuando esté con conexión WiFi?", [
                    {
                        text: 'Continuar y usar datos',
                        onPress: ()=>
                        {
                            cargarReclamoOnline(datosReclamo)
                            router.back()
                        },
                    },
                    {
                        text: 'Cargar luego',
                        onPress: async ()=>
                        {
                            let reclamos: string | null | [] = await asyncStorage.getItem("reclamos_datos")
                            let reclamoData = []
                            if(reclamos != null)
                            {
                                reclamoData = JSON.parse(reclamos);
                            }
                            reclamoData.push(datosReclamo)
                            await asyncStorage.setItem("reclamos_datos", JSON.stringify(reclamoData));
                            router.back()
                        },
                    }

                ])
            } else {
                cargarReclamoOnline(datosReclamo)
            }
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
            <View style={{marginTop: 15, padding: 20, paddingTop: 0}}>
                <Text style={{fontFamily:'outfit-bold', fontSize:20}}>
                    Cargar un reclamo
                </Text>
                <Text style={{fontFamily:'outfit', fontSize:15, color:'gray', marginBottom:15}}>
                    Complete los campos necesarios para cargar el reclamo.
                </Text>

                {/* Descripción */}
                <FormPublicacionTextInput
                    titulo={"Descripción"}
                    explicacion={
                        "Ingrese una descripción del reclamo que desea realizar."
                    }
                    placeholder={"Descripción"}
                    obligatorio={true}
                    multiLinea={true}
                    numeroLineas={4}
                    alineacionVertical={'top'}
                    value={descripcionReclamo}
                    onChangeText={setDescripcionReclamo}
                />

                {/* Categoría y tipo de reclamo */}
                <Text style={{fontFamily:'outfit', fontSize:15, marginVertical:10}}>
                    *Categoría
                </Text>
                <Text style={{fontFamily:'outfit', fontSize:12}}>
                    Seleccione la categoría a la que pertenece su reclamo. 
                </Text>
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor:'gray',
                    marginVertical: 10,
                    }}>
                    <Picker
                        selectedValue={categoriaSeleccionada}
                        onValueChange={(categoriaId, value) => cambioDeCategoriaSeleccionada(categoriaId, String(value))}
                    >
                            <Picker.Item label="Seleccionar categoría" value="Seleccionar categoría" />
                        
                        {categorias.length > 0 && (categorias.map((categoria) => (
                            //@ts-ignore
                            <Picker.Item key={categoria.id} label={categoria.descripcion} value={categoria.id} />
                        )))}
                    </Picker>
                </View>
                <Text style={{fontFamily:'outfit', fontSize:15, marginVertical:10}}>
                        *Desperfecto
                    </Text>
                    <Text style={{fontFamily:'outfit', fontSize:12}}>
                        Seleccione el tipo de desperfecto por el que desea reclamar.
                    </Text>
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor:'gray',
                    marginVertical: 10,
                    }}>
                    
                    <Picker
                        selectedValue={desperfectoSeleccionado}
                        onValueChange={(desperfectoLabel, value) => cambioDeDesperfectoSeleccionado(desperfectoLabel, String(value))}
                    >   
                            <Picker.Item label="Seleccionar desperfecto" value="Seleccionar desperfecto" />
                    {desperfectos.length > 0 && (desperfectos.map((desperfecto) => (
                        //@ts-ignore
                        <Picker.Item key={desperfecto.id} label={desperfecto.descripcion} value={desperfecto.id} />
                    )))}
                    </Picker>
                </View>

                {/* Datos de ubicación */}

                {/* Obtener ubicación en el mapa */}
                <TouchableOpacity style={{marginTop: 15, marginBottom: 25}} onPress={()=> { router.push("reclamo/cargar_mapa")}}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                        <Text style={{fontFamily:'outfit', fontSize:15}}>Cargar ubicación de la denuncia</Text>
                        <AntDesign style={{height: '100%'}} name="enviromento" size={24} color="black" />
                    </View>
                    <Text style={{fontFamily:'outfit', fontSize:12, marginTop: 5}}>Seleccione la ubicación de la denuncia en el mapa.</Text>
                </TouchableOpacity>
                
                {/* Selector de sitios existentes */}
                {sitios.length > 0 && (
                <View>
                <Text style={{fontFamily:'outfit', fontSize:15, marginVertical:10}}>
                    Sitio
                </Text>
                <Text style={{fontFamily:'outfit', fontSize:12}}>
                    Si el sitio respecto del cual quiere hacer el reclamo se encuentra en la siguiente lista, selecciónelo para autocompletar sus datos.
                </Text>
                
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor:'gray',
                    marginVertical: 10,
                    padding: -5
                    }}>
                    <Picker
                        selectedValue={sitioSeleccionado}
                        onValueChange={(sitioLabel) => setSitioSeleccionado(sitioLabel)}
                    >   

                    {sitios.map((sitio) => (
                        //@ts-ignore
                        <Picker.Item key={sitio.id} label={sitio.descripcion} value={sitio.id} />
                    ))}
                    </Picker>
                </View>
                </View>
                )}

                {/* Datos de dirección */}
                <FormPublicacionTextInput
                    titulo={"Calle"}
                    explicacion={
                        "Ingrese el nombre de la calle donde está el desperfecto."
                    }
                    placeholder={"Calle"}
                    obligatorio={true}
                    value={calle}
                    onChangeText={setCalle}
                />
                <FormPublicacionTextInput
                    titulo={"Numero"}
                    explicacion={
                        "Ingrese la altura exacta o aproximada del lugar del desperfecto."
                    }
                    placeholder={"Numero"}
                    obligatorio={true}
                    value={numero}
                    onChangeText={setNumero}
                />
                <FormPublicacionTextInput
                    titulo={"Calle aledaña A"}
                    explicacion={
                        "Ingrese la primera de las calles entre las que está el lugar del desperfecto."
                    }
                    placeholder={"Calle aledaña A"}
                    obligatorio={false}
                    value={entreCalleA}
                    onChangeText={setEntreCalleA}
                />
                <FormPublicacionTextInput
                    titulo={"Calle aledaña B"}
                    explicacion={
                        "Ingrese la segunda de las calles entre las que está el lugar del desperfecto."
                    }
                    placeholder={"Calle aledaña B"}
                    obligatorio={false}
                    value={entreCalleB}
                    onChangeText={setEntreCalleB}
                />
                <FormPublicacionTextInput
                    titulo={"Descripción del Lugar"}
                    explicacion={
                        "Ingrese una descripción del lugar, como 'Colegio Normal 3', o 'Semáforo de la esquina'."
                    }
                    placeholder={"Descripción del lugar"}
                    multiLinea={true}
                    numeroLineas={4}
                    obligatorio={true}
                    alineacionVertical={'top'}
                    value={descripcionSitio}
                    onChangeText={setDescripcionSitio}
                />
                <FormPublicacionTextInput
                    titulo={"Responsable"}
                    explicacion={
                        "Ingrese la persona, empresa u entidad a cargo del lugar del desperfecto, si lo sabe."
                    }
                    placeholder={"Responsable"}
                    obligatorio={false}
                    value={aCargoDe}
                    onChangeText={setACargoDe}
                />
                <FormPublicacionTextInput
                    titulo={"Horario de apertura"}
                    explicacion={
                        "Ingrese el horario de apertura del lugar del desperfecto, si lo conoce."
                    }
                    placeholder={"Horario de apertura"}
                    obligatorio={false}
                    value={apertura}
                    onChangeText={setApertura}
                />
                <FormPublicacionTextInput
                    titulo={"Horario de cierre"}
                    explicacion={
                        "Ingrese el horario de cierre del lugar del desperfecto, si lo conoce."
                    }
                    placeholder={"Horario de cierre"}
                    obligatorio={false}
                    value={cierre}
                    onChangeText={setCierre}
                />
                <FormPublicacionTextInput
                    titulo={"Comentarios sobre el lugar"}
                    explicacion={
                        "Si tiene algún otro dato o comantario sobre el lugar, por favor descríbalo aquí."
                    }
                    placeholder={"Comentarios sobre del lugar"}
                    multiLinea={true}
                    numeroLineas={4}
                    obligatorio={false}
                    alineacionVertical={'top'}
                    value={comentarios}
                    onChangeText={setComentarios}
                />

                {/* Cargar Fotos */}
                <TouchableOpacity onPress={()=>cargarFotosAdicionales()}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop:10}}>
                        <Text style={{fontFamily:'outfit', fontSize:15}}>Subir Imágenes del reclamo</Text>
                        <AntDesign style={{height: '100%'}} name="pluscircleo" size={24} color="black" />
                    </View>
                    <Text style={{fontFamily:'outfit', fontSize:12, marginTop: 5}}>
                        Seleccione imágenes que considere evidencias de su reclamo.
                    </Text>
                </TouchableOpacity>

                {/* Mostrar imagenes del reclamo */}
                <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>
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
                <FormButton title={"Enviar reclamo"} action={onSubmit} />
            </View>
        </ScrollView>
    );
}

export default NuevoReclamo;
