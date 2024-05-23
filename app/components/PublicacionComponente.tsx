import {Image, View, Text} from "react-native";

const PublicacionComponente = ({ title, desc }: { title: string; desc: string }) => {
    return (
        <View style={{ margin: 4, borderWidth: 1, borderColor: '#DDE1E6', marginTop: 8}}>
            <Image style={{height: 190, width: 170}} source={require('../../assets/images/publicacion_place_holder.png')} />
            <View style={{display: 'flex', width: 145, margin: 'auto', height: 110}}>
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', width: 145, marginTop: 10}}>{title}</Text>
                <Text style={{textAlign: 'center', alignSelf: 'center', width: 145}}>{desc}</Text>
            </View>
        </View>
    );
};

export default PublicacionComponente;
