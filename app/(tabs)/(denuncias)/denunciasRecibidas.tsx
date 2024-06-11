import ReclamoComponente from "@/app/components/reclamoComponente";
import { PrincipalStyle } from "@/app/styles";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView, View, Dimensions, Pressable, TextInput, FlatList } from "react-native";
import StyleHome from "../(home)/styles";

export default function denunciasRecibidas() {
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
            router.push(`denuncia/${idItem}`)
        }} />
    )

    return (
        <SafeAreaView style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
  
        <FlatList
      ListFooterComponent={<View style={{width:Dimensions.get('window').width}}></View>}
      style={StyleHome.flatListContainer}
      data={mockup_data_publicacion}
      renderItem={renderItemPublicaion}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      >
  </FlatList>
</SafeAreaView>
    );
}