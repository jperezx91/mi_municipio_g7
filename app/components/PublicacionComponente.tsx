import {Image, View, Text, Pressable, StyleSheet, TouchableOpacity} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {router, useFocusEffect} from "expo-router";
import React, {useCallback, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import * as SecureStore from 'expo-secure-store';

// Largo máximo de la descripción para que no desborde de la tarjeta de publicación.
const LARGO_MAXIMO = 160;

const recortarDescripcion = (descripcion: string, largoMaximo: number) => {
    if (descripcion.length > largoMaximo) {
      return descripcion.substring(0, largoMaximo) + '...';
    }
    return descripcion;
  };

const PublicacionComponente = ({ title, desc, imgUrl, goToPublicacion }: { title: string; desc: string, imgUrl: string, goToPublicacion: any}) => {
    const imageSource = imgUrl ? { uri: `data:image/jpeg;base64,${imgUrl}` } : require('../../assets/images/placeholder.jpg');
    return (
        <Pressable onPress={goToPublicacion} style={styles.contenedor}>
                <View style = {styles.contenedorImagen}>
                    <Image style={styles.imagen} source={imageSource} />
                </View>
                <View style={styles.contenedorTexto}>
                    <Text style={styles.titulo}>{title}</Text>
                    <Text style={styles.descripcion}>{recortarDescripcion(desc, LARGO_MAXIMO)}</Text>
                </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    contenedor: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: '#4891c7',
      borderRadius: 10,
      marginBottom: 10,
      marginTop: 10
    },
    contenedorImagen: {
      width: '35%'
    },
    imagen: {
      width: '100%',
      height: 165,
      resizeMode: 'cover',
      borderTopLeftRadius: 9,
      borderBottomLeftRadius: 9,
    },
    contenedorTexto: {
      width: '65%',
      height: '100%',
      padding: 15
    },
    titulo: {
      fontSize: 18,
      marginBottom: 8,
      color: '#045093',
      fontFamily: 'outfit-bold',
      textAlign: 'center',
      width: '100%',
    },
    descripcion: {
      fontSize: 13,
      color: '#666',
      textAlign: 'justify',
      lineHeight: 20,
    },
  });

export default PublicacionComponente;