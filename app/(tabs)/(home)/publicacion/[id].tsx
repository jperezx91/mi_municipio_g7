import React from 'react';
import {View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, Linking, Dimensions, ImageSourcePropType, ScrollView} from "react-native";
import {router, useGlobalSearchParams} from "expo-router";
import { ExpoRoot } from 'expo-router';
import {PrincipalStyle} from "@/app/styles";
import {string} from "prop-types";
import Carousel from 'react-native-snap-carousel';
import SlideItem from './SlideItem';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



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
        <SafeAreaView>
            <ScrollView>
            { /* Carrousel*/}

            {/*<Carousel 
                data={mockupImages2} 
                renderItem={_renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
            >

            </Carousel>*/}
            <View style={{backgroundColor:'white'}}>
                <FlatList data={mockupImages} horizontal renderItem={({item,index})=>(
                    <View key={index}>
                        <Image source={item.image} style={{height: 300, width:Dimensions.get('window').width}}/>
                    </View>
                )}>

                </FlatList>
            </View>

            { /* Datos seccion*/}

            <View style={{padding:20, marginTop:-20, backgroundColor:'white', borderTopLeftRadius:25, borderTopRightRadius:25}}>
                <View>
                <Text style={{fontFamily:'outfit-bold', fontSize: 26}}>{mockUpData[index].title}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', padding: 3}}>
                    <Text style={{fontFamily:'outfit'}}>Dirección: </Text><Text>{mockUpData[index].location}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', padding: 3}}>
                    <Text style={{fontFamily:'outfit'}}>Horario: </Text><Text>{mockUpData[index].location}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', padding: 3}}>
                    <Text style={{fontFamily:'outfit'}}>Teléfono: </Text><Text>{mockUpData[index].phone}</Text>
                </View>
            </View>
            <View style={{backgroundColor:'white', paddingLeft:20, paddingRight:20}}>
                <FlatList data={actionBtns} numColumns={4} columnWrapperStyle={{justifyContent:'space-between'}} renderItem={({item,index})=>(
                    <TouchableOpacity key={index} onPress={()=>OnPressHandle(item)} style={{display: 'flex', alignSelf:'center'}}>
                        {/*<Image source={item.icon} style={{width:50, height:50}}/>*/}
                        <FontAwesome5 name={item.icon} size={50} color="black" />
                        <Text style={{fontFamily:'outfit', textAlign:'center', marginTop:3}}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}>

                </FlatList>
            </View>
            <View style={{backgroundColor:'white', padding:20, height:'100%'}}>
                <Text style={{fontFamily:'outfit-bold', fontSize:20, textAlign:'center'}}>{mockUpData[index].titulopromo}</Text>
                <Text style={{fontFamily:'outfit', lineHeight:25, minHeight:200}}>{mockUpData[index].descpromo}</Text>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Id;


/*
        <SafeAreaView style={PrincipalStyle.principalContainer}>
            <View style={{marginTop: 15}}>
                <Image style={{height: 300, width: '100%'}} source={require('../../../../assets/images/publicacion_place_holder.png')} />
            </View>
            { /* Datos seccion*//*}
            <View style={{paddingVertical: 5, gap: 4}}>
                <Text style={{fontSize: 26, fontWeight: 'bold'}}>{mockUpData[index].title}</Text>
                <View style={{display: 'flex', flexDirection: 'row', padding: 3}}>
                    <Text style={{fontWeight: 'bold'}}>Dirección: </Text><Text>{mockUpData[index].location}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', padding: 3}}>
                    <Text style={{fontWeight: 'bold'}}>Horario: </Text><Text>12 a 15 hs</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', padding: 3}}>
                    <Text style={{fontWeight: 'bold'}}>Teléfono: </Text><Text>{mockUpData[index].phone}</Text>
                </View>
            </View>
        </SafeAreaView>
*/