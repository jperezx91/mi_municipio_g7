import * as SecureStore from 'expo-secure-store';

export const setToken = async (bearerToken: string) =>
{
    try{
        await SecureStore.setItemAsync("bearerToken", bearerToken)
       // await EncryptedStorage.setItem("bearerToken", onlyToken)
    }catch(e)
    {
        console.error("No se pudo guardar el token", e)
    }

}
