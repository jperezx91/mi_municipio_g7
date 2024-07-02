import {View, Text, SafeAreaView, Pressable, Dimensions, FlatList} from 'react-native';
import {PrincipalStyle} from "@/app/styles";
import {router} from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import StyleHome from "@/app/(tabs)/(home)/styles";
import {useEffect, useState} from 'react';
import DenunciaComponente from "@/app/components/denunciaComponente";
import {obtenerDenuncias} from "@/app/networking/api";
import FormButton from "@/app/components/FormButton";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";




export default function DenunciasPrincipal() {

    const [showRealizadas, setShowRealizadas] = useState(true);
    const [denuncias, setDenuncias] = useState([])

    const cargarDenunciasApi = () =>
    {
        obtenerDenuncias()
            .then((respuesta) => {
                const denuncinasR = respuesta.data.denuncias
                setDenuncias(denuncinasR)
            })
            .catch((e)=>
            {
                console.log(e)
            })
    }
    const cargarDenunciasLocal = async () =>
    {
        const denuncias_local_str = await asyncStorage.getItem("denuncias_datos")
        if(denuncias_local_str != null)
        {
            const denuncias_local = JSON.parse(denuncias_local_str)
            const cantidad = denuncias_local.length
            const denuncias_locales = generarDenuncias(cantidad)
            // @ts-ignore
            setDenuncias(denuncias_locales)
        }

    }
    const generarDenuncias = (cantidad: number) =>
    {
        const local_denuncias = []
        for(let i = 1; i <= cantidad; i++)
        {
            local_denuncias.push(
                {
                    "estado": "Pendiente",
                    "idDenuncia": i,
                }
            )
        }
        return local_denuncias
    }
    useEffect(() => {
        cargarDenunciasApi()
    }, []);
    interface itemType
    {
        idDenuncia: number
        estado: string
    }

    // @ts-ignore
    const renderItemDenuncia = ({item}) => (
        <DenunciaComponente numero_denuncia={item.idDenuncia || 0} estado={item.estado} goToDenuncia={() => {
            const idItem : string = item.idDenuncia

            if(item.estado == "Pendiente")
                router.push(`denuncia/${idItem}?local=true`)
            else
                router.push(`denuncia/${idItem}?local=false`)


        }} />
    )

    const TabItemComponent = ({title="", status=false, onPress=() => {}}) => {

        const styleLine = status ? 2 : 0
        return (
            <Pressable onPress={onPress} style={{borderBottomWidth: styleLine, borderBottomColor: "#001D6C", paddingVertical: 10, paddingHorizontal: 25}}>
                <Text style={{color: "#001D6C", fontWeight: 'bold', textAlign: 'center'}}>
                    {title}
                </Text>
            </Pressable>
        )
    }

    return (
        <SafeAreaView style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
            <View style={{marginTop: 15, padding: 20, paddingTop: 0, backgroundColor: '#F2F4F8', height: Dimensions.get('window').height * 0.80}}>

                {/* Botón Mis reclamos */}
                <Pressable style={{paddingTop: 14, paddingBottom:14}} onPress={()=> {router.push("denuncias_recibidas")}}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontFamily:'outfit', fontSize:18}}>Denuncias recibidas</Text>
                        <Entypo name="chevron-thin-right" size={20} color="black" />
                    </View>
                </Pressable>
                { /* Pestañas para vista de denuncias */}
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TabItemComponent onPress={() => {
                        console.log("realizadas")
                        setShowRealizadas(true)
                        cargarDenunciasApi()
                    }} title={"Realizadas"} status={showRealizadas} />
                    <TabItemComponent onPress={() => {
                        console.log("pendientes")
                        cargarDenunciasLocal()
                        setShowRealizadas(false)
                    }} title={"Pendientes"} status={!showRealizadas} />
                </View>


                {/* lista reclamos */}
                <FlatList
                    refreshing={false}
                    onRefresh={() => {
                        if(showRealizadas)
                            cargarDenunciasApi()
                        else
                            cargarDenunciasLocal()
                    }}
                    ListFooterComponent={<View style={{width:Dimensions.get('window').width}}></View>}
                    style={StyleHome.flatListContainer}
                    data={denuncias}
                    renderItem={renderItemDenuncia}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.idDenuncia}
                    ListEmptyComponent={<View style={{marginTop: 10}}>
                        <Text style={{fontSize: 24, fontFamily: 'outfit', fontWeight: 'bold', textAlign: 'center'}}>Sin denuncias</Text>
                    </View>}
                >
                </FlatList>
                <FormButton action={() => router.push("nueva_denuncia?new=true")} title={'Cargar denuncia'} />
            </View>
        </SafeAreaView>
    );
}
