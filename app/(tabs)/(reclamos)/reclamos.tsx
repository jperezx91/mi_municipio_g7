import {View, Text, SafeAreaView, Pressable, Dimensions, Image, TextInput, FlatList} from 'react-native';
import {PrincipalStyle} from "@/app/styles";
import {router, useFocusEffect} from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import StyleHome from "@/app/(tabs)/(home)/styles";
import ReclamoComponente from "@/app/components/reclamoComponente";
import { useState } from 'react';




export default function HomeScreen() {
    const mockup_data_publicacion =
    [
        {
            id: "1",
            title: 'Pizzería Los hornos',
            imgUrl: 'lxd',
            desc: '¡Promo imperdible!'

        },
        {
            id: "2",
            title: 'Escribanía Flores Hnos.',
            imgUrl: 'lxd',
            desc: 'Servicios de escribanía de la mejor calidad.'
        },
        {
            id: "3",
            title: 'Negocio A',
            imgUrl: 'lxd',
            desc: 'Esto es una descripcion A'
        },
        {
            id: "4",
            title: 'Negocio B',
            imgUrl: 'lxd',
            desc: 'Esto es una descripcion B'
        },

        {
            id: "5",
            title: 'Negocio C',
            imgUrl: 'lxd',
            desc: 'Esto es una descripcion C'
        }

    ]
    const renderItemPublicaion = ({item}) => (
        <ReclamoComponente title={item.title} desc={item.imgUrl} goToPublicacion={() => {
            const idItem : string = item.id
            router.push(`reclamo/${idItem}`)
        }} />
    )

    return (
        <SafeAreaView style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
        <View style={{marginTop: 15, padding: 20, paddingTop: 0, backgroundColor: '#F2F4F8', height: Dimensions.get('window').height * 0.80}}>
            
            {/* Botón Mis reclamos */}
            <Pressable style={{paddingTop: 14, paddingBottom:14}} onPress={()=> {router.push("misPublicaciones")}}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontFamily:'outfit', fontSize:18}}>Mis reclamos</Text>
                    <Entypo name="chevron-thin-right" size={20} color="black" />
                </View>
            </Pressable>
            
            {/* searchbar */}
            <View style={{
                display:'flex',
                flexDirection:'row',
                gap:10,
                alignItems:'center',
                backgroundColor:'white',
                padding:10,
                marginVertical:10,
                marginTop:15, 
                borderRadius:10,
                borderWidth:1,
                borderColor:'#747375'
            }}>
                <AntDesign name="search1" size={20} color="black" />
                <TextInput 
                    placeholder='Busque un reclamo...' 
                    style={{fontFamily:'outfit'}} 
                    clearButtonMode='always'
                >                    
                </TextInput>
            </View>

            {/* lista reclamos */}
                <FlatList
                    ListFooterComponent={<View style={{width:Dimensions.get('window').width}}></View>}
                    style={StyleHome.flatListContainer}
                    data={mockup_data_publicacion}
                    renderItem={renderItemPublicaion}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    >
                </FlatList>
        </View>
    </SafeAreaView>
    );
}
