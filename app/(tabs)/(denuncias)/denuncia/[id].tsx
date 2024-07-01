import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, Linking, Dimensions, ImageSourcePropType, ScrollView, StyleSheet} from "react-native";
import {router, useGlobalSearchParams, useLocalSearchParams} from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {PrincipalStyle} from "@/app/styles";
import {
    obtenerPublicacion,
    obtenerThumbnail,
    obtenerImagen,
    obtenerDenuncia,
    obtenerImagenDenuncia
} from '@/app/networking/api';
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import StyleDenuncia from "@/app/(tabs)/(denuncias)/denuncia/styles";

const Id = () => {
    const irAtras = () =>
    {
        router.back();
    };
    const parametros = useLocalSearchParams()
    console.log(parametros)
    const index: string = parametros.id ? "" + parametros.id : "0"
    const [denuncia, setDenuncia] = useState({
        "descripcion": "...",
        "direccion" : "...",
        "estado": "....",
        "imagenes": []
    })
    const cargarDenuncia = async (idDenuncia: string) => {
        if(parametros.local == "false")
        {
            try{
                const respuestaDenuncia = await obtenerDenuncia(idDenuncia)
                const denunciaInfo = {
                    ...respuestaDenuncia.data,
                    "imagenes": []
                }
                let idImagen = 1;
                let terminado = false;
                while(!terminado)
                {
                    try{
                        const imgRespuesta = await obtenerImagenDenuncia(idDenuncia, String(idImagen))
                        denunciaInfo.imagenes.push(imgRespuesta.data)
                        idImagen++
                        console.log("corriendo !")
                    }catch(e: any)
                    {
                        terminado = e.response && e.response.status === 404;
                    }
                }
                setDenuncia(denunciaInfo)
            } catch(e) {
            }
        }else{
            const denuncias_local_str = await asyncStorage.getItem("denuncias_datos")
            if(denuncias_local_str != null)
            {
                const denuncias_local = JSON.parse(denuncias_local_str)
                if(parametros.id != undefined)
                {
                    // @ts-ignore
                    const denuncia_local = denuncias_local[parametros.id - 1]
                    const datos_local = {
                        "descripcion": denuncia_local.descripcion,
                        "direccion" : "Por determinar",
                        "estado": "Pendiente",
                        "imagenes": denuncia_local.imagenes,
                    }
                    setDenuncia(datos_local)
                }
            }

        }

    }
    useEffect(() => {
        cargarDenuncia(index)
    }, [index]);



    const OnPressHandle=(item: { btn?: number; name: any; icon?: any; url: any; })=>{
        if (item.name=='share'){
            return;
        }
        Linking.openURL(item.url);
    }

    const fotosDenuncia = denuncia.imagenes.map((img: string, index: number) => ({ sd: index, image: { uri: `data:image/jpeg;base64,${img}` } }));

    return (
        <SafeAreaView style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]} >
            {/* @ts-ignore} */}
            <FlatList showsVerticalScrollIndicator={false} ListHeaderComponent={
                <View style={{marginTop: 15, padding: 20, paddingTop: 0, backgroundColor: '#F2F4F8', height: Dimensions.get('window').height * 0.80}}>
                    <Text style={{fontSize: 22, fontFamily:'outfit-bold', textAlign: 'center', marginTop: 10}}>Denuncia #{index}</Text>
                    <View style={{marginTop: 10}}>
                    <View>
                        <Text style={StyleDenuncia.titulo}>Descripción:</Text>
                        <Text style={StyleDenuncia.campo}>{denuncia["descripcion"]}</Text>
                    </View>
                    <View>
                        <Text style={StyleDenuncia.titulo}>Ubicación:</Text>
                        <View style={{
                            padding:10,
                            borderWidth:1,
                            borderRadius:5,
                            backgroundColor:'white',
                            borderColor:'gray',
                            marginTop:5,
                            display: 'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{fontFamily:'outfit', fontSize: 14}}>{denuncia["direccion"]}</Text>
                            <AntDesign size={24} name={"enviromento"} />
                        </View>
                    </View>
                    {/* lista de imágenes */}

                    <View>
                        <Text style={StyleDenuncia.titulo}>Archivos adjuntos:</Text>
                        <FlatList data={fotosDenuncia} numColumns={3} style={{marginTop:10, }} renderItem={({item,index})=>(
                            <View key={index} style={{padding: 5}}>
                                <Image
                                    source={item.image}
                                    style={{
                                        height: 100,
                                        width: 100,
                                        borderWidth: 1,
                                        borderColor: 'black'
                                    }}
                                />
                            </View>
                        )} />
                    </View>

                    <View>
                        <Text style={StyleDenuncia.titulo}>Estado:</Text>
                        <Text style={StyleDenuncia.campo}>{denuncia["estado"]}</Text>
                    </View>
                </View></View>
            }>
            </FlatList>

        </SafeAreaView>
    );
};

export default Id;