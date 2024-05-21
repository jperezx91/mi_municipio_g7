import React from 'react';
import {Dimensions, StyleSheet} from "react-native";

const offsetX = -33 // hardcodeado, parece dar un bug el contenedor del header. No permite poner el width en 100%
const StyleHeaderComponent = StyleSheet.create({
    headerViewContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width + offsetX,

    },
    headerViewItem:
    {
        flex: 0,
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',

        minWidth: 120,
        gap: 7

    }
})

const StylePublicacionItem = StyleSheet.create({
    boxContainer: {
        width: 20,
        height: 20
    }
})
export { StyleHeaderComponent, StylePublicacionItem };
