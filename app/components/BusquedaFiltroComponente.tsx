import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Modal, TextInput, TouchableOpacity, View, Text, Alert } from "react-native";
import { obtenerCategorias, obtenerReclamo } from "../networking/api";
import { router } from "expo-router";
import * as verificar_rol from "../utils/verificar_rol";

const esInspector = verificar_rol.comprobarSiEsInspector();

const BusquedaFiltroComponente = (
    {filtroVisible, setFiltroVisible, manejarSeleccionDeFiltro} :
    {filtroVisible: boolean, setFiltroVisible: any, manejarSeleccionDeFiltro: any}
) => {



    const [textoBusqueda, setTextoBusqueda] = useState('');
    const [categorias, setCategorias] = useState<string[]>([]);

    const manejarBusqueda = async () => {
        if(textoBusqueda.length > 0){
            try {
                const reclamo = await obtenerReclamo(textoBusqueda);
                if (reclamo) {
                    router.push(`reclamo/${textoBusqueda}`);
                    setTextoBusqueda('');
                } else {
                    Alert.alert('Reclamo no encontrado', 'No se encontró un reclamo con ese número, verifique que sea el correcto.');
                }
            } catch (error) {
                console.log(error);
                Alert.alert('Error desconocido', 'Error al buscar el reclamo.');
            }
        }
    };

    const cargarCategorias = async () => {
        try{   
            const respuesta = await obtenerCategorias(esInspector);
            const descripciones = respuesta.data.map((categoria: { id: string, descripcion: string }) => categoria.descripcion);
            setCategorias(['Quitar filtro', ...descripciones]);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        cargarCategorias();
    }, [esInspector]);

    
    return (
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', alignContent: 'space-between' }}>
            {/* Search bar */}
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: 'white', padding: 10, marginVertical: 10, marginTop: 15, borderRadius: 10, borderWidth: 1, borderColor: '#747375', width: '88%' }}>
                <AntDesign name="search1" size={20} color="black" />
                <TextInput
                    placeholder='Busque un reclamo...'
                    style={{ fontFamily: 'outfit' }}
                    keyboardType='numeric'
                    returnKeyType='search'
                    clearButtonMode='always'
                    value={textoBusqueda}
                    onChangeText={setTextoBusqueda}
                    onSubmitEditing={manejarBusqueda} />
            </View>
            <TouchableOpacity onPress={() => setFiltroVisible(true)}>
                <AntDesign name="filter" size={25} color="black" />
            </TouchableOpacity>

            {/* Filter modal */}
            <Modal
                transparent={true}
                visible={filtroVisible}
                onRequestClose={() => setFiltroVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: 300, backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Seleccionar Categoría</Text>
                        <FlatList
                            data={categorias}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => manejarSeleccionDeFiltro(item)}>
                                    <Text style={{ padding: 10, fontSize: 16, borderBottomWidth: 0.5, borderColor: '#333' }}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item} />
                        <TouchableOpacity onPress={() => setFiltroVisible(false)}>
                            <Text style={{ textAlign: 'center', color: 'red', marginTop: 10 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
        );
    }

export default BusquedaFiltroComponente;