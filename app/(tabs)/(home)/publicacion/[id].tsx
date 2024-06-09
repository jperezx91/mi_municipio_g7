import React from 'react';
import {View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, Linking, Dimensions, ImageSourcePropType, ScrollView} from "react-native";
import {router, useGlobalSearchParams} from "expo-router";
import { ExpoRoot } from 'expo-router';
import {PrincipalStyle} from "@/app/styles";
import {string} from "prop-types";
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
            title: 'Pizzería Los hornos',
            location: 'Av. Cabildo 4455',
            horario: 'Lunes a Viernes, de 18 a 01 hs',
            phone: '4412-34567',
            titulopromo:'¡Promo imperdible!',
            descpromo: 'Todos los martes 2x1 en cervezas artesanales.\nMira todas nuestras promos vigentes:\n2 pizzas grandes de mozzarella + 1 docena de empanas por $30000.\n2 docenas de empanas + 1 gaseosa de 1.5L por $18000. '
        },
        "2":
        {
            title: 'Escribanía Flores Hnos.',
            location: 'Av. Cabildo 4455',
            horario: 'Lunes a Viernes, de 18 a 00 hs',
            phone: '4412-34567',
            titulopromo:'Servicios de escribanía de la mejor calidad.',
            descpromo: 'Servicios de escribanía de la mejor calidad. No dude en consultarnos! Llame a nuestro numero de contacto.'
        },
        "3":
        {
            title: 'Ferretería Juanse',
            location: 'Av. Cabildo 4455',
            horario: 'Lunes a Viernes, de 18 a 00 hs',
            phone: '4412-34567',
            titulopromo:'¡Esta semana 10% de descuento!',
            descpromo: 'Esta semana tenes 10% de descuento pagando en efectivo tus compras. Veni a nuestro local sobre la calle Cabildo al 4455'
        },
        "4":
        {
            title: 'Kary Nails',
            location: 'Av. Cabildo 4455',
            horario: 'Lunes a Viernes, de 18 a 00 hs',
            phone: '4412-34567',
            titulopromo:'No te pierdas esta promo!!',
            descpromo: 'Esta semana tenemos turnos disponibles.\nServicio de Kapping a solo $15000 !!\nManicura semi-permanente $6000'
        }
        ,
        "5":
        {
            title: 'Servicios de Plomería',
            location: 'Av. Cabildo 4455',
            horario: 'Lunes a Viernes, de 18 a 00 hs',
            phone: '4412-34567',
            titulopromo:'Arreglos en el día',
            descpromo: '30 años de experiencia! No dude en llamarnos ante cualquier inconveniente'
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
            name:'Llamar',
            icon:"phone-alt",
            url:'tel:'+mockUpData?.phone
        },
        {
            btn:2,
            name:'Mapa',
            icon:"map-marked-alt",
            url:'tel:'+mockUpData?.phone
        },
        {
            btn:3,
            name:'Web',
            icon:"globe",
            url:'tel:'+mockUpData?.phone
        },
        {
            btn:4,
            name:'Compartir',
            icon:"share-alt",
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
            <FlatList showsVerticalScrollIndicator={false} ListHeaderComponent={<View>
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
                        <Text style={{fontFamily:'outfit', textDecorationLine:'underline'}}>Dirección:</Text><Text> {mockUpData[index].location}</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', padding: 3}}>
                        <Text style={{fontFamily:'outfit', textDecorationLine:'underline'}}>Horario:</Text><Text> {mockUpData[index].horario}</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', padding: 3}}>
                        <Text style={{fontFamily:'outfit', textDecorationLine:'underline'}}>Teléfono:</Text><Text> {mockUpData[index].phone}</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'white', paddingLeft:20, paddingRight:20}}>
                    <FlatList data={actionBtns} numColumns={4} columnWrapperStyle={{justifyContent:'space-between'}} renderItem={({item,index})=>(
                        <TouchableOpacity key={index} onPress={()=>OnPressHandle(item)} style={{display: 'flex', alignSelf:'center', alignItems:'center'}}>
                            {/*<Image source={item.icon} style={{width:50, height:50}}/>*/}
                            <View style={{padding:10, borderWidth:2, borderColor:'#50a1c5', borderRadius:50}}>
                            <FontAwesome5 name={item.icon} size={30} color='#50a1c5'/></View>
                            <Text style={{fontFamily:'outfit-bold', textAlign:'center', marginTop:5, color:'#50a1c5'}}>
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
            </View>}  data={[]} renderItem={()=> (<></>)} >
            </FlatList>

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
