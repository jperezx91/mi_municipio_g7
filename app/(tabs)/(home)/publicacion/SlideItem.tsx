import React from 'react';
import {View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, Linking, Dimensions, ImageSourcePropType} from "react-native";
 

function SlideItem(item: { sd: number; image: any; }) {
    return (
        <View>
            <Image style={{height: 300, width: '100%'}} source={item.image} />
        </View>
    );
}

export default SlideItem;

/*const SlideItem = ({item}) => {

    return (
        <View>
            <Image style={{height: 300, width: '100%'}} source={item.image} />
        </View>
    );}*/