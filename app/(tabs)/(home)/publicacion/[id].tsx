import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, Linking, Dimensions, ImageSourcePropType, ScrollView} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {PrincipalStyle} from "@/app/styles";
import {obtenerPublicacion, obtenerThumbnail, obtenerImagenPublicacion} from '@/app/networking/api';

const Id = () => {
    const irAtras = () =>
    {
        router.back();
    };
    const { id }  = useLocalSearchParams();
    const index: string = id ? "" + id : "0"

    // Código para hacer la solicitud al backend, reemplaza los datos de mockup
    interface Publicacion {
        id: string;
        titulo: string;
        descripcion: string;
        thumbnail: string;
        imagenes: string[];
    }

    const [publicacion, setPublicacion] = useState<any>(null);

    const cargarPublicacion = async (idPublicacion: string) => {
        try {
            const respuestaPublicacion = await obtenerPublicacion(idPublicacion);
            const nuevaPublicacion: Publicacion = {
                ...respuestaPublicacion.data,
                thumbnail: '',
                imagenes: []
            };
            const thumbnailRespuesta = await obtenerThumbnail(idPublicacion);
            nuevaPublicacion.thumbnail = thumbnailRespuesta.data;

            let idImagen = 1;
            let terminado = false;

            while(!terminado){
                try {
                    const imagenRespuesta = await obtenerImagenPublicacion(idPublicacion, String(idImagen));
                    nuevaPublicacion.imagenes.push(imagenRespuesta.data);
                    idImagen++;
                } catch(e: any){
                    terminado = e.response && e.response.status === 404;
                    console.log(e);
                }
            }

            setPublicacion(nuevaPublicacion);

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        cargarPublicacion(index);
    }, [index]);

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
            <FlatList style={{backgroundColor: '#fff'}} showsVerticalScrollIndicator={false} ListHeaderComponent={<View>
                { /* Carrousel*/}

                {/*<Carousel
                data={mockupImages2}
                renderItem={_renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
            >

            </Carousel>*/}
                <View>
                    <Image
                        source={{uri:`data:image/jpeg;base64,${publicacion.thumbnail}`}}
                        style={{
                            width: '100%',
                            height: 350,
                            resizeMode: 'cover'
                            }}
                        />
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
                <View style={{backgroundColor:'white', padding:20}}>
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
                <View style={{
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    backgroundColor: 'white',
                    zIndex: 1
                }}>
                    <View style={{
                        padding: 20,
                        margin: 20,
                        borderWidth: 2,
                        borderColor: '#4891c7',
                        borderRadius: 15
                    }}>
                        <Text style={{fontFamily:'outfit-bold', fontSize:20, textAlign:'center', marginTop: 5, marginBottom: 10}}>{publicacion.titulo}</Text>
                        <Text style={{fontFamily:'outfit', lineHeight:25}}>{publicacion.descripcion}</Text>
                        { /* Galería de fotos */ }
                <View style={{marginTop: 25}}>
                    <FlatList data={fotosPublicacion} horizontal renderItem={({item,index})=>(
                        <View key={index}>
                            <Image
                                source={item.image}
                                style={{
                                    height: 250,
                                    width: 250,
                                    marginRight: 10,
                                    borderBottomLeftRadius: 25,
                                    borderBottomRightRadius: 25
                                    }}
                                />
                        </View>
                    )}>
                    </FlatList>
                </View>
                    </View>
                </View>


            </View>}  data={[]} renderItem={()=> (<></>)} >
            </FlatList>

        </SafeAreaView>
    );
};

export default Id;



