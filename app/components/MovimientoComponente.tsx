import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const MovimientoComponente = (
    {estado, sector, responsable, fecha, causa, ultimoMovimiento} :
    { estado: string, sector: string, responsable: string, fecha: string, causa: string, ultimoMovimiento: boolean}
) => (
  <View>
    <View style={estilos.tarjeta}>
      <Text style={estilos.titulo}>Estado: {estado}</Text>
      <Text style={estilos.datos}><Text style={estilos.bold}>Sector:</Text> {sector}</Text>
      <Text style={estilos.datos}><Text style={estilos.bold}>Responsable:</Text> {responsable}</Text>
      <Text style={estilos.datos}><Text style={estilos.bold}>Fecha:</Text> {fecha}</Text>
      <Text style={estilos.datos}><Text style={estilos.bold}>Motivo de derivación:</Text></Text>
      <Text style={estilos.datos}>{causa}</Text>
    </View>
    {!ultimoMovimiento && (
    <View style={estilos.flecha}>
      <AntDesign name="arrowup" size={50} color={'black'}></AntDesign>
    </View>
    )}
  </View>
);

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    elevation: 2,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  datos: {
    fontSize: 14,
    marginBottom: 3
  },
  bold: {
    fontWeight: 'bold'
  },
  flecha: {
    display: 'flex',
    alignItems: 'center'
  }
});

export default MovimientoComponente;
