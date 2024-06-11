import {Platform, StatusBar, StyleSheet} from "react-native";
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const StyleHeaderComponent = StyleSheet.create({
    headerViewContainer: {
        paddingTop: statusBarHeight,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 64 + (statusBarHeight ? statusBarHeight - 3  : 0),
        backgroundColor: '#4891c7', // Añadido para que sea visible el fondo
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8',

    },
    headerViewItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
    },
    headerViewItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
    },
});

export { StyleHeaderComponent };
