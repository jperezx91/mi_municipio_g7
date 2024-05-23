import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useAlert, AlertProvider} from "@/app/alertProvider";

function TabLayout() {
  const colorScheme = useColorScheme();
    const { setShowAlert } = useAlert();
    return (
    <Tabs
        initialRouteName={"(home)"}
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: false,
      }}>
        <Tabs.Screen
            name="(home)"
            options={{
                title: 'Home',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                ),
            }}
        />
    <Tabs.Screen

        name="(reclamos)"
        listeners={{tabPress: e=>{
                setShowAlert(true)
                e.preventDefault() //descomentar para que no se pueda acceder a esta sección.
            }}}
        options={{

            title: 'Reclamos',
            tabBarIcon: ({ color, focused }) => (
                /*<TabBarIcon name={focused ? 'document-text' : 'document-text-outline'} color={color} />*/
                <Ionicons name={focused ? 'documents' : 'documents-outline'} size={24} color={color} />
            ),
        }}

    />
        <Tabs.Screen
            name="(denuncias)"
            listeners={{tabPress: e=>{
                    setShowAlert(true)
                    e.preventDefault() //descomentar para que no se pueda acceder a esta sección.
                }}}
            options={{
                title: 'Denuncias',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'alert-circle' : 'alert-circle-outline'} size={24} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="(profile)"
            options={{
                title: 'Perfil',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
                ),
            }}
        />
    </Tabs>
  );
}
export default function App()
{
    return (
        <AlertProvider>
            <TabLayout />
        </AlertProvider>
    )
}
