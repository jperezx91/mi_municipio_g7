import React from 'react';
import {View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, Linking, Dimensions, ImageSourcePropType, ScrollView, ViewBase, Pressable} from "react-native";
import {router, useGlobalSearchParams} from "expo-router";
import { ExpoRoot } from 'expo-router';
import {PrincipalStyle} from "@/app/styles";
import {string} from "prop-types";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import StyleHome from "@/app/(tabs)/(home)/styles";
import { Entypo } from '@expo/vector-icons';



// Mockup data, esto se reemplaza por llamadas a la API
const mockUpData: Record<string, any> =
    {
        "0":
        {
            title: '---',
            location: '---',
            phone: '---',
            desc: "---"
        },
        "1":
        {
            title: 'Pizzeria los hornos',
            location: 'Calle 123',
            horario: 'Lunes a Viernes, de 18 a 00 hs',
            phone: '441234567',
            titulopromo:'Promo imperdible!',
            descpromo: 'Solo por hoy 2x1 en cerverzas. Solo por hoy 2x1 en cerverzas. Solo por hoy 2x1 en cerverzas. Solo por hoy 2x1 en cerverzas.'
        },
        "2":
        {
            title: 'Escribanía Flores Hnos',
            location: 'Calle 456',
            horario: 'Lunes a Viernes, de 18 a 00 hs',
            phone: '441234567',
            titulopromo:'Promo imperdible!',
            descpromo: 'Solo por hoy 2x1 en cerverzas.'
        },
        "3":
        {
            title: 'Negocio A',
            location: 'Calle 555',
            horario: 'Lunes a Viernes, de 18 a 00 hs',
            phone: '441234567',
            titulopromo:'Promo imperdible!',
            descpromo: 'Solo por hoy 2x1 en cerverzas.'
        },
        "4":
        {
            title: 'Negocio B',
            location: 'Calle 222',
            horario: 'Lunes a Viernes, de 18 a 00 hs',
            phone: '441234567',
            titulopromo:'Promo imperdible!',
            descpromo: 'Solo por hoy 2x1 en cerverzas.'
        }
        ,
        "5":
        {
            title: 'Negocio C',
            location: 'Calle 1234',
            horario: 'Lunes a Viernes, de 18 a 00 hs',
            phone: '441234567',
            titulopromo:'Promo imperdible!',
            descpromo: 'Solo por hoy 2x1 en cerverzas.'
        }
    }






const Id = () => {
    const irAtras = () =>
    {
        router.back()
    }
    const { id }  = useGlobalSearchParams()
    interface dicIndex
    {
        index: string
    }

    const index: string = id ? "" + id : "0"

    const actionBtns=[
        {
            btn:1,
            name:'Llama',
            icon:"user-circle",
            url:'tel:'+mockUpData?.phone
        },
        {
            btn:2,
            name:'Mapa',
            icon:"user-circle",
            url:'tel:'+mockUpData?.phone
        },
        {
            btn:3,
            name:'Web',
            icon:"user-circle",
            url:'tel:'+mockUpData?.phone
        },
        {
            btn:4,
            name:'Comparti',
            icon:"user-circle",
            url:'tel:'+mockUpData?.phone
        }
    ]
    const OnPressHandle=(item: { btn?: number; name: any; icon?: any; url: any; })=>{
        if (item.name=='share'){
            return;
        }
        Linking.openURL(item.url);
    }
    const mockupImages = [
        {sd:1, image:require('../../../../assets/images/porcion.jpg')},
        {sd:2, image:require('../../../../assets/images/horno.jpg')},
        {sd:3, image:require('../../../../assets/images/mediapizza.jpg')}

    ]

    const _renderItem = (item: { sd?: number; image?: any;}) => {
        return (
            <View>
                <Image style={{height: 300, width: '100%'}} source={item.image} />
            </View>
        );
    }

    /*
    *  TODO: Implementar react-native-snap-carousel, un carrusel de imágenes. En lugar de una sola imagen para mostrar.
    *
    *  */
    return (
                <SafeAreaView style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
                    {/*Por alguna razon no funciona esto para scrollear */}
                    <FlatList showsVerticalScrollIndicator={false} ListHeaderComponent={
                <View style={{marginTop: 15, padding: 20, paddingTop: 0, backgroundColor: '#F2F4F8', height: Dimensions.get('window').height * 0.80}}>
                    <Text style={{fontSize: 22, fontFamily:'outfit-bold', textAlign: 'center', marginTop: 10}}>Reclamo #{mockUpData[index].title}</Text>
                    
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
                           }}>{mockUpData[index].location}</Text>
                    </View>
                    <View>
                        <Text style={{marginTop: 20, fontFamily:'outfit', fontSize:17}}>Descripcion desperfecto:</Text>
                        <Text style={{
                            padding:10,
                            borderWidth:1,
                            borderRadius:5,
                            backgroundColor:'white',
                            borderColor:'gray',
                            fontFamily:'outfit',
                            fontSize:14,
                            marginTop:5
                           }}>{mockUpData[index].location}</Text>
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
                           }}>{mockUpData[index].location}</Text>
                    </View>
                    <View>
                    <Text style={{marginTop: 20, fontFamily:'outfit', fontSize:17}}>Imagenes del reclamo:</Text>

                    <FlatList 
                        data={mockupImages}    
                        numColumns={3}
                        style={{marginTop:10, }}
                        renderItem={({item,index})=>(
                        <View key={index} style={{padding:5}}>
                            <Image source={item.image} style={{height: 100, width:100}}/>
                        </View>
                    )}>
                    </FlatList>
                    </View>
                    <View>
                        <Text style={{marginTop: 20, fontFamily:'outfit', fontSize:17}}>Estadp del reclamo:</Text>
                        <Text style={{
                            padding:10,
                            borderWidth:1,
                            borderRadius:5,
                            backgroundColor:'white',
                            borderColor:'gray',
                            fontFamily:'outfit',
                            fontSize:14,
                            marginTop:5
                           }}>{mockUpData[index].location}</Text>
                        <Pressable style={{padding: 5}} onPress={()=> {router.push("reclamo/seguimiento")}}>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{fontFamily:'outfit', fontSize:15, paddingLeft:5}}>Ver seguimiento</Text>
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

