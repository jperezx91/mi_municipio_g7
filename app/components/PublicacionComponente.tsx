import {Image, View, Text, Pressable} from "react-native";
import {router} from "expo-router";

const PublicacionComponente = ({ title, desc, goToPublicacion }: { title: string; desc: string, goToPublicacion: any}) => {
    return (
        <Pressable onPress={goToPublicacion} style={{ margin: 4, borderWidth: 1, borderColor: '#DDE1E6', marginTop: 8, backgroundColor: 'white'}}>
            <Image style={{height: 190, width: 170}} source={require('../../assets/images/publicacion_place_holder.png')} />
            <View style={{display: 'flex', width: 145, margin: 'auto', height: 110}}>
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', width: 145, marginTop: 10}}>{title}</Text>
                <Text style={{textAlign: 'center', alignSelf: 'center', width: 145}}>{desc}</Text>
            </View>
        </Pressable>
    );
};

export default PublicacionComponente;
