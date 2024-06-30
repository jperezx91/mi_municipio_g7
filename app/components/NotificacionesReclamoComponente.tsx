import {Image, View, Text, Pressable} from "react-native";
import {router} from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';


const NotificacionesReclamoComponente = ({ numero_movimientoReclamo="1", causa, goToMovimientoReclamo }: { numero_movimientoReclamo: string; causa: string, goToMovimientoReclamo: any}) => {
    return (
        <Pressable onPress={goToMovimientoReclamo} style={{ margin: 4, borderWidth: 1, borderColor: '#DDE1E6', marginTop: 8, backgroundColor: 'white', borderRadius:25}}>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

            <View style={{display: 'flex',  padding:15, maxHeight:120}}>
                <Text style={{textAlign: 'left', fontSize: 18, fontFamily:'outfit-bold', alignSelf: 'auto', marginTop: 8}}>Reclamo #{numero_movimientoReclamo}</Text>
                {/*Aca hay que agregar para que no desborde la descripcion */}
                <Text style={{textAlign: 'left', alignSelf:'auto',  fontFamily:'outfit', paddingTop:5}}>Tu reclamo ha sido {causa}</Text>
            </View>
            <Entypo name="chevron-thin-right" size={20} color="black" /></View>
        </Pressable>
    );
};

export default NotificacionesReclamoComponente;