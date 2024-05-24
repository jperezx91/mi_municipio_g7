import React from 'react';
import {View, Text, SafeAreaView, Image} from "react-native";
import {router, useGlobalSearchParams} from "expo-router";
import { ExpoRoot } from 'expo-router';
import {PrincipalStyle} from "@/app/styles";
import {string} from "prop-types";
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
            phone: '441234567',
        },
        "2":
        {
            title: 'Escribanía Flores Hnos',
            location: 'Calle 456',
            phone: '45555555'
        },
        "3":
        {
            title: 'Negocio A',
            location: 'Calle 555',
            phone: '44444444'
        },
        "4":
        {
            title: 'Negocio B',
            location: 'Calle 222',
            phone: '44222222'
        }
        ,
        "5":
        {
            title: 'Negocio C',
            location: 'Calle 1234',
            phone: '44123232'
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
    /*
    *  TODO: Implementar react-native-snap-carousel, un carrusel de imágenes. En lugar de una sola imagen para mostrar.
    *
    *  */
    return (
        <SafeAreaView style={PrincipalStyle.principalContainer}>
            <View style={{marginTop: 15}}>
                <Image style={{height: 300, width: '100%'}} source={require('../../../../assets/images/publicacion_place_holder.png')} />
            </View>
            { /* Datos seccion*/}
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
    );
};

export default Id;
