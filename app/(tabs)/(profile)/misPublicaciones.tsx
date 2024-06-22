import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, FlatList, TouchableOpacity} from "react-native";
import FormButton from "@/app/components/FormButton";
import {PrincipalStyle} from "@/app/styles";
import StyleHome from "@/app/(tabs)/(home)/styles";
import PublicacionComponente from '@/app/components/PublicacionComponente';
import { obtenerMisPublicaciones } from '@/app/networking/api';
import {router, useFocusEffect} from "expo-router";

function MisPublicaciones() {

    // Código para hacer la solicitud al backend, reemplaza los datos de mockup
    const [publicaciones, setPublicaciones] = useState([]);
    useEffect(() => {
        obtenerMisPublicaciones()
            .then((respuesta) =>
            {
                setPublicaciones(respuesta.data);
            })
            .catch((e) =>
            {
                console.log(e)
            })
    }, []);


    // @ts-ignore
    const renderItemPublicacion = ({item}) => (
        <PublicacionComponente title={item.titulo} desc={item.descripcion} imgUrl={item.imgBase64} goToPublicacion={() => {
            const idItem : string = item.id
            router.push(`publicacion/${idItem}`)
        }} />
    );

    return (
        <SafeAreaView style={PrincipalStyle.principalContainer}>
            <FlatList
                numColumns={1}
                ListFooterComponent={<View style={{height: 150}}></View>}
                style={StyleHome.flatListContainer}
                data={publicaciones}
                renderItem={renderItemPublicacion}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
            >
            </FlatList>
            <View style={{  display: 'flex', justifyContent: 'center', backgroundColor: 'none', marginBottom: 25, position: 'absolute', bottom: 0, left: '5%', width: '90%' }}>
                <FormButton action={()=> {router.push("publicacion/nueva_publicacion")}} title={'Cargar publicación'} />
            </View>
        </SafeAreaView>
    );
}

export default MisPublicaciones;