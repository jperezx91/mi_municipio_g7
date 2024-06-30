import {Image, View, Text, Pressable} from "react-native";
import {router} from "expo-router";

const DenunciaComponente = ({ numero_denuncia="1", estado, goToDenuncia }: { numero_denuncia: string; estado: string, goToDenuncia: any}) => {
    return (
        <Pressable onPress={goToDenuncia} style={{ margin: 4, borderWidth: 1, borderColor: '#DDE1E6', marginTop: 8, backgroundColor: 'white', borderRadius:25}}>
            <View style={{display: 'flex',  padding:15, maxHeight:120}}>
                <Text style={{textAlign: 'left', fontSize: 18, fontFamily:'outfit-bold', alignSelf: 'auto', marginTop: 8, color: estado == "Pendiente" ? '#ff3333' : '#000000'}}>Denuncia #{numero_denuncia}</Text>
                {/*Aca hay que agregar para que no desborde la descripcion */}
                <Text style={{textAlign: 'left', alignSelf:'auto',  fontFamily:'outfit', paddingTop:5}}>Estado: {estado}</Text>
            </View>
        </Pressable>
    );
};

export default DenunciaComponente;
