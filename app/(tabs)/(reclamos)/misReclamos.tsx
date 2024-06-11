import * as React from 'react';
import { Dimensions, FlatList, SafeAreaView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ReclamoComponente from "@/app/components/reclamoComponente";
import {router, useFocusEffect} from "expo-router";
import StyleHome from '../(home)/styles';
import { PrincipalStyle } from '@/app/styles';
import FormButton from "@/app/components/FormButton";


const mockup_data_publicacion =
[
    {
        id: "1",
        numero: '445566',
        categoria: 'Parques',
        estado: 'En revisión'

    },
    {
        id: "2",
        numero: '449966',
        categoria: 'Iluminación',
        estado: 'Unificado'
    },
    {
        id: "3",
        numero: '445677',
        categoria: 'Parques',
        estado: 'Cerrado'
    },
    {
        id: "4",
        numero: '447896',
        categoria: 'Parques',
        estado: 'Unificado'
    },

    {
        id: "5",
        numero: '446677',
        categoria: 'Escuelas',
        estado: 'En revisión'
    },

    {
        id: "5",
        numero: '446677',
        categoria: 'Escuelas',
        estado: 'En revisión'
    },

    {
        id: "5",
        numero: '446677',
        categoria: 'Escuelas',
        estado: 'En revisión'
    },

    {
        id: "5",
        numero: '446677',
        categoria: 'Escuelas',
        estado: 'En revisión'
    },

    {
        id: "5",
        numero: '446677',
        categoria: 'Escuelas',
        estado: 'En revisión'
    }

]
const renderItemPublicaion = ({item}) => (
    <ReclamoComponente numero={item.numero} categoria={item.categoria} estado={item.estado} goToPublicacion={() => {
        const idItem : string = item.id
        router.push(`reclamo/${idItem}`)
    }} />
)

function RealizadosScreen() {
  return (
    <View>

                      <FlatList
                    ListFooterComponent={<View style={{width:Dimensions.get('window').width}}></View>}
                    style={StyleHome.flatListContainer}
                    data={mockup_data_publicacion}
                    renderItem={renderItemPublicaion}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    >
                </FlatList>
    </View>
  );
}

function PendientesScreen() {
  return (
    <SafeAreaView style={{width: '93%', margin: 'auto', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#F2F4F8" }}>
      <Text style={{fontFamily:'outfit', fontSize:20}}>No tenes reclamos pendientes</Text>
    </SafeAreaView>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Realizados"
      screenOptions={{
        tabBarActiveTintColor: '#0d3f6e',
        tabBarLabelStyle: { fontFamily:'outfit' ,fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="Realizados"
        component={RealizadosScreen}
        options={{ tabBarLabel: 'Realizados' }}
      />
      <Tab.Screen
        name="Pendientes"
        component={PendientesScreen}
        options={{ tabBarLabel: 'Pendientes' }}
      />
    </Tab.Navigator>
  );
}
export default function misReclamos() {
  return (
    <SafeAreaView style={[PrincipalStyle.principalContainer, {backgroundColor: "#F2F4F8"}]}>
      <MyTabs />
      <View style={{  display: 'flex', justifyContent: 'center', backgroundColor: 'none', marginBottom: 25, position: 'absolute', bottom: 0, left: '5%', width: '90%' }}>{/* cambiar none por flex para ver el boton cargar publicacion */}
      <FormButton action={()=> {router.push("publicacion/nueva_publicacion")}} title={'Crear reclamo'} />
  </View></SafeAreaView>
  );
}