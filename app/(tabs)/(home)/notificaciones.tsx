import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Dimensions, FlatList, Pressable, ActivityIndicator} from "react-native";
import {PrincipalStyle} from "@/app/styles";
import Entypo from "@expo/vector-icons/Entypo";
import {obtenerNotificaciones} from "@/app/networking/api";
import Ionicons from "@expo/vector-icons/Ionicons";

const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        obtenerNotificaciones()
            .then((r) =>
            {
                setNotificaciones(r.data.notificaciones)
                setLoading((false))
            })
            .catch((e)=>{
                console.log(e)
                setLoading(false)
            })
    }, []);
    //@ts-ignore
    const itemNotificacion = ({item}) =>
    {
        let iconoTag = "alert-circle"
        let iconoColor = '#FF0000'
        switch(item.tipo)
        {
            case "denuncia":
                iconoTag = "alert-circle"
                iconoColor = '#FF0000'
                break;
            case 'publicacion':
                iconoTag = 'newspaper-outline'
                iconoColor = '#000000'
                break
            case 'reclamo':
                iconoTag = "megaphone-outline"
                iconoColor = '#d24706'
                break

        }
        return(
        <View style={{ margin: 4, borderWidth: 1, borderColor: '#DDE1E6', marginTop: 8, backgroundColor: 'white', borderRadius:25}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
                <View><Ionicons name={iconoTag} size={34} color={iconoColor} /></View>
                <View style={{display: 'flex',  padding:15, maxHeight:120}}>
                    <Text style={{textAlign: 'left', fontSize: 18, fontFamily:'outfit-bold', alignSelf: 'auto', marginTop: 8}}>{item.titulo}</Text>
                    {/*Aca hay que agregar para que no desborde la descripcion */}
                    <Text style={{textAlign: 'left', alignSelf:'auto',  fontFamily:'outfit', paddingTop:5}}>{item.mensaje}</Text>
                </View>
            </View>
        </View>
        )
    }
    return (
        <SafeAreaView style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
            <View style={{backgroundColor: '#F2F4F8', height: Dimensions.get('window').height * 0.80}}>
                {!loading?<FlatList keyExtractor={item => item.idNotificacion}  data={notificaciones} renderItem={itemNotificacion} ListEmptyComponent=
                    {
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: 30, fontFamily: 'outfit', textAlign: 'center', fontWeight: 'bold'}}>No hay notificaciones</Text>
                        </View>
                    } />:<View style={{marginTop: 30}}><ActivityIndicator size={70} /></View>}

            </View>

        </SafeAreaView>
    );
};

export default Notificaciones;
