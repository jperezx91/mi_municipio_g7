import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, useRef } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import NetInfo from '@react-native-community/netinfo';

import { StatusBar, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {crearDenuncia} from "@/app/networking/api";
import * as SecureStore from 'expo-secure-store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf')
  });

  const [initialType, setInitialType] = useState("");
  const [previousType, setPreviousType] = useState("");

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  const cargarPendientes = async () =>
  {
    const token = SecureStore.getItem("bearerToken")
    if(token == null)
      return;
    const denuncias_datos_str = await AsyncStorage.getItem("denuncias_datos");

    if(denuncias_datos_str != null)
    {
      const denuncias_datos = JSON.parse(denuncias_datos_str)
      console.log(denuncias_datos?.length)
      ToastAndroid.show("Cargando los datos pendientes... " + denuncias_datos?.length, ToastAndroid.SHORT)

      denuncias_datos.map((denuncia: {[key: string]: any}) =>
      {
        crearDenuncia(denuncia).then((data: any) => {
          console.log(data)
        })
      })
      AsyncStorage.setItem("denuncias_datos", "[]")
    }

  }
  useEffect(() => {
    let currentState = ""

    // Subscribe NetInfo event
    const unsubscribe = NetInfo.addEventListener(state => {
      if (currentState != state.type) {
        currentState = state.type
        if(state.type == "wifi")
        {
          cargarPendientes()
        }
      }
    });

    return () => {
      console.log("unsubscribe");

      if (unsubscribe)
        unsubscribe();
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
      <>
        {/* TODO: en caso de ser necesario, reemplazar para que se pueda usar un estilo oscuro. */}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="(login)" options={{ headerShown: false }} />
        </Stack>
      </>
  );
}
