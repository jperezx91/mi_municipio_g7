import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, Linking, Dimensions, ImageSourcePropType, ScrollView} from "react-native";
import {router, useGlobalSearchParams} from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {PrincipalStyle} from "@/app/styles";
import {obtenerPublicacion} from '@/app/networking/api';

const Id = () => {
    const irAtras = () =>
    {
        router.back();
    };
    const { id }  = useGlobalSearchParams();
    const index: string = id ? "" + id : "0"
    
    const [publicacion, setPublicacion] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerPublicacion(index)
            .then((respuesta) => {
                setPublicacion(respuesta.data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
    }, [index]);

    if (loading) {
        return
            <View style={[PrincipalStyle.principalContainer, {display: 'flex', alignContent: 'center'}]}>
                <Text style={{fontFamily:'outfit-bold', fontSize: 26, textAlign: 'center'}}>
                    Cargando publicación...
                </Text>
            </View>;
    }

    if (!publicacion) {
        return
        <View style={[PrincipalStyle.principalContainer, {display: 'flex', alignContent: 'center'}]}>
            <Text style={{fontFamily:'outfit-bold', fontSize: 26, textAlign: 'center'}}>
                Publicación no encontrada.
            </Text>;
        </View>
    }
    
    const actionBtns= [
        {
            btn:1,
            name:'Llamar',
            icon:"phone-alt",
            url:'tel:'+publicacion?.telefono
        },
        {
            btn:2,
            name:'Mapa',
            icon:"map-marked-alt",
            url:'tel:'+publicacion?.telefono
        },
        {
            btn:3,
            name:'Web',
            icon:"globe",
            url:'tel:'+publicacion?.telefono
        },
        {
            btn:4,
            name:'Compartir',
            icon:"share-alt",
            url:'tel:'+publicacion?.telefono
        }
    ]

    const OnPressHandle=(item: { btn?: number; name: any; icon?: any; url: any; })=>{
        if (item.name=='share'){
            return;
        }
        Linking.openURL(item.url);
    }

    const fotosPublicacion = publicacion.imagenes.map((img: string, index: number) => ({ sd: index, image: { uri: `data:image/jpeg;base64,${img}` } }));

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
                    <FlatList data={fotosPublicacion} horizontal renderItem={({item,index})=>(
                        <View key={index}>
                            <Image source={item.image} style={{height: 300, width:Dimensions.get('window').width}}/>
                        </View>
                    )}>

                    </FlatList>
                </View>

                {/* Datos del Comercio */}

                <View style={{padding:20, marginTop:-20, backgroundColor:'white', borderTopLeftRadius:25, borderTopRightRadius:25}}>
                    
                    <View>
                        <Text style={{fontFamily:'outfit-bold', fontSize: 26}}>{publicacion.comercio}</Text>
                    </View>
                    
                    <View style={{display: 'flex', flexDirection: 'row', padding: 3}}>
                        <Text style={{fontFamily:'outfit', textDecorationLine:'underline'}}>Rubro:</Text><Text> {publicacion.rubro}</Text>
                    </View>

                    { publicacion.direccion && (
                        <View style={{display: 'flex', flexDirection: 'row', padding: 3}}>
                        <Text style={{fontFamily:'outfit', textDecorationLine:'underline'}}>Dirección:</Text><Text> {publicacion.direccion}</Text>
                        </View>
                    )}
                    
                    <View style={{display: 'flex', flexDirection: 'row', padding: 3}}>
                        <Text style={{fontFamily:'outfit', textDecorationLine:'underline'}}>Horario:</Text><Text> {publicacion.horario}</Text>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', padding: 3}}>
                        <Text style={{fontFamily:'outfit', textDecorationLine:'underline'}}>Teléfono:</Text><Text> {publicacion.telefono}</Text>
                    </View>

                </View>

                {/* Botones de Contacto */}
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

                { /* Cuerpo de la publicación */ }
                <View style={{backgroundColor:'white', padding:20, height:'100%'}}>
                    <Text style={{fontFamily:'outfit-bold', fontSize:20, textAlign:'center', marginTop: 5, marginBottom: 10}}>{publicacion.titulo}</Text>
                    <Text style={{fontFamily:'outfit', lineHeight:25, minHeight:200}}>{publicacion.descripcion}</Text>
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
