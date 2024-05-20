import React, {useEffect} from 'react';
import {View, Text} from "react-native";

function HeaderComponent(props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {
    useEffect(() => {
        console.log(props)
    }, []);
    return (
        <View style={{flexDirection: 'row'}}>
            <View>
                <Text style={{ alignSelf: 'stretch', width: 280}}>Mi municipio</Text>
            </View>
            <View>
                <Text>Ingresar</Text>
            </View>
        </View>
    );
}

export default HeaderComponent;
