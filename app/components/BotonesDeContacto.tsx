import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList, Linking, TouchableOpacity, View, Text } from "react-native";

interface Data{
    telefono: string,
    direccion: string,
    web: string,
}

const BotonesDeContacto = ({data}:{data:Data}) => {
    
    const actionBtns= [
        {
            btn:1,
            name:'Llamar',
            icon:"phone-alt",
            url:'tel:'+data?.telefono
        },
        {
            btn:2,
            name:'Mapa',
            icon:"map-marked-alt",
            url:'tel:'+data?.telefono
        },
        {
            btn:3,
            name:'Web',
            icon:"globe",
            url:'tel:'+data?.telefono
        },
        {
            btn:4,
            name:'Compartir',
            icon:"share-alt",
            url:'tel:'+data?.telefono
        }
    ]

    const OnPressHandle=(item: { btn?: number; name: any; icon?: any; url: any; })=>{
        if (item.name=='share'){
            return;
        }
        Linking.openURL(item.url);
    }

    return (
    <View style={{backgroundColor:'white', padding:20}}>
        <FlatList data={actionBtns} numColumns={4} columnWrapperStyle={{justifyContent:'space-between'}} renderItem={({item,index})=>(
            <TouchableOpacity key={index} onPress={() => OnPressHandle(item)} style={{ display: 'flex', alignSelf: 'center', alignItems: 'center' }}>
            <View>
                <View style={{ padding: 10, borderWidth: 2, borderColor: '#50a1c5', borderRadius: 50 }}>
                    <FontAwesome5 name={item.icon} size={30} color='#50a1c5' />
                </View>
                <Text style={{ fontFamily: 'outfit-bold', textAlign: 'center', marginTop: 5, color: '#50a1c5' }}>
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
            )} />
    </View>
    );
}

export default BotonesDeContacto;