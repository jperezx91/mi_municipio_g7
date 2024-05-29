import React from 'react';
import {View, Text, TextInput, Pressable, KeyboardTypeOptions} from 'react-native';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface LoginFormInputProps {
    title?: string;
    placeholder?: string;
    tipo?: string;
    valor?: string;
    setValor?: (s: string) => void;
    showPass?: [boolean, (f: boolean) => void];
}

const LoginFormInput: React.FC<LoginFormInputProps> = ({
                                                           title = "",
                                                           placeholder = "",
                                                           tipo = "mail",
                                                           valor = "",
                                                           setValor = (s: string) => { },
                                                           showPass = [true, (f: boolean) => { }]
                                                       }) => {
    const [showPassword, setShowPassword] = showPass;
    // @ts-ignore
    const valoresTipo: { [key in LoginFormInputProps["tipo"]]: KeyboardTypeOptions } = {
        mail: "email-address",
        password: "default",
        numero: "numeric",
        default: "default"
    };
    return (
        <View style={{ width: "95%" }}>
            <Text style={{ paddingBottom: 10 }}>{title}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#525252', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextInput
                    onChangeText={setValor}
                    value={valor}
                    maxLength={tipo === "mail" ? 42 : 26}
                    secureTextEntry={tipo === "password" && !showPassword}
                    keyboardType={valoresTipo[tipo]}
                    placeholder={placeholder}
                    style={{ paddingHorizontal: 15, paddingBottom: 10, flex: 1 }}
                />
                {(tipo === "password" && valor.length > 0) && (
                    <Pressable style={{ paddingHorizontal: 10 }} onPress={() => setShowPassword(!showPassword)}>
                        <FontAwesome5 name={!showPassword ? "eye" : "eye-slash"} size={16} color="#171717" />
                    </Pressable>
                )}
            </View>
        </View>
    );
};

export default LoginFormInput;
