import {Image, View, Text, Pressable} from "react-native";
import {router} from "expo-router";

const ReclamoComponente = ({ numero, categoria, estado, goToPublicacion }: { numero: string; categoria: string, estado: string, goToPublicacion: any}) => {
    return (
        <Pressable onPress={goToPublicacion} style={{ margin: 4, borderWidth: 1, borderColor: '#DDE1E6', marginTop: 8, backgroundColor: 'white', borderRadius:25}}>
            <View style={{display: 'flex',  padding:15, maxHeight:120}}>
                <Text style={{textAlign:'left', alignSelf: 'auto', fontFamily:'outfit', paddingTop:5, color:'#0d3f6e'}}>{categoria}</Text>
                <Text style={{textAlign: 'left', fontSize: 18, fontFamily:'outfit-bold', alignSelf: 'auto', marginTop: 8}}>Reclamo #{numero}</Text>
                {/*Aca hay que agregar para que no desborde la descripcion */}
                <Text style={{textAlign: 'left', alignSelf:'auto',  fontFamily:'outfit', paddingTop:5}}>Estado: {estado}</Text>
            </View>
        </Pressable>
    );
};

export default ReclamoComponente;