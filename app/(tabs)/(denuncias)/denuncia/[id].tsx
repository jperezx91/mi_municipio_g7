import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, Linking, Dimensions, ImageSourcePropType, ScrollView} from "react-native";
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
            <FlatList style={{backgroundColor: '#fff'}} showsVerticalScrollIndicator={false} ListHeaderComponent={
                <View>
                    <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', fontFamily: 'outfit'}}>Denuncia #{index}</Text>
                    <View>
                        <Text style={{marginTop: 20, fontFamily:'outfit', fontSize:17}}>Descripción:</Text>
                        <Text style={{
                            padding:10,
                            borderWidth:1,
                            borderRadius:5,
                            backgroundColor:'white',
                            borderColor:'gray',
                            fontFamily:'outfit',
                            fontSize:14,
                            marginTop:5
                        }}>{denuncia["descripcion"]}</Text>
                    </View>
                    <View>
                        <Text style={{marginTop: 20, fontFamily:'outfit', fontSize:17}}>Ubicación:</Text>
                        <View style={{
                            padding:10,
                            borderWidth:1,
                            borderRadius:5,
                            backgroundColor:'white',
                            borderColor:'gray',
                            marginTop:5,
                            display: 'flex',
                            flexDirection:'row',
                            justifyContent: 'space-between'
                        }}><Text style={{fontFamily:'outfit', fontSize: 14}}>{denuncia["direccion"]}</Text><AntDesign size={24} name={"enviromento"} /></View>
                    </View>
                    {/* lista de imágenes */}

                    <View>
                        <Text style={{marginTop: 20, fontFamily:'outfit', fontSize:17}}>Archivos adjuntos:</Text>
                        <FlatList showsHorizontalScrollIndicator={false}  data={fotosDenuncia} horizontal renderItem={({item,index})=>(
                            <View key={index} style={{padding: 10}}>
                                <Image
                                    source={item.image}
                                    style={{
                                        height: 100,
                                        width: 100,
                                    }}
                                />
                            </View>
                        )} />
                    </View>

                    <View>
                        <Text style={{marginTop: 20, fontFamily:'outfit', fontSize:17}}>Estado:</Text>
                        <Text style={{
                            padding:10,
                            borderWidth:1,
                            borderRadius:5,
                            backgroundColor:'white',
                            borderColor:'gray',
                            fontFamily:'outfit',
                            fontSize:14,
                            marginTop:5
                        }}>{denuncia["estado"]}</Text>
                    </View>
                </View>
            }>
            </FlatList>

        </SafeAreaView>
    );
};

export default Id;



