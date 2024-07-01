import React, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, Linking, Dimensions, ImageSourcePropType, ScrollView, ViewBase, Pressable} from "react-native";
import {router, useGlobalSearchParams, useLocalSearchParams} from "expo-router";
import { ExpoRoot } from 'expo-router';
import {PrincipalStyle} from "@/app/styles";
import {string} from "prop-types";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import StyleHome from "@/app/(tabs)/(home)/styles";
import { Entypo } from '@expo/vector-icons';
import { obtenerReclamo, obtenerImagenReclamo } from '@/app/networking/api';

const Id = () => {

    const irAtras = () =>
    {
        router.back()
    };
    const { id }  = useLocalSearchParams();
    const index: string = id ? "" + id : "0";

    // Código para hacer la solicitud al backend, reemplaza los datos de mockup
    interface Reclamo {
        numero_reclamo: string;
        desc: string;
        ubicacion: string;
        estado: string;
        imagenes: string[];
    }

    const [reclamo, setReclamo] = useState<any>(null);

    const cargarReclamo = async (idReclamo: string) => {
        try {
            const respuestaReclamo = await obtenerReclamo(idReclamo);
            const nuevoReclamo: Reclamo = {
                ...respuestaReclamo.data,
                imagenes: []
            };
            
            let idImagen = 1;
            let terminado = false;

            while(!terminado){
                try {
                    const imagenRespuesta = await obtenerImagenReclamo(idReclamo, String(idImagen));
                    nuevoReclamo.imagenes.push(imagenRespuesta.data);
                    idImagen++;
                } catch(e: any){
                    terminado = e.response && e.response.status === 404;
                    console.log(e);
                }
            }

            setReclamo(nuevoReclamo);

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        cargarReclamo(index);
    }, [index]);

    if (!reclamo) {
        return
        <View style={[PrincipalStyle.principalContainer, {display: 'flex', alignContent: 'center'}]}>
            <Text style={{fontFamily:'outfit-bold', fontSize: 26, textAlign: 'center'}}>
                Reclamo no encontrado.
            </Text>;
        </View>
    }

    const fotosReclamo = reclamo.imagenes.map((img: string, index: number) => ({ sd: index, image: { uri: `data:image/jpeg;base64,${img}` } }));

    return (
        <SafeAreaView style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
            {/*Por alguna razon no funciona esto para scrollear */}
            <FlatList showsVerticalScrollIndicator={false} ListHeaderComponent={
                <View style={{
                    marginTop: 15,
                    padding: 20,
                    paddingTop: 0,
                    backgroundColor: '#F2F4F8',
                    height: Dimensions.get('window').height * 0.80
                }}>
                    <Text style={{
                        fontSize: 22,
                        fontFamily:'outfit-bold',
                        textAlign: 'center',
                        marginTop: 10
                        }}
                    >
                        Reclamo #{reclamo.numero_reclamo}
                    </Text>

                    { /* Caja de datos de perfil */}
                    <View style={{marginTop: 10}}>
                        <View>
                            <Text style={{marginTop: 20, fontFamily:'outfit', fontSize:17}}>Categoria:</Text>
                            <Text style={{
                                padding:10,
                                borderWidth:1,
                                borderRadius:5,
                                backgroundColor:'white',
                                borderColor:'gray',
                                fontFamily:'outfit',
                                fontSize:14,
                                marginTop:5
                                }}>{reclamo.categoria}</Text>
                        </View>
                        <View>
                            <Text style={{marginTop: 20, fontFamily:'outfit', fontSize:17}}>Descripcion del desperfecto:</Text>
                            <Text style={{
                                padding:10,
                                borderWidth:1,
                                borderRadius:5,
                                backgroundColor:'white',
                                borderColor:'gray',
                                fontFamily:'outfit',
                                fontSize:14,
                                marginTop:5
                                }}>{reclamo.desc}</Text>
                        </View>
                        <View>
                            <Text style={{marginTop: 20, fontFamily:'outfit', fontSize:17}}>Ubicacion del reclamo:</Text>
                            <Text style={{
                                padding:10,
                                borderWidth:1,
                                borderRadius:5,
                                backgroundColor:'white',
                                borderColor:'gray',
                                fontFamily:'outfit',
                                fontSize:14,
                                marginTop:5
                                }}>{reclamo.ubicacion}</Text>
                        </View>
                        {fotosReclamo.length != 0 && (
                            <View>
                                <Text style={{marginTop: 20, fontFamily:'outfit', fontSize:17}}>Imagenes del reclamo:</Text>

                                <FlatList showsHorizontalScrollIndicator={true}  data={fotosReclamo} horizontal renderItem={({item,index})=>(
                                    <View key={index} style={{paddingVertical: 10}}>
                                        <Image
                                            source={item.image}
                                            style={{
                                                height: 100,
                                                width: 100,
                                                marginRight: 10
                                            }}
                                        />
                                    </View>
                                )} />
                            </View>
                        )}
                        <View>
                            <Text style={{marginTop: 10, fontFamily:'outfit', fontSize:17}}>Estado del reclamo:</Text>
                            <Text style={{
                                padding:10,
                                borderWidth:1,
                                borderRadius:5,
                                backgroundColor:'white',
                                borderColor:'gray',
                                fontFamily:'outfit',
                                fontSize:14,
                                marginTop:5
                                }}>{reclamo.estado}</Text>
                            <Pressable style={{paddingVertical: 15}} onPress={()=> {router.push(`reclamo/${reclamo.numero_reclamo}/seguimiento`)}}>
                                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text style={{fontFamily:'outfit', fontSize:15, paddingLeft:5}}>Ver historial de movimientos</Text>
                                    <Entypo name="chevron-thin-right" size={15} color="black"/>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
        }  data={[]} renderItem={()=> (<></>)} >
            </FlatList>
        </SafeAreaView>
        );
};

export default Id;

