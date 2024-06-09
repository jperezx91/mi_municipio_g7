import {Image, View, Text, Pressable, ImageSourcePropType} from "react-native";
import {router} from "expo-router";
import React from "react";

const PublicacionComponente = ({ title, desc, goToPublicacion, imgSource=require('../../assets/images/porcion.jpg') }: { title: string; desc: string, goToPublicacion: any, imgSource: ImageSourcePropType }) => {

    return (
        <Pressable onPress={goToPublicacion} style={{ margin: 4, borderWidth: 1, borderColor: '#DDE1E6', marginTop: 8, backgroundColor: 'white', borderRadius:25}}>
            <Image style={{height: 190, width: 175, borderTopLeftRadius:25, borderTopRightRadius:25}} source={imgSource} />
            <View style={{display: 'flex', width: 145, margin: 'auto', paddingBottom:15, maxHeight:120}}>
                <Text style={{textAlign: 'center', fontSize: 20, fontFamily:'outfit-bold', alignSelf: 'center', width: 145, marginTop: 10}}>{title}</Text>
                {/*Aca hay que agregar para que no desborde la descripcion */}
                <Text style={{textAlign: 'center', alignSelf: 'center', width: 145, fontFamily:'outfit', paddingTop:5}}>{desc}</Text>
            </View>
        </Pressable>
    );
};

export default PublicacionComponente;
