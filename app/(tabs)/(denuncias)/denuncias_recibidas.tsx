import {View, Text, SafeAreaView, Pressable, Dimensions, Image, TextInput, FlatList} from 'react-native';
import {PrincipalStyle} from "@/app/styles";
import {router} from "expo-router";
import StyleHome from "@/app/(tabs)/(home)/styles";
import {useEffect, useState} from 'react';
import DenunciaComponente from "@/app/components/denunciaComponente";
import {obtenerDenunciasRecibidas} from "@/app/networking/api";




export default function DenunciasRecibidas() {
    const [denuncias, setDenuncias] = useState([])

    const cargarDenunciasApi = () =>
    {
        obtenerDenunciasRecibidas()
            .then((respuesta) => {
                const denuncinasR = respuesta.data.denuncias
                console.log(denuncinasR)
                setDenuncias(denuncinasR)
            })
            .catch((e)=>
            {
                console.log(e)
            })
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
                { /* Pestañas para vista de denuncias */}

                {/* lista reclamos */}
                <FlatList
                    refreshing={false}
                    onRefresh={() => {
                        cargarDenunciasApi()
                    }}
                    ListFooterComponent={<View style={{width:Dimensions.get('window').width}}></View>}
                    style={StyleHome.flatListContainer}
                    data={denuncias}
                    renderItem={renderItemDenuncia}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.idDenuncia}
                    ListEmptyComponent={
                    <View>
                        <Text style={{fontSize:24, fontFamily: 'outfit', textAlign: 'center'}}>No hay denuncias recibidas.</Text>
                    </View>
                    }
                >
                </FlatList>
            </View>
        </SafeAreaView>
    );
}
