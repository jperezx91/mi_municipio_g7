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
            numero: '445566',
            categoria: 'Parques',
            estado: 'En revisión'

        },
        {
            id: "2",
            numero: '449966',
            categoria: 'Iluminación',
            estado: 'Unificado'
        },
        {
            id: "3",
            numero: '445677',
            categoria: 'Parques',
            estado: 'Cerrado'
        },
        {
            id: "4",
            numero: '447896',
            categoria: 'Parques',
            estado: 'Unificado'
        },

        {
            id: "5",
            numero: '446677',
            categoria: 'Escuelas',
            estado: 'En revisión'
        }

    ]
    const renderItemPublicaion = ({item}) => (
        <ReclamoComponente numero={item.numero} categoria={item.categoria} estado={item.estado} goToPublicacion={() => {
            const idItem : string = item.id
            router.push(`reclamo/${idItem}`)
        }} />
    )

    return (
        <SafeAreaView style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
        <View style={{backgroundColor: '#F2F4F8', height: Dimensions.get('window').height * 0.80}}>
            
            {/* Botón Mis reclamos */}
            <Pressable style={{padding:20}} onPress={()=> {router.push("misReclamos")}}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontFamily:'outfit', fontSize:18}}>Mis reclamos</Text>
                    <Entypo name="chevron-thin-right" size={20} color="black" />
                </View>
            </Pressable>
            
            <View style={{
                                display:'flex',
                                flexDirection:'row',
                                gap:10,
                                alignItems:'center',
                                alignContent:'space-between', paddingLeft:20, paddingRight:20
            }}>
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
                borderColor:'#747375',
                width:'88%'
            }}>
                <AntDesign name="search1" size={20} color="black" />
                <TextInput 
                    placeholder='Busque un reclamo...' 
                    style={{fontFamily:'outfit'}} 
                    clearButtonMode='always'
                >                    
                </TextInput>
            </View>
            <AntDesign name="filter" size={25} color="black"/>
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
